import React, { useState } from 'react';
import clsx from 'clsx';

type QtyChooserProps = {
	ordersPerPage: number;
	handleOrdersPerPageChange: (e: React.MouseEvent) => void;
};

const RecordsQtyChooser = ({
	handleOrdersPerPageChange,
	ordersPerPage,
}: QtyChooserProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);

	const options = [5, 10, 15, 20];

	const handleChange = (e: React.MouseEvent) => {
		handleOrdersPerPageChange(e);
		setOpen(false);
	};

	return (
		<div className='ml-12 mr-4 px-2 relative'>
			<button
				onClick={() => setOpen(!isOpen)}
				className='text-l border-black mb-1 py-0 border-b-2'>
				{ordersPerPage}
			</button>
			{isOpen && (
				<ul
					className={clsx(
						'border-[1px] border-brownSugar w-[60px] bg-white',
						'absolute left-1/2 bottom-[100%] -translate-x-1/2'
					)}>
					{options.map((item, index) => (
						<li
							key={item + index}
							className={clsx(
								'flex flex-col items-center my-1 first:mt-0 last:mb-0',
								'hover:bg-black hover:text-white',
								item === ordersPerPage ? 'text-brownSugar ' : 'text-black'
							)}>
							<button
								onClick={(e: React.MouseEvent) => handleChange(e)}
								className='w-[100%]'>
								{item}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RecordsQtyChooser;
