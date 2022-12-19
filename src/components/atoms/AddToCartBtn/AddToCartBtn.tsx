import React, { useEffect, useState } from 'react';
import { addItem } from '../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ProductModel2 } from '../../../models/Product';
import { getQty } from '../../../helpers/getQty';
import CartBtnError from '../CartBtnError/CartBtnError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps extends ProductModel2 {
	body: string;
}

const AddToCartBtn = ({ data, body }: ButtonProps) => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.items);
	const [isAdded, setAdded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (getQty(data.id, cartItems) < 5) {
			setError(false);
		} else {
			setError(true);
		}
	}, [cartItems]);

	const addToCart = () => {
		if (getQty(data.id, cartItems) < 5) {
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
					className='px-5 py-3 bg-black font-light text-white text-m uppercase hover:bg-sparkle duration-150 min-w-[200px]'
					onClick={addToCart}>
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
