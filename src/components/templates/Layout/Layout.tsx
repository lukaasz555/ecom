import React, { FC } from 'react';
import Top from '../../organisms/Top/Top';

interface ILayout {
	children?: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	return (
		<div className='min-h-screen max-w-screen-lg bg-white mx-auto'>
			<Top />
			{children}
		</div>
	);
};

export default Layout;
