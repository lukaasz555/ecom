import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type MobileLink = {
	to: string;
	body: string;
};

const MobileMenuLink: FC<MobileLink> = ({ to, body }) => {
	return (
		<Link
			to={to}
			className='text-l my-2 py-1 font-lato font-light focus:outline outline-2 outline-lightBlack outline-offset-4 active:outline-black'>
			{body}
		</Link>
	);
};

export default MobileMenuLink;
