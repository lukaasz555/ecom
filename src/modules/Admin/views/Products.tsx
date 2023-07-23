import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import AddProduct from '../../Shop/components/molecules/AddProduct/AddProduct';
import Loader from '../../../components/shared/Loader/Loader';
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
import { useSearchParams } from 'react-router-dom';
import { useNavigationSearch } from '../../../hooks/hooks';
import { ModalActionTypesEnum } from '../../../enums/ModalActionTypesEnum';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import clsx from 'clsx';
import { ProductModel } from '../../../models/Product';
import { useDebounce } from 'usehooks-ts';

const AdminProducts = () => {
	const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
	const [isAddProductOpen, setAddProductOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [isModalOpen, setModalOpen] = useState(false);
	const [idForRequest, setIdForRequest] = useState<undefined | string>('');
	const [isError, setError] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isPaginationVisible, setPaginationVisible] = useState(true);
	const limit = searchParams.get('productsPerPage');
	const page = searchParams.get('currentPage');
	const [searchingPhrase, setSearchingPhrase] = useState('');
	const debouncedSearchingPhrase = useDebounce<string>(searchingPhrase, 300);
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
		if (productsPerPage > 0 || currentPage > 0) {
			const { items: products, totalPages } = await fetchProducts({
				limit: productsPerPage,
				page: currentPage,
			});
			dispatch(loadData(products));
			setFilteredProducts(products);
			setPageCount(totalPages);
		}
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

	const searchByText = () => {
		setPaginationVisible(false);
		searchProduct({
			type: 'text',
			searchPhrase: searchingPhrase,
		}).then(({ data }) => {
			if (data) {
				setFilteredProducts(data);
			}
		});
	};

	useEffect(() => {
		if (searchingPhrase.trim() === '') {
			getProducts();
			setPaginationVisible(true);
		} else {
			searchByText();
		}
	}, [debouncedSearchingPhrase]);

	return (
		<AdminLayout>
			<div className='min-w-[320px]'>
				<h2 className='text-2xl'>Produkty</h2>
				<div className={clsx(isError ? 'hidden' : '')}>
					<div className='flex justify-end my-3'>
						{isAddProductOpen ? (
							<button
								onClick={() => setAddProductOpen(false)}
								className='hover:underline'>
								<span>{'<<'}</span> powrót do listy
							</button>
						) : (
							<button
								onClick={() => setAddProductOpen(true)}
								className='hover:underline'
								disabled={isLoading}>
								+ dodaj produkt
							</button>
						)}
					</div>
					<div className={clsx(isAddProductOpen ? 'hidden' : '')}>
						<GrayInput
							name='searchProduct'
							onChange={(
								e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
							) => setSearchingPhrase(e.target.value)}
							type='text'
							value={searchingPhrase}
							disabled={isLoading}
							placeholder='Wpisz tytuł, aby wyszukać produkt'
						/>
					</div>
				</div>
			</div>

			{isLoading ? (
				<div className='min-h-[200px] flex justify-center items-center'>
					<Loader />
				</div>
			) : isError ? (
				<ErrorMessage
					text1='Brak połączenia'
					text2='Odśwież stronę i spróbuj ponownie'
				/>
			) : (
				<div className='flex flex-col'>
					{isAddProductOpen ? (
						<div className={`${isAddProductOpen ? 'block' : 'hidden'}`}>
							<AddProduct
								setMessage={setMessage}
								setOpen={setAddProductOpen}
								getProducts={getProducts}
							/>
						</div>
					) : (
						<>
							<ProductsTable
								products={filteredProducts}
								removeProduct={removeProduct}
							/>
							{/* <div className='flex justify-center mt-3'>
								{isPaginationVisible ? (
									<Pagination
										currentPage={currentPage}
										itemsPerPage={productsPerPage}
										pageCount={pageCount}
										setCurrentPage={setCurrentPage}
										setItemsPerPage={setProductsPerPage}
										options={[10, 20, 30, 50]}
									/>
								) : null}
							</div> */}
						</>
					)}
					<ConfirmPasswordModal
						isOpen={isModalOpen}
						idForRequest={idForRequest}
						getProducts={handleLoading}
						setModalOpen={setModalOpen}
						setMessage={setMessage}
						requestType={ModalActionTypesEnum.Remove}
					/>
				</div>
			)}
		</AdminLayout>
	);
};

export default AdminProducts;
