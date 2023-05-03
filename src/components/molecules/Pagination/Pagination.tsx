import React from 'react';
import RecordsQtyChooser from '../../atoms/RecordsQtyChooser/RecordsQtyChooser';
import PaginationButtons from '../../atoms/PaginationButtons/PaginationButtons';

type PaginationProps = {
	currentPage: number;
	pageCount: number;
	itemsPerPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	options: number[];
};

const Pagination = (props: PaginationProps) => {
	const { currentPage, pageCount, itemsPerPage } = props;
	const { setCurrentPage, setItemsPerPage } = props;

	function handleNextPage(): void {
		currentPage < pageCount
			? setCurrentPage(currentPage + 1)
			: setCurrentPage(1);
	}

	function handlePreviousPage(): void {
		currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
	}

	function handleOrdersPerPageChange(e: React.MouseEvent): void {
		const target = e.target as Element;
		setItemsPerPage(Number(target.innerHTML));
	}

	return (
		<div className='flex w-[100%] justify-end'>
			{pageCount < 2 ? null : (
				<PaginationButtons
					handleNextPage={handleNextPage}
					handlePrevPage={handlePreviousPage}
					currentPage={currentPage}
					pageCount={pageCount}
				/>
			)}

			<RecordsQtyChooser
				ordersPerPage={itemsPerPage}
				handleOrdersPerPageChange={handleOrdersPerPageChange}
				options={props.options}
			/>
		</div>
	);
};

export default Pagination;
