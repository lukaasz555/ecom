import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type PriceFilterProps = {
	priceFilter: boolean;
	handleSort: (type: string) => void;
};

const PriceFilter = ({ priceFilter, handleSort }: PriceFilterProps) => {
	return (
		<ul className={`${priceFilter ? 'flex flex-col' : 'hidden'} px-2`}>
			<li className='text-xs text-left mt-1'>
				<button onClick={() => handleSort('grow')}>
					<FontAwesomeIcon icon={faChevronUp} /> rosnąco
				</button>
			</li>

			<li className='text-xs text-left mt-1'>
				<button onClick={() => handleSort('decrease')}>
					<FontAwesomeIcon icon={faChevronDown} /> malejąco
				</button>
			</li>
		</ul>
	);
};

export default PriceFilter;
