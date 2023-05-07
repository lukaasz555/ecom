import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type PriceFilterProps = {
	priceFilter: boolean;
	handleSort: (type: string) => void;
};

const PriceFilter = ({ priceFilter, handleSort }: PriceFilterProps) => {
	return (
		<ul
			className={`${
				priceFilter ? 'flex flex-col' : 'hidden'
			} px-2 text-xs text-left mb-1`}>
			<li className='mt-1'>
				<button
					onClick={() => handleSort('grow')}
					className='flex gap-x-1 items-center'>
					<FontAwesomeIcon icon={faChevronUp} /> rosnąco
				</button>
			</li>

			<li className='mt-1'>
				<button
					onClick={() => handleSort('decrease')}
					className='flex gap-x-1 items-center '>
					<FontAwesomeIcon icon={faChevronDown} /> malejąco
				</button>
			</li>
		</ul>
	);
};

export default PriceFilter;
