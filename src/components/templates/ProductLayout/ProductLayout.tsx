import React, { FC } from 'react';

type ProductProps = {
	children?: React.ReactNode;
};

const ProductLayout: FC<ProductProps> = ({ children }) => {
	return <div className='max-w-[1200px] mx-auto'>{children}</div>;
};

export default ProductLayout;
