import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductLayout from '../../components/templates/ProductLayout/ProductLayout';
import Layout from '../../components/templates/Layout/Layout';
import { ProductModel } from '../../models/Product';
import ProductHead from '../../components/organisms/ProductHead/ProductHead';
import ProductDesc from '../../components/atoms/ProductDesc/ProductDesc';
import ProductDetails from '../../components/atoms/ProductDetails/ProductDetails';
//import { books } from '../../data/books';
//import { albums } from '../../data/albums';
//import { getCurrentProduct } from '../../helpers/getCurrentProduct';
import Modal from 'react-modal';
import axios from 'axios';
import Return from '../../components/atoms/Return/Return';
import ProductModal from '../../components/atoms/ProductModal/ProductModal';

const initValue: ProductModel = {
	id: '',
	title: '',
	authors: [''],
	releaseYear: '',
	description: '',
	img: '',
	price: 0,
	discount: 0,
	categoryID: 0,
	thumbnail: '',
	format: '',
	type: 'albums',
};

const Product = () => {
	const [product, setProduct] = useState<ProductModel>(initValue);
	const myRef = useRef(null);
	const location = useLocation();
	const category = location.pathname.replace('/shop/product/', '');
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setLoading] = useState(true);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const getId = () => {
		if (category.includes('books')) {
			const id = category.replace('books/', '');
			return id;
		} else if (category.includes('albums')) {
			const id = category.replace('albums/', '');
			return id;
		}
	};

	useEffect(() => {
		const productId = getId();
		axios
			.get(`http://localhost:1337/products/${productId}`, {
				params: {
					id: productId,
				},
			})
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, [location]);

	return (
		<Layout>
			<div className='mb-10 pb-5 border-b-[1px]'>
				<Return />
			</div>
			<ProductLayout>
				<section className='flex justify-center my-10'>
					{product.id === '' ? (
						<h2>Przepraszamy, nie udało załadować się strony tego produktu.</h2>
					) : (
						<article className='flex flex-col items-center md:items-start mb-20'>
							<ProductHead myRef={myRef} data={product} openModal={openModal} />
							<div ref={myRef} className='w-full'>
								{product.description.length > 20 && (
									<ProductDesc description={product.description} />
								)}

								<ProductDetails data={product} />
							</div>
						</article>
					)}
				</section>
			</ProductLayout>
			<ProductModal
				title={product.title}
				img={product.img}
				closeModal={closeModal}
				showModal={showModal}
			/>
		</Layout>
	);
};

export default Product;
