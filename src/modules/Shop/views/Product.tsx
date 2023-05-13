import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProductLayout from '../components/templates/ProductLayout/ProductLayout';
import Layout from '../components/templates/Layout/Layout';
import { ProductModel } from '../../../models/Product';
import ProductHead from '../components/organisms/ProductHead/ProductHead';
import ProductDesc from '../components/atoms/ProductDesc/ProductDesc';
import ProductDetails from '../components/atoms/ProductDetails/ProductDetails';
import ProductModal from '../components/atoms/ProductModal/ProductModal';
import Loader from '../../../components/shared/Loader/Loader';
import Return from '../components/atoms/Return/Return';
import { fetchExactProduct } from '../../../services/products.service';
import { initialProductModel } from '../../../helpers/initialStates';

const initValue: ProductModel = initialProductModel;

const Product = () => {
	const [product, setProduct] = useState<ProductModel | undefined>(initValue);
	const myRef = useRef(null);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [status, setStatus] = useState(0);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const { id } = useParams();

	const fetchProduct = async () => {
		if (id) {
			const { status, data } = await fetchExactProduct(id);
			setStatus(status);
			setProduct(data);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchProduct()
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<Layout>
			{isLoading ? (
				<div className='min-h-[50vh] flex justify-center items-center'>
					<Loader />
				</div>
			) : status === 204 ? (
				<div className='min-h-[50vh] flex flex-col justify-center items-center'>
					<h1 className='text-center'>Brak produktu o podanym ID</h1>
					<svg
						width='22'
						height='26'
						viewBox='0 0 22 26'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='11' cy='11' r='10.5' stroke='#140004' />
						<path
							d='M11.576 5.36364L11.5021 13.6648H10.5021L10.4283 5.36364H11.576ZM11.0021 17.0852C10.7786 17.0852 10.5855 17.0057 10.4226 16.8466C10.2635 16.6837 10.1839 16.4905 10.1839 16.267C10.1839 16.0398 10.2635 15.8466 10.4226 15.6875C10.5855 15.5284 10.7786 15.4489 11.0021 15.4489C11.2256 15.4489 11.4169 15.5284 11.576 15.6875C11.7389 15.8466 11.8203 16.0398 11.8203 16.267C11.8203 16.4148 11.7824 16.5511 11.7067 16.6761C11.6347 16.8011 11.5362 16.9015 11.4112 16.9773C11.29 17.0492 11.1536 17.0852 11.0021 17.0852Z'
							fill='#140004'
						/>
					</svg>
				</div>
			) : product && product.price ? (
				<>
					<div className='mb-10 pb-5 border-b-[1px]'>
						<Return />
					</div>
					<ProductLayout>
						<section className='flex justify-center my-10'>
							<article className='flex flex-col items-center md:items-start mb-20'>
								<ProductHead ref={myRef} data={product} openModal={openModal} />
								<div ref={myRef} className='w-full'>
									{product.description.length > 20 && (
										<ProductDesc description={product.description} />
									)}

									<ProductDetails data={product} />
								</div>
							</article>
						</section>
					</ProductLayout>
					<ProductModal
						title={product.title}
						img={product.img}
						closeModal={closeModal}
						showModal={showModal}
					/>
				</>
			) : (
				error && (
					<div className='min-h-[400px] flex justify-center items-center'>
						<h1 className='text-center'>
							Problem z pobraniem zawartości. <br /> Spróbuj ponownie
						</h1>
					</div>
				)
			)}
		</Layout>
	);
};

export default Product;
