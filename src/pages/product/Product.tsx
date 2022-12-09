import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/templates/Layout/Layout';
import { books } from '../../data/books';
import { ProductModel } from '../../models/Product';
import ProductHead from '../../components/molecules/ProductHead/ProductHead';
import ProductDesc from '../../components/atoms/ProductDesc/ProductDesc';
import ProductDetails from '../../components/atoms/ProductDetails/ProductDetails';

const initValue: ProductModel = {
	id: '',
	title: '',
	authors: [''],
	releaseYear: '',
	description: '',
	img: '',
	price: 0,
	discount: 0,
	category: '',
};

const Product = () => {
	const [product, setProduct] = useState<ProductModel>(initValue);
	const navigate = useNavigate();
	const location = useLocation();
	let productId;

	const getProduct = (id: string) => {
		const arr: ProductModel[] = books.filter((book) => book.id === id);
		setProduct(arr[0]);
	};

	useEffect(() => {
		productId = location.pathname.replace('/shop/product/', '');
		getProduct(productId);
	}, []);

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
			<section className='flex justify-center my-10'>
				{product.id === '' ? (
					<h2>Przepraszamy, nie udało załadować się strony tego produktu.</h2>
				) : (
					<article className='flex flex-col items-center'>
						<ProductHead
							discount={product.discount}
							authors={product.authors}
							title={product.title}
							img={product.img}
							price={product.price}
						/>
						<ProductDesc description={product.description} />
						<ProductDetails product={product} />
					</article>
				)}
			</section>
		</Layout>
	);
};

export default Product;
