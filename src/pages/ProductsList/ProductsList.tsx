import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductModel } from '../../models/Product';
// components:
import Layout from '../../components/templates/Layout/Layout';
import Loader from '../../components/atoms/Loader/Loader';
import Pagination from '../../components/molecules/Pagination/Pagination';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';
import ItemCard from '../../components/organisms/ItemCard/ItemCard';
// funcs:
import { getCategories } from '../../helpers/getCategories';
import { useElementSize } from 'usehooks-ts';
import { fetchFilteredProducts } from '../../features/admin/productsSlice';
import { useDispatch } from 'react-redux';
import { loadData } from '../../features/admin/productsSlice';
import { useAppSelector } from '../../hooks/hooks';
// libs:
import axios from 'axios';

type AlbumsProps = {
	filterCategory?: boolean;
};

const ProductsList = ({ filterCategory }: AlbumsProps) => {
	const items: ProductModel[] = useAppSelector(
		(state) => state.productReducer.products
	);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isError, setError] = useState<boolean>(false);
	const [divRef, { width }] = useElementSize();
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageCount, setPageCount] = useState<number>(0);
	const { category, catID } = useParams();
	const dispatch = useDispatch();

	const getProductsFromStore = async () => {
		const { products, totalPages } = await fetchFilteredProducts({
			currentPage,
			itemsPerPage,
			category,
			catID: Number(catID),
		});
		dispatch(loadData(products));
		setPageCount(totalPages);
	};

	useEffect(() => {
		getProductsFromStore().finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		setLoading(true);
		getProductsFromStore().finally(() => setLoading(false));
	}, [currentPage, itemsPerPage]);

	return (
		<Layout>
			{isLoading ? (
				<div className='min-h-[400px] flex justify-center items-center'>
					<Loader />
				</div>
			) : items.length > 0 ? (
				<>
					<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center xl:flex-wrap xl:gap-3'>
						{getCategories(items).map((cat) => (
							<CategoryButton
								key={cat}
								cat={Number(cat)}
								to={`/shop/products/${category}/${cat}`}
							/>
						))}
					</nav>

					{/* <FilterTool
						onClick={handleFilterByPrice}
						open={open}
						setOpen={setOpen}
					/> */}

					<div ref={divRef} className='flex flex-wrap justify-center'>
						{items !== undefined
							? items.map((data) => <ItemCard data={data} key={data.id} />)
							: null}
					</div>
					{pageCount <= 1 ? null : (
						<Pagination
							currentPage={currentPage}
							ordersPerPage={itemsPerPage}
							pageCount={pageCount}
							options={[10, 20, 30, 50]}
							setCurrentPage={setCurrentPage}
							setOrdersPerPage={setItemsPerPage}
						/>
					)}
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
