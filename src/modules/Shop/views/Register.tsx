import React from 'react';
import CheckoutLayout from '../components/templates/CheckoutLayout/CheckoutLayout';
import RegisterForm from '../components/molecules/RegisterForm/RegisterForm';
import LoginForm from '../components/molecules/LoginForm/LoginForm';
import { useAppSelector } from '../../../hooks/hooks';

const Register = () => {
	const isRegistrationSuccessful = useAppSelector(
		(state) => state.authReducer.isRegistrationSuccessful
	);

	return (
		<CheckoutLayout>
			<div className='flex flex-col items-center bg-white px-4 py-5 border-altBorder border-[1px]'>
				<h2 className='uppercase text-xl font-lato mb-6'>rejestracja</h2>
				{isRegistrationSuccessful ? (
					<div className='flex flex-col items-center'>
						<div className='flex flex-col items-center mb-6 text-s'>
							<p>Konto zostało utworzone</p>
							<p>Możesz się zalogować</p>
						</div>
						<LoginForm />
					</div>
				) : (
					<RegisterForm />
				)}
			</div>
		</CheckoutLayout>
	);
};

export default Register;
