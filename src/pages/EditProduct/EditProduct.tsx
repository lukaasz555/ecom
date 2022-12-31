import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/templates/AdminLayout/AdminLayout';
import axios from 'axios';
import { ProductModel } from '../../models/Product';
import WhiteInput from '../../components/atoms/WhiteInput/WhiteInput';
import CTA from '../../components/atoms/CTA/CTA';
import Return from '../../components/atoms/Return/Return';
import { handleAuthors } from '../../helpers/handleAuthors';
import Textfield from '../../components/atoms/Textfield/Textfield';

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
	const navigate = useNavigate();
	const [authors, setAuthors] = useState('');

	useEffect(() => {
		axios
			.get(`http://localhost:4000/products/${currentID}`, {
				params: {
					id: currentID,
				},
			})
			.then((res) => {
				setProduct(res.data);
				setAuthors(res.data.authors.join(', '));
			});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSave = () => {
		if (currentID !== '' && product.price >= product.discount) {
			axios
				.put('http://localhost:4000/products/edit/' + currentID, {
					params: {
						id: currentID,
					},
					price: +product.price,
					discount: +product.discount,
					title: product.title,
					authors: handleAuthors(authors),
					description: product.description,
				})
				.then((res) => {
					if (res.status === 200) {
						navigate(-1);
					}
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
							<label>Tytuł:</label>
							<WhiteInput
								type='text'
								value={product.title}
								onChange={handleChange}
								name='title'
							/>
						</div>

						<div>
							<label>Autor:</label>
							<WhiteInput
								type='text'
								value={authors}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setAuthors(e.target.value)
								}
							/>
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

						<div className='mt-2'>
							<label>
								Opis produktu:{' '}
								<p className='text-s'>
									wprowadź opis lub pozostaw puste, jeśli nie chcesz go zmieniać
								</p>{' '}
							</label>
							<Textfield newProduct={product} setNewProduct={setProduct} />
						</div>

						<CTA body='Zapisz' onClick={handleSave} />
					</div>
				) : null}
			</div>
		</AdminLayout>
	);
};

export default EditProduct;
