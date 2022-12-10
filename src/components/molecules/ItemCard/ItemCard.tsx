import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import CTA from '../../atoms/CTA/CTA';
import Price from '../../atoms/Price/Price';

interface IItemCard {
	id: string;
	title: string;
	price: number;
	img: string;
	discount: number;
	authors: string[];
	type: 'book' | 'music';
}

const ItemCard: FC<IItemCard> = ({
	id,
	title,
	price,
	img,
	discount,
	type,
	authors,
}) => {
	return (
		<div className='flex flex-col mb-20 w-[340px] px-10'>
			<section className=''>
				<div
					className={`group w-[100%] flex justify-center border-[1px] border-solid border-grey relative
                after:content-[''] after:absolute after:left-0 after:top-0 after:h-[100%] after:w-full after:shadow-xl
                after:opacity-0 hover:after:opacity-100
                `}>
					<div className='absolute h-[100%] w-full bg-whiteBg z-20 flex justify-center items-center opacity-0 hover:opacity-100 duration-300'>
						<CTA body='do koszyka' />
					</div>
					<img
						src={img}
						alt={title}
						className={`${
							type === 'book' ? 'h-[360px]' : 'h-auto'
						} w-full px-5 py-5 z-10`}
					/>
				</div>
				<div className='flex flex-col px-2 mt-2'>
					<h3 className='text-xl text-clip w-[100%]'>
						<Link to={`/shop/product/${type}/${id}`}>{title}</Link>
					</h3>
					<h4>{authors}</h4>
					<div className='flex justify-between mt-1'>
						<div>
							<Price atProductPage={false} discount={discount} price={price} />
						</div>
						<div>
							{discount > 0 ? (
								<h5 className='inline font-medium text-brownSugar'>SALE</h5>
							) : null}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ItemCard;
