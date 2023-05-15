import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import AddProduct from '../../Shop/components/molecules/AddProduct/AddProduct';
import Loader from '../../../components/shared/Loader/Loader';
import AdminProductItem from '../components/AdminProductItem/AdminProductItem';
import ConfirmPasswordModal from '../components/ConfirmPasswordModal/ConfirmPasswordModal';
import GrayInput from '../../../components/shared/GrayInput/GrayInput';
import ErrorMessage from '../../../components/shared/ErrorMessage/ErrorMessage';
import { useDispatch } from 'react-redux';
import Pagination from '../../../components/shared/Pagination/Pagination';
import { loadData } from '../../../features/admin/productsSlice';
import {
	fetchProducts,
	searchProduct,
} from '../../../services/products.service';
import { useAppSelector } from '../../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';
import { useNavigationSearch } from '../../../hooks/hooks';
import { ModalActionTypesEnum } from '../../../enums/ModalActionTypesEnum';
import ProductsTable from '../components/ProductsTable/ProductsTable';

const AdminProducts = () => {
	const products = useAppSelector((state) => state.productsReducer.products);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);
	const [idForRequest, setIdForRequest] = useState<undefined | string>('');
	const [error, setError] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const limit = searchParams.get('productsPerPage');
	const page = searchParams.get('currentPage');
	const [searchingPhrase, setSearchingPhrase] = useState('');
	const [productsPerPage, setProductsPerPage] = useState<number>(Number(limit));
	const [currentPage, setCurrentPage] = useState<number>(Number(page));
	const [pageCount, setPageCount] = useState<number>(0);
	const dispatch = useDispatch();
	const navigationSearch = useNavigationSearch();

	const getProducts = async () => {
		navigationSearch('/admin/products', {
			productsPerPage: String(productsPerPage),
			currentPage: String(currentPage),
		});
		const { items: products, totalPages } = await fetchProducts({
			limit: productsPerPage,
			page: currentPage,
		});
		dispatch(loadData(products));
		setPageCount(totalPages);
	};

	const handleLoading = () => {
		if (Number(page) === 0) {
			setCurrentPage(1);
			setProductsPerPage(10);
		}
		setLoading(true);
		getProducts()
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	};

	const removeProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement;
		if (target.parentElement?.parentElement !== null) {
			const productId = target.parentElement?.parentElement.id;
			setIdForRequest(productId);
			setModalOpen(true);
		}
	};

	useEffect(() => {
		handleLoading();
	}, [productsPerPage, currentPage]);

	useEffect(() => {
		searchProduct({
			type: 'text',
			searchPhrase: searchingPhrase,
		});
	}, [searchingPhrase]);

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Produkty</h2>
			</div>
			{isLoading ? (
				<div className='min-h-[200px] flex justify-center items-center'>
					<Loader />
				</div>
			) : products && products.length > 0 ? (
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
							<div className='min-h-[420px] flex flex-col justify-between'>
								<ProductsTable
									products={products}
									removeProduct={removeProduct}
								/>
								<div className='flex justify-center mt-3'>
									{searchingPhrase !== '' ? null : (
										<Pagination
											currentPage={currentPage}
											itemsPerPage={productsPerPage}
											pageCount={pageCount}
											setCurrentPage={setCurrentPage}
											setItemsPerPage={setProductsPerPage}
											options={[10, 20, 30, 50]}
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
							getProducts={getProducts}
						/>
					</div>
					<ConfirmPasswordModal
						isOpen={isModalOpen}
						idForRequest={idForRequest}
						getProducts={handleLoading}
						setModalOpen={setModalOpen}
						setMessage={setMessage}
						requestType={ModalActionTypesEnum.Remove}
					/>
				</>
			) : products.length === 0 && !error ? (
				<p className='mt-10'>Brak produktów.</p>
			) : error ? (
				<ErrorMessage
					text1='Brak połączenia'
					text2='Odśwież stronę i spróbuj ponownie'
				/>
			) : null}
		</AdminLayout>
	);
};

export default AdminProducts;
