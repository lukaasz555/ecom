import React from 'react';
import { Link } from 'react-router-dom';
import { ProductModel2 } from '../../../models/Product';
import Price from '../../molecules/Price/Price';
import AddToCartBtn from '../../atoms/AddToCartBtn/AddToCartBtn';
import NotAvailable from '../../atoms/NotAvailable/NotAvailable';

const ItemCard = ({ data }: ProductModel2) => {
	const { img, title, type, id, authors, discount, price } = data;
	return (
		<div className='flex flex-col mb-20 w-[260px] px-10'>
			<section>
				<div
					className={`group w-[100%] flex justify-center border-[1px] border-solid border-grey relative
                after:content-[''] after:absolute after:left-0 after:top-0 after:h-[100%] after:w-full after:shadow-xl
                after:opacity-0 hover:after:opacity-100
                `}>
					<div className='absolute h-[100%] w-full bg-whiteBg z-20 flex justify-center items-center opacity-0 hover:opacity-100 duration-300'>
						{price > 0 ? (
							<AddToCartBtn body='do koszyka' data={data} />
						) : (
							<NotAvailable />
						)}
					</div>
					<img
						src={img}
						alt={title}
						className={`${
							type === 'books' ? 'h-[250px]' : 'h-auto'
						} w-full px-5 py-5`}
					/>
				</div>
				<div className='flex flex-col mt-2'>
					<h3 className='text-center md:text-left text-l w-[100%] font-lato font-[400] '>
						<Link
							to={`/shop/products/${type}/item/${id}`}
							className='focus:underline focus:text-brownSugar outline-none'
							title={title}>
							{title.length < 36 ? title : title.substring(0, 36).concat('...')}
						</Link>
					</h3>
					<h4 className='text-center md:text-left text-pencil text-m font-lato'>
						{authors.join(', ')}
					</h4>
					<div className='flex justify-center  md:justify-between items-center mt-1'>
						<div>
							<Price atProductPage={false} discount={discount} price={price} />
						</div>
						<div>
							{discount > 0 ? (
								<h5 className='ml-1 text-l md:ml-0 inline font-medium text-brownSugar'>
									SALE
								</h5>
							) : null}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ItemCard;
