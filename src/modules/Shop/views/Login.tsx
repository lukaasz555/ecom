import React from 'react';
import CheckoutLayout from '../components/templates/CheckoutLayout/CheckoutLayout';
import LoginForm from '../components/molecules/LoginForm/LoginForm';

const Login = () => {
	return (
		<CheckoutLayout>
			<div className='flex flex-col items-center bg-white px-4 py-5 border-altBorder border-[1px]'>
				<h2 className='uppercase text-xl font-lato mb-6'>logowanie</h2>
				<LoginForm />
			</div>
		</CheckoutLayout>
	);
};

export default Login;
