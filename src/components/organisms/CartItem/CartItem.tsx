import React from 'react';
import { ProductModel } from '../../../models/Product';
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { removeItem } from '../../../features/cart/cartSlice';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';

interface ICartItem {
	data: ProductModel;
}

const CartItem = ({ data }: ICartItem) => {
	const { img, title, authors, price, discount, id, type } = data;
	const dispatch = useAppDispatch();

	const removeFromCard = () => {
		dispatch(
			removeItem({
				categoryID: data.categoryID,
				description: data.description,
				discount: data.discount,
				format: data.format,
				id: data.id,
				img: data.img,
				price: data.price,
				releaseYear: data.releaseYear,
				title: data.title,
				type: data.type,
				label: data.label,
				language: data.language,
				pages: data.pages,
				publisher: data.publisher,
				authors: data.authors,
			})
		);
	};

	return (
		<div className='flex justify-between border-b-[1px] border-lightBlack pb-1 mb-7 w-full relative pr-10'>
			<section className='flex'>
				<div className='h-[80px] min-w-[80px] mr-3'>
					<img
						src={img}
						alt={`${title} - ${authors}`}
						className='object-contain h-[100%]'
					/>
				</div>

				<div className='mr-5'>
					<div className='font-lato'>
						<h4 className='text-[16px] hover:underline'>
							<Link to={`/shop/product/${type}/${id}`}>{title}</Link>
						</h4>
						<h5 className='text-sparkle text-[14px]'>{authors.join(', ')}</h5>
					</div>
				</div>
			</section>

			<div>{handleNumbFormat(price - discount)}zł</div>

			<div className='ml-4 absolute right-0 top-0'>
				<button onClick={removeFromCard}>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
