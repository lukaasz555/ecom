import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { registerValidation } from '../../../../../helpers/validations';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import InputErrorMessage from '../../../../../components/shared/InputErrorMessage/InputErrorMessage';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../../models/User';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../../../../features/auth/authSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../../hooks/hooks';

const RegisterForm = () => {
	const message = useAppSelector((state) => state.authReducer.message);
	const loading = useAppSelector((state) => state.authReducer.loading);
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
	const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
		useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			name: '',
			lastname: '',
			consent: false,
		},
		validationSchema: registerValidation,
		onSubmit: (val) => {
			const user = new User(val);
			dispatch(userRegister(user));
		},
	});

	function handleClick(e: React.MouseEvent): void {
		e.preventDefault();
		if (formik.values.password === passwordConfirmation) {
			formik.handleSubmit();
		}
	}

	useEffect(() => {
		if (
			formik.values.password !== '' &&
			formik.values.password !== passwordConfirmation &&
			passwordConfirmation.trim() !== ''
		) {
			setPasswordConfirmationMessage('Podane hasła nie są zgodne');
		} else {
			setPasswordConfirmationMessage('');
		}
	}, [formik.values.password, passwordConfirmation]);

	return (
		<form onSubmit={formik.handleSubmit} className='w-[280px]'>
			<GrayInput
				type='text'
				label='Imię:'
				name='name'
				onChange={formik.handleChange}
				value={formik.values.name}
				error={formik.touched.name ? formik.errors.name : undefined}
			/>

			<GrayInput
				type='text'
				label='Nazwisko:'
				name='lastname'
				onChange={formik.handleChange}
				value={formik.values.lastname}
				error={formik.touched.lastname ? formik.errors.lastname : undefined}
			/>

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
			<GrayInput
				type='password'
				label='Powtórz hasło:'
				name='confirmPassword'
				onChange={(
					e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
				) => setPasswordConfirmation(e.target.value)}
				value={passwordConfirmation}
				error={passwordConfirmationMessage}
			/>

			<div className='flex flex-col mt-6 mb-8'>
				<div className='flex items-center'>
					<input
						type='checkbox'
						checked={formik.values.consent}
						name='consent'
						className='mr-2 cursor-pointer outline-black outline-offset-2 h-[16px] w-[16px] checked:bg-brownSugar'
						onChange={formik.handleChange}
						required
					/>
					<p>
						Akceptuję{' '}
						<button
							className='text-brownSugar hover:underline'
							onClick={() => navigate('/terms')}>
							regulamin
						</button>{' '}
						sklepu
					</p>
				</div>
				{formik.errors.consent && (
					<div>
						<InputErrorMessage
							text={formik.touched.consent ? formik.errors.consent : ''}
						/>
					</div>
				)}
			</div>
			<p>{message}</p>
			<CTA
				body='Stwórz konto'
				type='submit'
				onClick={handleClick}
				size='small'
				isLoading={loading}
			/>
		</form>
	);
};

export default RegisterForm;
