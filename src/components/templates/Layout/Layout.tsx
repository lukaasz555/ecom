import React, { FC } from 'react';
import Top from '../../organisms/Top/Top';

interface ILayout {
	children?: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	return (
		<div className='min-h-screen max-w-screen bg-white mx-auto xl:px-20'>
			<Top />
			<main className='px-5'>{children}</main>
		</div>
	);
};

export default Layout;
