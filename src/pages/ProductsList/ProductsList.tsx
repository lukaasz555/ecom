import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/Product';
import Layout from '../../components/templates/Layout/Layout';
import Loader from '../../components/atoms/Loader/Loader';
import Pagination from '../../components/molecules/Pagination/Pagination';
import ItemCard from '../../components/organisms/ItemCard/ItemCard';
import CategoriesMenu from '../../components/molecules/CategoriesMenu/CategoriesMenu';
import { useElementSize } from 'usehooks-ts';
import { fetchFilteredProducts } from '../../services/products.service';
import { useDispatch } from 'react-redux';
import { loadData } from '../../features/admin/productsSlice';
import { useAppSelector } from '../../hooks/hooks';

const ProductsList = () => {
	const items: ProductModel[] = useAppSelector(
		(state) => state.productsReducer.products
	);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isError, setError] = useState<boolean>(false);
	const [divRef, { width }] = useElementSize();
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageCount, setPageCount] = useState<number>(0);
	const { category, catID } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const updateProducts = async () => {
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
	}, [currentPage, itemsPerPage, location]);

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
						ordersPerPage={itemsPerPage}
						pageCount={pageCount}
						options={[10, 20, 30, 50]}
						setCurrentPage={setCurrentPage}
						setOrdersPerPage={setItemsPerPage}
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
