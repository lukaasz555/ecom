import React from 'react';
import CTA from '../../../../components/shared/CTA/CTA';

interface IOrderSumBottom {
	handleClick: () => void;
}

const OrderSummaryBottom = ({ handleClick }: IOrderSumBottom): JSX.Element => {
	return (
		<div className='flex justify-center'>
			<div>
				<CTA body='ZAMAWIAM' onClick={handleClick} />
			</div>
		</div>
	);
};

export default OrderSummaryBottom;
