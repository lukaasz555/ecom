import React, { FC } from 'react';

interface IItemCard {
	id: string;
	title: string;
	price: number;
	img: string;
	discount: number;
}

const ItemCard: FC<IItemCard> = ({ id, title, price, img, discount }) => {
	return (
		<div className='flex flex-col my-5 w-[340px] px-10'>
			<section className=''>
				<div
					className={`group w-[100%] flex justify-center border-[1px] border-solid border-grey relative
                after:content-[''] after:absolute after:left-0 after:top-0 after:h-[100%] after:w-full after:shadow-xl
                after:opacity-0 hover:after:opacity-100
                `}>
					<div className='absolute h-[100%] w-full bg-whiteBg z-20 flex justify-center items-center opacity-0 hover:opacity-100 duration-300'>
						<button className='px-5 py-2 bg-black font-light text-white text-l uppercase'>
							do koszyka
						</button>
					</div>
					<img
						src={img}
						alt={title}
						className='h-[360px] w-full px-5 py-5 z-10'
					/>
				</div>
				<div className='flex flex-col px-2 mt-2'>
					<h3 className='text-xl text-clip w-[100%]'>{title}</h3>
					<div className='flex justify-between'>
						<div>
							<h4 className='text-l text-sparkle font-light'>
								{(price - discount).toFixed(2)}
								{discount > 0 ? <del className='ml-2'>{price}</del> : null}
							</h4>
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
