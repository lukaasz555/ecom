import React from 'react';
import { Oval } from 'react-loader-spinner';

type LoaderProps = {
	size?: 'large' | 'medium' | 'small';
	dark?: boolean;
};

const Loader = ({ size = 'large', dark = true }: LoaderProps) => {
	const color = dark ? '#140004' : '#FFF';
	const dimension: number = size === 'large' ? 60 : size === 'medium' ? 40 : 20;

	return (
		<Oval
			height={dimension}
			width={dimension}
			color={color}
			wrapperStyle={{}}
			wrapperClass=''
			visible={true}
			ariaLabel='oval-loading'
			secondaryColor={color}
			strokeWidth={dark ? 1 : 3}
			strokeWidthSecondary={1}
		/>
	);
};

export default Loader;
