import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

type DesktopLink = {
	to: string;
	body: string;
};

const DesktopMenuLink: FC<DesktopLink> = ({ to, body }) => {
	const activeLink =
		'border-b-[1px] border-solid border-black font-lato pb-1 mr-3 last:mr-0 font-light text-m';
	const defaultLink =
		'border-none mr-3 font-lato last:mr-0 pb-1 text-sparkle font-light text-m';
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
			{body}
		</NavLink>
	);
};

export default DesktopMenuLink;
