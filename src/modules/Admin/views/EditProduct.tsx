import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import axios from 'axios';
import { ProductModel } from '../../../models/Product';
import WhiteInput from '../../../components/shared/WhiteInput/WhiteInput';
import CTA from '../../../components/shared/CTA/CTA';
import Return from '../../Shop/components/atoms/Return/Return';
import Textfield from '../../../components/shared/Textfield/Textfield';
import PasswordModal from '../../Shop/components/molecules/PasswordModal/PasswordModal';

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
	const [isModalOpen, setModalOpen] = useState(false);
	const [authors, setAuthors] = useState('');
	const [password, setPassword] = useState('');

	const URL = process.env.REACT_APP_SERVER_URL;

	useEffect(() => {
		axios
			.get(`${URL}/products/${currentID}`, {
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
			setModalOpen(true);
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
									href={`https://lukaasz555-ecom.onrender.com/#/shop/product/${product.type}/${product.id}`}>
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
						<PasswordModal
							isOpen={isModalOpen}
							setModalOpen={setModalOpen}
							password={password}
							setPassword={setPassword}
							idToReq={currentID}
							type='edit'
							authors={authors}
							product={product}
						/>
					</div>
				) : null}
			</div>
		</AdminLayout>
	);
};

export default EditProduct;
