import React from 'react';
import { useNavigate } from 'react-router-dom';

const Return = () => {
	const navigate = useNavigate();
	return (
		<button
			className='flex justify-between items-center uppercase group'
			onClick={() => navigate(-1)}>
			<svg
				className='mr-2 group-hover:-translate-x-1 duration-200'
				width='24'
				height='24'
				xmlns='http://www.w3.org/2000/svg'
				fill-rule='evenodd'
				clip-rule='evenodd'>
				<path d='M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z' />
			</svg>
			powrót
		</button>
	);
};

export default Return;
