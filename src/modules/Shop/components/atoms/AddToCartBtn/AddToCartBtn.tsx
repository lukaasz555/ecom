import React, { useEffect, useState } from 'react';
import { addItem } from '../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ProductModel } from '../../../models/Product';
import { getQty } from '../../../helpers/getQty';
import CartBtnError from '../CartBtnError/CartBtnError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
	data: ProductModel;
	body: string;
	tabIndex?: number;
}

const AddToCartBtn = ({ data, body, tabIndex = 0 }: ButtonProps) => {
	const dispatch = useAppDispatch();
	const [item, setItem] = useState<ProductModel | null>();
	const cartItems = useAppSelector((state) => state.cartReducer.items);
	const [isAdded, setAdded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (getQty(data.id, cartItems) < 5) {
			setError(false);
		} else {
			setError(true);
		}
	}, [cartItems]);

	useEffect(() => {
		setItem(data);
	}, []);

	const addToCart = () => {
		if (item && getQty(data.id, cartItems) < 5) {
			dispatch(addItem(item));
			setAdded(true);
		} else {
			setError(true);
		}
	};

	return (
		<>
			{error ? (
				<CartBtnError body='Możesz kupić maksymalnie 5 szt.' />
			) : (
				<button
					className='px-5 py-3 bg-black font-light text-white text-m uppercase hover:bg-sparkle min-w-[200px]'
					onClick={addToCart}
					tabIndex={tabIndex}>
					{isAdded ? (
						<span>
							<FontAwesomeIcon icon={faCheck} /> dodano
						</span>
					) : (
						body
					)}
				</button>
			)}
		</>
	);
};

export default AddToCartBtn;
