import React, { useEffect } from 'react';
import Layout from '../components/templates/Layout/Layout';
import { useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

const Account = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	return (
		<Layout>
			<div className='flex justify-center'>/account</div>
		</Layout>
	);
};

export default Account;
