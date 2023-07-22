import React from 'react';
import RecordsQtyChooser from './RecordsQtyChooser';
import PaginationButtons from './PaginationButtons';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
	pageCount: number;
	options?: number[];
};

const Pagination = (props: PaginationProps) => {
	const { pageCount } = props;
	const [searchParams, setSearchParams] = useSearchParams();
	const limit = searchParams.get('limit');
	const page = searchParams.get('page');
	console.log(limit, page, 'pagination component');

	if (!limit || !page) {
		setSearchParams((prev) => {
			prev.set('page', '1');
			prev.set('limit', '10');
			return prev;
		});
	}

	function handleNextPage(): void {
		if (Number(page) < pageCount) {
			setSearchParams((prev) => {
				prev.set('page', String(Number(page) + 1));
				return prev;
			});
		}
	}

	function handlePreviousPage(): void {
		if (Number(page) > 1) {
			setSearchParams((prev) => {
				prev.set('page', String(Number(page) - 1));
				return prev;
			});
		}
	}

	function handleLimitChange(e: React.MouseEvent): void {
		const target = e.target as Element;
		setSearchParams((prev) => {
			prev.set('limit', target.innerHTML);
			return prev;
		});
	}

	return (
		<div className='flex w-[100%] px-4 md:justify-end'>
			<div className='mr-auto md:hidden'></div>
			{pageCount < 2 ? null : (
				<PaginationButtons
					handleNextPage={handleNextPage}
					handlePrevPage={handlePreviousPage}
					currentPage={Number(page)}
					pageCount={pageCount}
				/>
			)}

			<RecordsQtyChooser
				limit={Number(limit)}
				handleLimitChange={handleLimitChange}
				options={props.options}
			/>
		</div>
	);
};

export default Pagination;
