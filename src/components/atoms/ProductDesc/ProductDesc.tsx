import React, { FC } from 'react';
import { Markup } from 'interweave';

type PDescProps = {
	description: string;
};

const ProductDesc: FC<PDescProps> = ({ description }) => {
	const desc = description;
	return (
		<div className='mt-10  w-full'>
			<h3 className='uppercase text-xl border-b-[1px] mb-3 pb-2 font-lato font-light'>
				OPIS
			</h3>
			<Markup content={desc} className='font-sans' />
		</div>
	);
};

export default ProductDesc;
