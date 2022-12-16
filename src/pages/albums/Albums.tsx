import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { albums } from '../../data/albums';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';
import { handleFilter } from '../../helpers/handleFilter';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';
import { filterByPrice } from '../../helpers/filterByPrice';
import { useElementSize } from 'usehooks-ts';
import { getCategories } from '../../helpers/getCategories';
import { useLocation } from 'react-router-dom';
import FilterTool from '../../components/atoms/FilterTool/FilterTool';

type AlbumsProps = {
	filterCategory?: boolean;
};

const Albums = ({ filterCategory }: AlbumsProps) => {
	const [items, setItems] = useState<ProductModel[] | []>([]);
	const [filtered, setFiltered] = useState<ProductModel[] | undefined>([]);
	const [divRef, { width }] = useElementSize();
	const [open, setOpen] = useState(false);
	const [updated, setUpdated] = useState(false);
	const location = useLocation();
	const catID = +location.pathname.replace('/shop/category/albums/', '');

	const handleFilterByPrice = (id: string) => {
		setFiltered(filterByPrice(id, filtered));
	};

	const renderAlbums = useCallback(() => {
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
		setItems(albums);
		setFiltered(albums);
		renderAlbums();
		setOpen(false);
		console.log(catID);
	}, [updated, location]);

	return (
		<Layout>
			<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center xl:flex-wrap xl:gap-3'>
				{getCategories(items).map((cat) => (
					<CategoryButton
						key={cat}
						cat={Number(cat)}
						to={`/shop/category/albums/${cat}`}
					/>
				))}
			</nav>

			<FilterTool onClick={handleFilterByPrice} open={open} setOpen={setOpen} />

			<div ref={divRef} className='flex flex-wrap justify-center'>
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
			</div>
		</Layout>
	);
};

export default Albums;
