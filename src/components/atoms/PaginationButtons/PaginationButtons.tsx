import React from 'react';
import clsx from 'clsx';

type PaginationButtonsProps = {
	currentPage: number;
	pageCount: number;
	handleNextPage: () => void;
	handlePrevPage: () => void;
};

const PaginationButtons = ({
	currentPage,
	handleNextPage,
	handlePrevPage,
	pageCount,
}: PaginationButtonsProps) => {
	return (
		<div className='flex items-center'>
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 1 ? true : false}
				className={clsx('disabled:opacity-0')}>
				<svg
					className='mr-2'
					width='22'
					height='22'
					xmlns='http://www.w3.org/2000/svg'
					fillRule='evenodd'
					clipRule='evenodd'>
					<path d='M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z' />
				</svg>
			</button>
			<p className='text-l'>
				{currentPage}/{pageCount}
			</p>
			<button
				onClick={handleNextPage}
				disabled={currentPage === pageCount ? true : false}
				className={clsx('disabled:opacity-0')}>
				<svg
					className='ml-2 group-hover:translate-x-1 duration-200 rotate-180'
					width='22'
					height='22'
					xmlns='http://www.w3.org/2000/svg'
					fillRule='evenodd'
					clipRule='evenodd'>
					<path d='M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z' />
				</svg>
			</button>
		</div>
	);
};

export default PaginationButtons;
