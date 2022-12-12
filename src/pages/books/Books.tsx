import React, {
	MutableRefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { books } from '../../data/books';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';
import { handleFilter } from '../../helpers/handleFilter';
import { getCategories } from '../../helpers/getCategories';
import CategoryButton from '../../components/atoms/CategoryButton/CategoryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useElementSize } from 'usehooks-ts';

type BooksProps = {
	showSale?: boolean;
};

const Books = ({ showSale }: BooksProps) => {
	const [items, setItems] = useState<ProductModel[] | []>([]);
	const [filtered, setFiltered] = useState<ProductModel[] | undefined>([]);
	const [divRef, { width }] = useElementSize();
	const [open, setOpen] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		const filtrd = handleFilter('', e, items);
		setFiltered(filtrd);
	};

	useEffect(() => {
		setItems(books);
		setFiltered(books);
		if (showSale) {
			const fltrd = handleFilter('sale', null, books);
			setFiltered(fltrd);
		}
	}, [showSale]);

	return (
		<Layout>
			<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center xl:flex-wrap xl:gap-3'>
				{getCategories(items).map((cat) => (
					<CategoryButton cat={cat} key={cat} onClick={handleClick} />
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
							<button className='uppercase text-[18px] font-light px-5 py-3 font-[200] border-b-[1px] w-[300px] text-right'>
								Od najdroŻszych
							</button>
						</li>
						<li>
							<button className='uppercase text-[18px] font-light px-5 py-3 font-[200] border-b-[1px] w-[300px] text-right'>
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

export default Books;

{
	/* <div className='flex justify-start mx-auto mb-5 bg-sparkle w-full '>
<button className='flex items-center uppercase border-[1px] px-5 py-2 text-[14px]'>
	sortuj
	<FontAwesomeIcon icon={faChevronDown} className='text-xs ml-1' />
</button>
</div> */
}
