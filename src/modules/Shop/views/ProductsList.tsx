import React, { useEffect, useState } from 'react';
import {
	useLocation,
	useParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { ProductModel } from '../../../models/Product';
import Layout from '../components/templates/Layout/Layout';
import ItemCard from '../components/organisms/ItemCard/ItemCard';
import CategoriesMenu from '../components/molecules/CategoriesMenu/CategoriesMenu';
import { fetchFilteredProducts } from '../../../services/products.service';
import { useElementSize } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import { loadData } from '../../../features/admin/productsSlice';
import Pagination from '../../../components/shared/Pagination/Pagination';
import Loader from '../../../components/shared/Loader/Loader';
import { useAppSelector, useNavigationSearch } from '../../../hooks/hooks';

const ProductsList = () => {
	const items: ProductModel[] = useAppSelector(
		(state) => state.productsReducer.products
	);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isError, setError] = useState<boolean>(false);
	const [divRef, { width }] = useElementSize();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigationSearch = useNavigationSearch();
	const limit = searchParams.get('itemsPerPage');
	const page = searchParams.get('currentPage');
	const [itemsPerPage, setItemsPerPage] = useState<number>(Number(limit));
	const [currentPage, setCurrentPage] = useState<number>(Number(page));
	const [pageCount, setPageCount] = useState<number>(0);
	const { category, catID } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const updateProducts = async () => {
		navigationSearch(`/shop/products/${category}/${catID}`, {
			itemsPerPage: String(itemsPerPage),
			currentPage: String(currentPage),
		});
		const { items: products, totalPages } = await fetchFilteredProducts({
			page: currentPage,
			limit: itemsPerPage,
			category,
			catID: Number(catID),
		});
		dispatch(loadData(products));
		setPageCount(totalPages);
	};

	const handleLoading = () => {
		if (Number(page) === 0) {
			setCurrentPage(1);
			setItemsPerPage(10);
		}
		setLoading(true);
		updateProducts()
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (!catID) {
			const URL = `/shop/products/${category}/99`;
			navigate(URL);
		}
		handleLoading();
	}, [currentPage, itemsPerPage, location.search]);

	return (
		<Layout>
			<CategoriesMenu />
			{isLoading ? (
				<div className='min-h-[400px] flex justify-center items-center'>
					<Loader />
				</div>
			) : items.length > 0 ? (
				<>
					<div ref={divRef} className='flex flex-wrap justify-center'>
						{items !== undefined
							? items.map((data) => <ItemCard data={data} key={data.id} />)
							: null}
					</div>
					<Pagination
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						pageCount={pageCount}
						options={[10, 20, 30, 50]}
						setCurrentPage={setCurrentPage}
						setItemsPerPage={setItemsPerPage}
					/>
				</>
			) : !isError ? (
				<div className='min-h-[400px] flex justify-center items-center'>
					<h1 className='text-center'>Brak produktów w tej kategorii</h1>
				</div>
			) : (
				<div className='min-h-[400px] flex justify-center items-center'>
					<h1 className='text-center'>Nie udało się pobrać artykułów</h1>
				</div>
			)}
		</Layout>
	);
};

export default ProductsList;
