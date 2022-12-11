import React, { useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { music } from '../../data/music';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';
import { handleFilter } from '../../helpers/handleFilter';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';

const Music = () => {
	const [items, setItems] = useState<ProductModel[] | []>([]);
	const [filtered, setFiltered] = useState<ProductModel[] | undefined>(
		undefined
	);

	const getCategories = () => {
		const cats = new Set(items.map((i) => i.category));
		const arr = Array.from(cats);
		return [...arr, 'sale'];
	};

	const handleClick = (e: React.MouseEvent) => {
		const filtrd = handleFilter(e, items);
		setFiltered(filtrd);
	};

	useEffect(() => {
		setItems(music);
		setFiltered(music);
	}, []);

	return (
		<Layout>
			<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center'>
				{getCategories().map((cat) => (
					<CategoryButton cat={cat} onClick={handleClick} />
				))}
			</nav>
			<main className='flex flex-wrap justify-center'>
				{filtered !== undefined
					? filtered.map(
							({ id, title, price, img, discount, authors, type }) => (
								<ItemCard
									key={id}
									id={id}
									title={title}
									price={price}
									img={img}
									discount={discount}
									authors={authors}
									type={type}
								/>
							)
					  )
					: null}
			</main>
		</Layout>
	);
};

export default Music;
