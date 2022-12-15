import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { albums } from '../../data/albums';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';
import { handleFilter } from '../../helpers/handleFilter';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';
import { filterByPrice } from '../../helpers/filterByPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useElementSize } from 'usehooks-ts';
import { getCategories } from '../../helpers/getCategories';
import { useLocation } from 'react-router-dom';

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

			<div
				className={`w-${width} mx-10 border-b-[1px] mb-10  flex justify-end`}>
				<div className={`${open ? 'bg-sparkle' : 'bg-white'} relative`}>
					<button
						className={`flex items-center bg-white justify-end uppercase py-2 px-5 text-[14px]
						w-[300px]
					`}
						onClick={() => setOpen(!open)}>
						sortuj
						<FontAwesomeIcon icon={faChevronDown} className='text-xs ml-1' />
					</button>
					<ul
						className={`absolute top-[102%] right-0 bg-lightGray z-30 pl-5 duration-150 ${
							open ? 'scale-y-100' : 'scale-y-0'
						} origin-top flex flex-col items-end w-[300px]`}>
						<li>
							<button
								id='declining'
								className='uppercase text-[18px] font-light px-5 py-3 font-[200] border-b-[1px] w-[300px] text-right'
								onClick={(e) => {
									const targ = e.target as Element;
									if (targ != null) {
										handleFilterByPrice(targ.id);
									}
									setOpen(!open);
								}}>
								Od najdroŻszych
							</button>
						</li>
						<li>
							<button
								id='growing'
								className='uppercase text-[18px] font-light px-5 py-3 font-[200] border-b-[1px] w-[300px] text-right'
								onClick={(e) => {
									const targ = e.target as Element;
									if (targ != null) {
										handleFilterByPrice(targ.id);
									}
									setOpen(!open);
								}}>
								od najtańszych
							</button>
						</li>
					</ul>
				</div>
			</div>

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
