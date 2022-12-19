import React from 'react';

interface CartBtnErrorProps {
	body: string;
}

const CartBtnError = ({ body }: CartBtnErrorProps) => {
	return (
		<button
			disabled={true}
			className='border-[1px] py-1 px-2 text-[14px] min-w-[200px] bg-whiteBg2'>
			{body}
		</button>
	);
};
export default CartBtnError;
