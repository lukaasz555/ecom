import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import AddProduct from '../../molecules/AddProduct/AddProduct';
import axios from 'axios';
import { ProductModel } from '../../../models/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminProducts = () => {
	const [open, setOpen] = useState(false);
	const [products, setProducts] = useState<ProductModel[] | []>([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const getProducts = async () => {
			axios
				.get('http://localhost:1337/products')
				.then((res) => setProducts(res.data))
				.catch((err) => console.log(err));
		};
		getProducts();
	}, []);

	const removeProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement;
		if (target.parentElement?.parentElement !== null) {
			const productId = target.parentElement?.parentElement.id;
			console.log(productId);
			axios
				.delete('http://localhost:1337/products/remove/' + productId, {
					params: {
						id: productId,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						setMessage(`Usunięto produkt ${productId}.`);
					}
				});
		}
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Produkty</h2>
			</div>
			<div className='flex flex-col'>
				<div className='flex justify-end'>
					<button onClick={() => setOpen(true)} className='hover:underline'>
						+ dodaj produkt
					</button>
				</div>
				<div>{message}</div>
				{products.length > 0 && !open && (
					<div>
						<div className='flex w-full border-b-[1px]'>
							<div className='basis-[15%]'>ID</div>
							<div className='basis-[40%]'>TYTUŁ</div>
							<div className='basis-[15%]'>CENA</div>
							<div className='basis-[30%]'>inne</div>
						</div>
						{products.length > 0
							? products.map((p) => (
									<div key={p.id} className='flex w-full'>
										<div className='basis-[15%]'>{p.id}</div>
										<div className='basis-[40%]'>{p.title}</div>
										<div className='basis-[15%]'>{p.price - p.discount}</div>
										<div className='basis-[30%] flex gap-x-2'>
											<button>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>

											<button id={p.id} onClick={removeProduct}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									</div>
							  ))
							: null}
					</div>
				)}
			</div>
			<div className={`${open ? 'block' : 'hidden'}`}>
				<AddProduct />
			</div>
		</AdminLayout>
	);
};

export default AdminProducts;
