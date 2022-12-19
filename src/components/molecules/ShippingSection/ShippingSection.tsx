import React from 'react';

const ShippingSection = () => {
	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>3. Dostawa</h2>
				{/* 				{shippingFilled ? (
					<button
						onClick={() => setShippingFilled(false)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null} */}
			</div>
			<div>
				<h3 className='text-l font-[400] font-lato mb-2'>Opcje dostawy</h3>
				<ul>
					<li className='text-s font-lato flex items-center'>
						<input type='checkbox' checked disabled className='mr-2' />
						Paczkomat InPost - 9,90zł (0zł przy zakupach powyzej 99zł)
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ShippingSection;
