import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import AddProduct from '../../molecules/AddProduct/AddProduct';
import axios from 'axios';
import { ProductModel } from '../../../models/Product';
import Loader from '../../atoms/Loader/Loader';
import ReactPaginate from 'react-paginate';
import AdminProductItem from '../../atoms/AdminProductItem/AdminProductItem';
import AdminProductTemplate from '../../atoms/AdminProductTemplate/AdminProductTemplate';
import PasswordModal from '../../molecules/PasswordModal/PasswordModal';
import GrayInput from '../../atoms/GrayInput/GrayInput';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import { useDispatch } from 'react-redux';
import Pagination from '../../molecules/Pagination/Pagination';
import { fetchProducts, loadData } from '../../../features/admin/productsSlice';
import { useAppSelector } from '../../../hooks/hooks';

const AdminProducts = () => {
	const products = useAppSelector((state) => state.productReducer.products);
	const [open, setOpen] = useState(false);
	// const [products, setProducts] = useState<ProductModel[] | []>([]);
	const [filtered, setFiltered] = useState<ProductModel[] | []>([]);
	const [message, setMessage] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);
	const [idToReq, setIdToReq] = useState<undefined | string>('');
	const URL = process.env.REACT_APP_SERVER_URL;
	const [error, setError] = useState(false);
	const [searchingPhrase, setSearchingPhrase] = useState('');
	//
	const [ordersPerPage, setOrdersPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageCount, setPageCount] = useState<number>(0);
	const dispatch = useDispatch();

	// const getProducts = async () => {
	// 	setError(false);
	// 	setLoading(true);
	// 	axios
	// 		.get(`${URL}/products`)
	// 		.then((res) => {
	// 			setProducts(res.data);
	// 			setFiltered(res.data);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			setLoading(false);
	// 			setError(true);
	// 		});
	// };

	const getProductsFromStore = async () => {
		const { products, totalPages } = await fetchProducts({
			limit: ordersPerPage,
			page: currentPage,
		});
		dispatch(loadData(products));
		setPageCount(totalPages);
	};

	useEffect(() => {
		getProductsFromStore();
	}, [ordersPerPage, currentPage]);

	useEffect(() => {
		setError(false);
		getProductsFromStore()
			.then(() => setLoading(false))
			.catch((err) => {
				setLoading(false);
				setError(true);
			});
	}, []);

	// useEffect(() => {
	// 	setFiltered(
	// 		products.filter((prod) =>
	// 			prod.title.toLowerCase().includes(searchingPhrase.toLowerCase())
	// 		)
	// 	);
	// }, [searchingPhrase]);

	// useEffect(() => {
	// 	getProducts();
	// }, []);

	const removeProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement;
		if (target.parentElement?.parentElement !== null) {
			const productId = target.parentElement?.parentElement.id;
			setIdToReq(productId);
			setModalOpen(true);
		}
	};
	const [productOffset, setProductOffset] = useState(0);
	// const productsPerPage = 10;
	// const endOffset = productOffset + productsPerPage;
	// const currentProducts = products.slice(productOffset, endOffset);
	// const pageCount = Math.ceil(products.length / productsPerPage);

	// const handlePageClick = (e: any) => {
	// 	const newOffset = (e.selected * productsPerPage) % products.length;
	// 	setProductOffset(newOffset);
	// };

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
						<div className='flex justify-end my-3'>
							<button onClick={() => setOpen(true)} className='hover:underline'>
								+ dodaj produkt
							</button>
						</div>
						{open ? null : (
							<div>
								<GrayInput
									name='searchProduct'
									onChange={(
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => setSearchingPhrase(e.target.value)}
									type='text'
									value={searchingPhrase}
									placeholder='Wpisz tytuł, aby wyszukać produkt'
									disabled
								/>
							</div>
						)}
						<div>
							<p className='text-brownSugar mb-10 text-xl'>{message}</p>
						</div>
						{products.length > 0 && !open && (
							<div className='min-h-[340px] flex flex-col justify-between'>
								{/* <AdminProductTemplate /> */}
								<table>
									<thead>
										<tr className='border-b-[1px] text-left'>
											<th>ID</th>
											<th>TYTUŁ</th>
											<th>CENA</th>
											<th>RODZAJ</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{products.map((p) => (
											<AdminProductItem
												p={p}
												key={p.id}
												removeProduct={removeProduct}
											/>
										))}
									</tbody>
								</table>
								{/* {products.length > 0 && searchingPhrase === ''
										? currentProducts.map((p) => (
												<AdminProductItem
													p={p}
													key={p.id}
													removeProduct={removeProduct}
												/>
										  ))
										: filtered.map((p) => (
												<AdminProductItem
													p={p}
													key={p.id}
													removeProduct={removeProduct}
												/>
										  ))} */}
								<div className='flex justify-center mt-3'>
									{searchingPhrase !== '' ? null : (
										// <ReactPaginate
										// 	className='flex gap-x-5'
										// 	pageCount={pageCount}
										// 	onPageChange={handlePageClick}
										// 	nextLabel='kolejna>>'
										// 	previousLabel='<<poprzednia'
										// 	activeLinkClassName='text-white bg-black px-1.5 text-center py-0.5 rounded-[4px]'
										// 	disabledClassName='opacity-0'
										// 	disabledLinkClassName='cursor-default'
										// />
										<Pagination
											currentPage={currentPage}
											ordersPerPage={ordersPerPage}
											pageCount={pageCount}
											setCurrentPage={setCurrentPage}
											setOrdersPerPage={setOrdersPerPage}
										/>
									)}
								</div>
							</div>
						)}
					</div>
					<div className={`${open ? 'block' : 'hidden'}`}>
						<AddProduct
							setMessage={setMessage}
							setOpen={setOpen}
							// getProducts={getProducts}
						/>
					</div>
					<PasswordModal
						isOpen={isModalOpen}
						password={password}
						setPassword={setPassword}
						idToReq={idToReq}
						// getProducts={getProducts}
						setMessage={setMessage}
						setModalOpen={setModalOpen}
						type='remove'
					/>
				</>
			) : products.length === 0 && !error ? (
				<p className='mt-10'>Brak produktów.</p>
			) : (
				<ErrorMessage
					text1='Brak połączenia'
					text2='Odśwież stronę i spróbuj ponownie'
				/>
			)}
		</AdminLayout>
	);
};

export default AdminProducts;
