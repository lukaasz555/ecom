import React, { useEffect, useState } from 'react';
import { ProductModel } from '../../../../../models/Product';
import CloseIcon from '../../../../../components/shared/CloseIcon/CloseIcon';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/hooks';
import {
	removeItem,
	addItem,
	removeID,
} from '../../../../../features/cart/cartSlice';
import { handleNumbFormat } from '../../../../../helpers/handleNumbFormat';
import { getQty } from '../../../../../helpers/getQty';

interface ICartItem {
	data: ProductModel;
	cartItems: ProductModel[] | [];
}

const CartItem = ({ data, cartItems }: ICartItem) => {
	const [item, setItem] = useState<ProductModel | null>();
	const { img, title, authors, price, discount, id, type } = data;
	const dispatch = useAppDispatch();

	const addToCart = () => {
		if (item) {
			dispatch(addItem(item));
		}
	};

	const removeItemFromCard = () => {
		if (item) {
			dispatch(removeItem(item));
		}
	};

	const removeIdFromCard = () => {
		if (item) {
			dispatch(removeID(item));
		}
	};

	useEffect(() => {
		setItem(data);
	}, [data]);

	return (
		<>
			{getQty(id, cartItems) > 0 ? (
				<div className='flex justify-between border-b-[1px] border-lightBlack pb-2 mb-7 w-full relative pr-10'>
					<section className='flex'>
						<div className=' mr-3 flex justify-end'>
							<Link to={`/shop/products/${type}/item/${id}`}>
								<img
									src={img}
									alt={`${title} - ${authors}`}
									className='object-contain h-[70px] w-[70px]'
								/>
							</Link>
						</div>

						<div className='mr-5'>
							<div className='font-lato'>
								<h4 className='text-m hover:underline'>
									<Link to={`/shop/products/${type}/item/${id}`}>{title}</Link>
								</h4>
								<h5 className='text-sparkle text-s'>{authors.join(', ')}</h5>
							</div>
						</div>
					</section>

					<div className='text-center'>
						<p>
							{handleNumbFormat(getQty(id, cartItems) * (price - discount))}zł
						</p>
						<div className='flex justify-around items-center mt-1 text-l'>
							<button onClick={removeItemFromCard}>-</button>
							{getQty(id, cartItems) > 1 ? (
								<p className='text-s text-brownSugar'>
									{getQty(id, cartItems)}x
								</p>
							) : (
								<p className='text-s mx-2'>{getQty(id, cartItems)}x</p>
							)}

							<button onClick={addToCart}>
								{getQty(id, cartItems) < 5 ? '+' : null}
							</button>
						</div>
					</div>

					<div className='ml-4 absolute right-0 top-0'>
						<button onClick={removeIdFromCard}>
							<CloseIcon />
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};

export default CartItem;
