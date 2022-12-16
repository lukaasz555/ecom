import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductLayout from '../../components/templates/ProductLayout/ProductLayout';
import Layout from '../../components/templates/Layout/Layout';
import { books } from '../../data/books';
import { ProductModel } from '../../models/Product';
import ProductHead from '../../components/organisms/ProductHead/ProductHead';
import ProductDesc from '../../components/atoms/ProductDesc/ProductDesc';
import ProductDetails from '../../components/atoms/ProductDetails/ProductDetails';
import { albums } from '../../data/albums';
import { getCurrentProduct } from '../../helpers/getCurrentProduct';
import Modal from 'react-modal';

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

	format: '',
	type: 'albums',
};

const Product = () => {
	const [product, setProduct] = useState<ProductModel>(initValue);
	const navigate = useNavigate();
	const myRef = useRef(null);
	const location = useLocation();
	const category = location.pathname.replace('/shop/product/', '');
	const [showModal, setShowModal] = useState(false);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	useEffect(() => {
		if (category.includes('books')) {
			const id = category.replace('books/', '');
			setProduct(getCurrentProduct(id, books));
		} else if (category.includes('albums')) {
			const id = category.replace('albums/', '');
			setProduct(getCurrentProduct(id, albums));
		}
	}, [category]);

	return (
		<Layout>
			<div className='mb-10 pb-5 border-b-[1px]'>
				<button
					className='flex justify-between items-center uppercase group'
					onClick={() => navigate(-1)}>
					<svg
						className='mr-2 group-hover:-translate-x-1 duration-200'
						width='24'
						height='24'
						xmlns='http://www.w3.org/2000/svg'
						fill-rule='evenodd'
						clip-rule='evenodd'>
						<path d='M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z' />
					</svg>
					powrót
				</button>
			</div>
			<ProductLayout>
				<section className='flex justify-center my-10'>
					{product.id === '' ? (
						<h2>Przepraszamy, nie udało załadować się strony tego produktu.</h2>
					) : (
						<article className='flex flex-col items-center md:items-start'>
							<ProductHead myRef={myRef} data={product} openModal={openModal} />
							<div ref={myRef} className='w-full'>
								<ProductDesc description={product.description} />
								<ProductDetails data={product} />
							</div>
						</article>
					)}
				</section>
			</ProductLayout>
			<Modal
				isOpen={showModal}
				shouldCloseOnOverlayClick={true}
				shouldCloseOnEsc={true}
				onRequestClose={closeModal}
				style={{
					content: {
						backgroundColor: 'rgba(255,255,255,0.8)',
						border: 'none',
					},
				}}
				contentLabel={`${product.title} cover`}>
				<div className='h-[100%]'>
					<div className='flex flex-col items-center justify-center w-full h-[100%] relative'>
						<img src={product.img} alt={product.title} />
						<button
							className='uppercase hover:underline mt-5'
							onClick={closeModal}>
							zamknij
						</button>
					</div>
				</div>
			</Modal>
		</Layout>
	);
};

export default Product;
