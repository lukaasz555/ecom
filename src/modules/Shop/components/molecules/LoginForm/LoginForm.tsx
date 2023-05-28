import React from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import { loginValidation } from '../../../../../helpers/validations';
import { useFormik } from 'formik';
import CTA from '../../../../../components/shared/CTA/CTA';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../../../features/auth/authSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../../hooks/hooks';

const LoginForm = () => {
	const message = useAppSelector((state) => state.authReducer.message);
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: loginValidation,
		onSubmit: async (values) => {
			await dispatch(
				userLogin({
					email: values.email,
					password: values.password,
				})
			);
		},
	});

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		formik.handleSubmit();
	};

	return (
		<form onSubmit={formik.handleSubmit} className='min-w-[280px]'>
			<GrayInput
				type='email'
				label='E-mail:'
				name='email'
				onChange={formik.handleChange}
				value={formik.values.email}
				error={formik.errors.email}
			/>
			<GrayInput
				type='password'
				label='Hasło:'
				name='password'
				onChange={formik.handleChange}
				value={formik.values.password}
				error={formik.errors.password}
			/>
			<p>{message}</p>
			<div className='flex flex-col gap-y-5 mt-8'>
				<CTA body='Zaloguj się' type='submit' onClick={handleClick} />
				<div className='flex justify-center'>
					<button
						onClick={() => navigate('/register')}
						className='px-2 underline underline-offset-4'>
						Chcę założyć konto
					</button>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
