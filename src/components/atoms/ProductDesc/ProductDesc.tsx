import React, { FC } from 'react';

type PDescProps = {
	description: string;
};

const ProductDesc: FC<PDescProps> = ({ description }) => {
	return (
		<div className='mt-10  w-full'>
			<h3 className='uppercase text-xl border-b-[1px] mb-3 pb-2 font-lato font-light'>
				OPIS
			</h3>
			{description === '' ? (
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus maiores
					iusto voluptatem fuga adipisci repellendus eveniet doloremque tenetur,
					omnis, voluptatibus sed tempore recusandae vero veritatis amet vitae
					animi provident quod. Qui, in officia.
					<br />
					<br />
					Veniam molestias nisi quam, minus ratione ut velit ea dignissimos
					reprehenderit nemo at perferendis accusantium nostrum voluptate omnis!
					Delectus exercitationem et perspiciatis sint totam saepe beatae
					reprehenderit?
					<br />
					<br />
					Quas delectus, earum iste fuga qui explicabo quasi tenetur voluptates,
					consequuntur commodi nesciunt praesentium. Maiores dolorum debitis,
					corrupti culpa quo voluptate, et odio eum nisi delectus sint nulla
					maxime dolores!
				</p>
			) : (
				<p>{description}</p>
			)}
		</div>
	);
};

export default ProductDesc;
