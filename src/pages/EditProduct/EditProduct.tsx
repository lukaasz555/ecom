import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/templates/AdminLayout/AdminLayout';
import axios from 'axios';
import { ProductModel } from '../../models/Product';
import WhiteInput from '../../components/atoms/WhiteInput/WhiteInput';
import CTA from '../../components/atoms/CTA/CTA';
import Return from '../../components/atoms/Return/Return';

const initProduct: ProductModel = {
	authors: [''],
	categoryID: 0,
	description: '',
	discount: 0,
	price: 0,
	format: '',
	id: '',
	img: '',
	thumbnail: '',
	label: '',
	language: '',
	pages: 0,
	publisher: '',
	releaseYear: '',
	title: '',
	type: 'books',
};

const EditProduct = () => {
	const location = useLocation();
	const [product, setProduct] = useState<ProductModel>(initProduct);
	const currentID = location.pathname.replace('/admin/products/edit/', '');

	useEffect(() => {
		axios
			.get(`http://localhost:1337/products/${currentID}`, {
				params: {
					id: currentID,
				},
			})
			.then((res) => {
				setProduct(res.data);
			});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSave = () => {
		if (currentID !== '') {
			axios
				.put('http://localhost:1337/products/edit/' + currentID, {
					params: {
						id: currentID,
					},
					price: +product.price,
					discount: +product.discount,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px] flex justify-between'>
				<h2 className='text-2xl mb-5'>Edycja</h2>
				<Return />
			</div>

			<div>
				{product.id !== '' ? (
					<div className='flex flex-col gap-y-2'>
						<div className='my-2'>
							<p className='text-l'>
								Edytujesz:{' '}
								<a
									className='font-[500] hover:underline'
									href={`http://localhost:3000/shop/product/${product.type}/${product.id}`}>
									{' '}
									{product.title} - {product.id}
								</a>
							</p>
						</div>
						<div>
							<label>Cena:</label>
							<WhiteInput
								type='number'
								value={product.price}
								onChange={handleChange}
								name='price'
							/>
						</div>

						<div>
							<label>Zniżka:</label>
							<WhiteInput
								type='number'
								value={product.discount}
								onChange={handleChange}
								name='discount'
							/>
						</div>
						<CTA body='Zapisz' onClick={handleSave} />
					</div>
				) : null}
			</div>
		</AdminLayout>
	);
};

export default EditProduct;
