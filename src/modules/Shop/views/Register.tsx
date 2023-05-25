import React from 'react';
import CheckoutLayout from '../components/templates/CheckoutLayout/CheckoutLayout';
import RegisterForm from '../components/molecules/RegisterForm/RegisterForm';

const Register = () => {
	return (
		<CheckoutLayout>
			<div className='flex flex-col items-center bg-white px-4 py-5 border-altBorder border-[1px]'>
				<h2>rejestracja</h2>
				<RegisterForm />
			</div>
		</CheckoutLayout>
	);
};

export default Register;
