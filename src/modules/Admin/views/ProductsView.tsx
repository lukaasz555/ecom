import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import AddProduct from '../../Shop/components/molecules/AddProduct/AddProduct';
import { useAppSelector } from '../../../hooks/hooks';
import Loader from '../../../components/shared/Loader/Loader';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';
import { getProductsList } from '../../../features/admin/productsSlice';
import { useDebounce } from 'usehooks-ts';
import { ApiPaginationResponse } from '../../../models/api';
import { ProductModel } from '../../../models/Product';
import GrayInput from '../../../components/shared/GrayInput/GrayInput';
import Pagination from '../../../components/shared/Pagination/Pagination';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import ErrorMessage from '../../../components/shared/ErrorMessage/ErrorMessage';
import clsx from 'clsx';

const ProductsView = () => {
	const productsList = useAppSelector(
		(state) => state.productsReducer.productsList
	);
	const isLoading = useAppSelector((state) => state.productsReducer.isLoading);
	const isError = useAppSelector((state) => state.productsReducer.isError);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [searchParams, setSearchParams] = useSearchParams();
	const limit = searchParams.get('limit');
	const page = searchParams.get('page');
	const searchPhrase = searchParams.get('searchPhrase');
	const [totalPages, setTotalPages] = useState(0);
	const [searchingPhrase, setSearchingPhrase] = useState('');
	const debouncedSearchingPhrase = useDebounce<string>(searchingPhrase, 800);
	//
	const [isAddProductOpen, setAddProductOpen] = useState(false);

	function removeProduct(): void {
		// ...
	}

	if (!limit && !page) {
		setSearchParams((prev) => {
			prev.set('page', '1');
			prev.set('limit', '10');
			return prev;
		});
	}

	useEffect(() => {
		dispatch(
			getProductsList({
				limit: Number(limit) || 10,
				page: Number(page) || 1,
				searchPhrase: debouncedSearchingPhrase || searchPhrase,
			})
		).then((res) => {
			const response = res.payload as ApiPaginationResponse<ProductModel>;
			setTotalPages(response.totalPages);
			if (page && +page > response.totalPages) {
				setSearchParams((prev) => {
					prev.set('page', '1');
					return prev;
				});
			}
		});
	}, [limit, page, debouncedSearchingPhrase]);

	useEffect(() => {
		setSearchParams((prev) => {
			if (searchingPhrase.trim() === '') {
				prev.delete('searchPhrase');
				return prev;
			}
			prev.set('searchPhrase', searchingPhrase);
			return prev;
		});
	}, [debouncedSearchingPhrase]);

	// useEffect(() => {
	// 	if (searchPhrase) {
	// 		setSearchingPhrase(searchPhrase);
	// 	}
	// }, []);

	return (
		<AdminLayout>
			<div>
				<header>
					<h2 className='text-2xl'>
						{isAddProductOpen ? 'Dodaj produkt' : 'Produkty'}
					</h2>
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
								placeholder='Wpisz tytuł lub autora, aby wyszukać produkt'
							/>
						</div>
					</div>
				</header>
			</div>

			<div className='w-[100%]'>
				{isLoading ? (
					<div className='min-h-[200px] flex justify-center items-center'>
						<Loader />
					</div>
				) : isError ? (
					<p>Error</p>
				) : productsList.length > 0 ? (
					<div className='flex flex-col justify-between min-h-[400px]'>
						<ProductsTable
							products={productsList}
							removeProduct={removeProduct}
						/>
						<Pagination pageCount={totalPages} />
					</div>
				) : (
					<p className='mx-1'>Brak produktów do wyświetlenia</p>
				)}
			</div>
		</AdminLayout>
	);
};

export default ProductsView;
