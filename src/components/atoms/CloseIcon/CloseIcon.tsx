import React from 'react';
import closeIcon from '../../../assets/icons/close-x.svg';

const CloseIcon = () => {
	return (
		<button className='px-2'>
			<img src={closeIcon} alt='remove' />
		</button>
	);
};

export default CloseIcon;
