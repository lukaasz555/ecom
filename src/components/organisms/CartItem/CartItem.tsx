import React from 'react';
import { ProductModel } from '../../../models/Product';
import CloseIcon from '../../atoms/CloseIcon/CloseIcon';
import { Link } from 'react-router-dom';

interface ICartItem {
	data: ProductModel;
}

const CartItem = ({ data }: ICartItem) => {
	const { img, title, authors, price, discount, id, type } = data;

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

			<div>{(price - discount).toFixed(2)}zł</div>

			<div className='ml-4 absolute right-0 top-0'>
				<CloseIcon />
			</div>
		</div>
	);
};

export default CartItem;
