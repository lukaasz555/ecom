import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import AddProduct from '../../molecules/AddProduct/AddProduct';
import axios from 'axios';
import { ProductModel } from '../../../models/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { Link } from 'react-router-dom';
import Loader from '../../atoms/Loader/Loader';

const AdminProducts = () => {
	const [open, setOpen] = useState(false);
	const [products, setProducts] = useState<ProductModel[] | []>([]);
	const [message, setMessage] = useState('');
	const [isLoading, setLoading] = useState(true);

	const getProducts = async () => {
		axios
			.get('http://localhost:1337/products')
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => setLoading(false));
	};

	useEffect(() => {
		getProducts();
	}, []);

	const removeProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement;
		if (target.parentElement?.parentElement !== null) {
			const productId = target.parentElement?.parentElement.id;
			axios
				.delete('http://localhost:1337/products/remove/' + productId, {
					params: {
						id: productId,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						setMessage(`Usunięto produkt.`);
						getProducts();
					}
				});
		}
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Produkty</h2>
			</div>
			{isLoading ? (
				<div className='min-h-[200px] flex justify-center items-center'>
					<Loader />
				</div>
			) : products.length > 0 ? (
				<>
					<div className='flex flex-col'>
						<div className='flex justify-end'>
							<button onClick={() => setOpen(true)} className='hover:underline'>
								+ dodaj produkt
							</button>
						</div>
						<div>
							<p className='text-brownSugar mb-10 text-xl'>{message}</p>
						</div>
						{products.length > 0 && !open && (
							<div>
								<div className='flex w-full border-b-[1px]'>
									<div className='basis-[15%]'>ID</div>
									<div className='basis-[40%]'>TYTUŁ</div>
									<div className='basis-[15%] text-center'>CENA</div>
									<div className='basis-[15%] text-center'>RODZAJ</div>
									<div className='basis-[15%] text-center '>AKCJE</div>
								</div>
								{products.length > 0
									? products.map((p) => (
											<div
												key={p.id}
												className='flex w-full odd:bg-white even:bg-gray items-center'>
												<div className='basis-[15%]'>{p.id}</div>
												<div className='basis-[40%]'>{p.title}</div>
												<div className='basis-[15%] text-center'>
													{handleNumbFormat(p.price - p.discount)}
												</div>
												<div className='basis-[15%] text-center'>{p.type}</div>
												<div className='basis-[15%] flex justify-center gap-x-2'>
													<Link to={`/admin/products/edit/${p.id}`}>
														<FontAwesomeIcon icon={faPenToSquare} id={p.id} />
													</Link>

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
						<AddProduct
							setMessage={setMessage}
							setOpen={setOpen}
							getProducts={getProducts}
						/>
					</div>
				</>
			) : (
				<p className='mt-10'>Brak produktów.</p>
			)}
		</AdminLayout>
	);
};

export default AdminProducts;
