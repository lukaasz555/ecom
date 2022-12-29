import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/templates/Layout/Layout';
//import { books } from '../../data/books';
import ItemCard from '../../components/organisms/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';
import { handleFilter } from '../../helpers/handleFilter';
import { getCategories } from '../../helpers/getCategories';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';
import { useElementSize } from 'usehooks-ts';
import { filterByPrice } from '../../helpers/filterByPrice';
import FilterTool from '../../components/atoms/FilterTool/FilterTool';
import axios from 'axios';
import Loader from '../../components/atoms/Loader/Loader';

type BooksProps = {
	filterCategory?: boolean;
};

const Books = ({ filterCategory }: BooksProps) => {
	const [items, setItems] = useState<ProductModel[] | []>([]);
	const [filtered, setFiltered] = useState<ProductModel[] | undefined>([]);
	const [divRef, { width }] = useElementSize();
	const [open, setOpen] = useState(false);
	const [updated, setUpdated] = useState(false);
	const location = useLocation();
	const catID = +location.pathname.replace('/shop/category/books/', '');
	const [isLoading, setLoading] = useState(true);

	const handleFilterByPrice = (id: string) => {
		setFiltered(filterByPrice(id, filtered));
	};

	const renderBooks = useCallback(() => {
		setUpdated(false);
		if (filterCategory) {
			const fltrd = handleFilter(catID, null, items);
			setFiltered(fltrd);
		} else {
			setFiltered(items);
		}
		setUpdated(true);
	}, [catID, filtered, filterCategory]);

	useEffect(() => {
		axios
			.get('http://localhost:1337/products/books')
			.then((res) => {
				setItems(res.data);
				setFiltered(res.data);
				renderBooks();
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, [updated, location]);

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
								to={`/shop/category/books/${cat}`}
							/>
						))}
					</nav>

					<FilterTool
						onClick={handleFilterByPrice}
						open={open}
						setOpen={setOpen}
					/>

					<div ref={divRef} className='flex flex-wrap justify-center'>
						{filtered !== undefined
							? filtered.map((data) => <ItemCard data={data} key={data.id} />)
							: null}
					</div>
				</>
			) : (
				<div className='min-h-[400px] flex justify-center items-center'>
					<h1 className='text-center'>Nie udało się pobrać artykułów.</h1>
				</div>
			)}
		</Layout>
	);
};

export default Books;
