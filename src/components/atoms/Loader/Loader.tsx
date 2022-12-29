import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
	return (
		<Oval
			height={60}
			width={60}
			color='#140004'
			wrapperStyle={{}}
			wrapperClass=''
			visible={true}
			ariaLabel='oval-loading'
			secondaryColor='#140004'
			strokeWidth={1}
			strokeWidthSecondary={1}
		/>
	);
};

export default Loader;
