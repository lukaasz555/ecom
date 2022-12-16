import React, { FC, useEffect, useState } from 'react';
import ArrowToTop from '../../atoms/ArrowToTop/ArrowToTop';
import Top from '../../organisms/Top/Top';

interface ILayout {
	children?: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	const [showArrow, setShowArrow] = useState(false);

	useEffect(() => {
		const h = window.innerHeight;

		window.addEventListener('scroll', () => {
			if (window.scrollY > h) {
				setShowArrow(true);
			} else {
				setShowArrow(false);
			}
		});
	}, []);

	return (
		<div className='min-h-screen max-w-screen bg-white mx-auto xl:px-20'>
			<Top />
			<main className='px-5'>{children}</main>
			{showArrow ? <ArrowToTop /> : null}
		</div>
	);
};

export default Layout;
