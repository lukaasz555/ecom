import React, { useEffect } from 'react';
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
	const user = useAppSelector((state) => state.userReducer.user);
	const message = useAppSelector((state) => state.authReducer.message);
	const loading = useAppSelector((state) => state.authReducer.loading);
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

	useEffect(() => {
		if (user) {
			navigate('/account/settings');
		}
	}, [user]);

	return (
		<form onSubmit={formik.handleSubmit} className='min-w-[280px]'>
			<GrayInput
				type='email'
				label='E-mail:'
				name='email'
				onChange={formik.handleChange}
				value={formik.values.email}
				error={formik.touched.email ? formik.errors.email : undefined}
			/>
			<GrayInput
				type='password'
				label='Hasło:'
				name='password'
				onChange={formik.handleChange}
				value={formik.values.password}
				error={formik.touched.password ? formik.errors.password : undefined}
			/>
			<p>{message}</p>
			<div className='flex flex-col gap-y-5 mt-8'>
				<CTA
					body='Zaloguj się'
					type='submit'
					onClick={handleClick}
					isLoading={loading}
					size='small'
				/>
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
