import React from 'react';
import { addItem } from '../../../features/cart/cartSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { ProductModel2 } from '../../../models/Product';

interface ButtonProps extends ProductModel2 {
	body: string;
}

const AddToCartBtn = ({ data, body }: ButtonProps) => {
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

	return (
		<button
			className='px-5 py-3 bg-black font-light text-white text-l uppercase hover:bg-sparkle duration-150 min-w-[200px]'
			onClick={addToCart}>
			{body}
		</button>
	);
};

export default AddToCartBtn;
