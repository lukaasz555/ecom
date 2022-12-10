import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type ALTProps = {
	to: string;
	body: string;
};

const ALT: FC<ALTProps> = ({ to, body }) => {
	return (
		<Link
			to={to}
			className=' pointer uppercase border-[1px] px-5 py-2 hover:bg-black hover:text-white duration-150'>
			{body}
		</Link>
	);
};

export default ALT;
