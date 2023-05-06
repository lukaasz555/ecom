import React from 'react';
import closeIcon from '../../../assets/icons/close-x.svg';

type CloseIconProps = {
	height?: number;
	width?: number;
	onClick?: () => void;
};

const CloseIcon = ({ height = 14, width = 14, onClick }: CloseIconProps) => {
	return (
		<img
			src={closeIcon}
			alt='remove'
			height={height}
			width={width}
			onClick={onClick}
		/>
	);
};

export default CloseIcon;
