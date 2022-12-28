import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type DateFilterProps = {
	dateFilter: boolean;
	handleSort: (type: string) => void;
};

const DateFilter = ({ dateFilter, handleSort }: DateFilterProps) => {
	return (
		<ul className={`${dateFilter ? 'flex flex-col' : 'hidden'} px-2`}>
			<li className='text-xs text-left mt-1'>
				<button onClick={() => handleSort('latest')}>
					<FontAwesomeIcon icon={faChevronUp} /> najstarsze
				</button>
			</li>

			<li className='text-xs text-left mt-1'>
				<button onClick={() => handleSort('older')}>
					<FontAwesomeIcon icon={faChevronDown} /> najnowsze
				</button>
			</li>
		</ul>
	);
};

export default DateFilter;
