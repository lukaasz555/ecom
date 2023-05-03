import React from 'react';
import DesktopMenuLink from '../../atoms/DesktopMenuLink/DesktopMenuLink';

const DesktopMenu = () => {
	return (
		<nav className='hidden md:block'>
			<DesktopMenuLink body='Książki' to={`/shop/products/books/99`} />
			<DesktopMenuLink body='Płyty' to={`/shop/products/albums/99`} />
			<DesktopMenuLink body='Kontakt' to={`/contact`} />
		</nav>
	);
};

export default DesktopMenu;
