import React, { FC } from 'react';

type CTAProps = {
	body: string;
};

const CTA: FC<CTAProps> = ({ body }) => {
	return (
		<button className='px-5 py-3 bg-black font-light text-white text-l uppercase hover:bg-sparkle duration-150 min-w-[200px]'>
			{body}
		</button>
	);
};

export default CTA;
