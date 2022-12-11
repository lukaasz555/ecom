import React from 'react';
import DesktopMenuLink from '../../atoms/DesktopMenuLink/DesktopMenuLink';

const DesktopMenu = () => {
	return (
		<nav className='hidden md:block'>
			<DesktopMenuLink body='Książki' to={`/shop/books`} />
			<DesktopMenuLink body='Płyty' to={`/shop/albums`} />
			<DesktopMenuLink body='Kontakt' to={`/contact`} />
		</nav>
	);
};

export default DesktopMenu;
