import React from 'react';
import { ProductModel } from '../../../models/Product';
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { removeItem, addItem } from '../../../features/cart/cartSlice';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';

interface ICartItem {
	data: ProductModel;
	cartItems: ProductModel[] | [];
}

const CartItem = ({ data, cartItems }: ICartItem) => {
	const { img, title, authors, price, discount, id, type } = data;
	const dispatch = useAppDispatch();

	const addToCart = () => {
		dispatch(
			addItem({
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

	const getItemQty = (id: string) => {
		const currentID = id.toLowerCase();
		return cartItems.filter((item) => item.id.toLowerCase() === currentID)
			.length;
	};

	return (
		<div className='flex justify-between border-b-[1px] border-lightBlack pb-2 mb-7 w-full relative pr-10'>
			<section className='flex'>
				<div className=' mr-3 flex justify-end'>
					<Link to={`/shop/product/${type}/${id}`}>
						<img
							src={img}
							alt={`${title} - ${authors}`}
							className='object-contain h-[70px] w-[70px]'
						/>
					</Link>
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

			<div className='text-center'>
				<p>{handleNumbFormat(getItemQty(data.id) * (price - discount))}zł</p>
				<div className='flex justify-around items-center mt-1 text-[20px]'>
					<button onClick={removeFromCard}>-</button>
					{getItemQty(data.id) > 1 ? (
						<p className='text-[14px] text-brownSugar'>
							{getItemQty(data.id)}x
						</p>
					) : (
						<p className='text-[14px]'>{getItemQty(data.id)}x</p>
					)}

					<button onClick={addToCart}>+</button>
				</div>
			</div>

			<div className='ml-4 absolute right-0 top-0'>
				<button onClick={removeFromCard}>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
