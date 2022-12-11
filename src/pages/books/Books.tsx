import React, { useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { books } from '../../data/books';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';
import { handleFilter } from '../../helpers/handleFilter';
import { getCategories } from '../../helpers/getCategories';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';

const Books = () => {
	const [items, setItems] = useState<ProductModel[] | []>([]);
	const [filtered, setFiltered] = useState<ProductModel[] | undefined>([]);

	const handleClick = (e: React.MouseEvent) => {
		const filtrd = handleFilter(e, items);
		setFiltered(filtrd);
	};

	useEffect(() => {
		setItems(books);
		setFiltered(books);
	}, []);

	return (
		<Layout>
			<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center'>
				{getCategories(items).map((cat) => (
					<CategoryButton cat={cat} onClick={handleClick} />
				))}
			</nav>
			<main className='flex flex-wrap justify-center'>
				{filtered !== undefined
					? filtered.map(({ id, title, price, img, discount, authors }) => (
							<ItemCard
								key={id}
								id={id}
								title={title}
								price={price}
								img={img}
								discount={discount}
								authors={authors}
								type='book'
							/>
					  ))
					: null}
			</main>
		</Layout>
	);
};

export default Books;
