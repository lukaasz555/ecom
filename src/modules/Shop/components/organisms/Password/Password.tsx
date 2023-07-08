import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { passwordUpdateValidation } from '../../../../../helpers/validations';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import { useAppSelector } from '../../../../../hooks/hooks';
import { userPasswordEdit } from '../../../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../../../models/api';
import { User } from '../../../../../models/User';
import { resetMessage } from '../../../../../features/user/userSlice';

const Password = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const loading = useAppSelector((state) => state.userReducer.isLoading);
	const stateMessage = useAppSelector((state) => state.userReducer.message);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
	const [confirmationError, setConfirmationError] = useState('');
	const [isPasswordConfirmed, setPasswordConfirmed] = useState(false);
	const formik = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
		},
		validationSchema: passwordUpdateValidation,
		onSubmit: async (values) => {
			dispatch(
				userPasswordEdit({
					email: user!.email,
					password: values.password,
					newPassword: values.newPassword,
				})
			).then((res) => {
				const data = res.payload as ApiResponse<User>;
				if (data.status === 200) {
					values.password = '';
					values.newPassword = '';
					setNewPasswordConfirmation('');
				}
			});
		},
	});

	function handleClick(e: React.MouseEvent): void {
		e.preventDefault();
		formik.handleSubmit();
	}

	useEffect(() => {
		dispatch(resetMessage());
	}, [window.location.href]);

	useEffect(() => {
		if (formik.values.newPassword === newPasswordConfirmation) {
			setPasswordConfirmed(true);
			setConfirmationError('');
		} else {
			setConfirmationError('Podane hasła są różne');
			setPasswordConfirmed(false);
		}
	}, [formik.values.newPassword, newPasswordConfirmation]);

	return (
		<>
			<div className='flex flex-col items-center md:items-start mx-8'>
				<header className='flex flex-col md:flex-row md:justify-between items-center w-[100%]'>
					<h2 className='uppercase text-xl font-lato'>zmiana hasła</h2>
				</header>

				<div className='flex gap-x-4 mt-6 flex-wrap'>
					<div className='flex flex-col w-[100%] md:w-[300px]'>
						<GrayInput
							name='password'
							type='password'
							label='Stare hasło'
							value={formik.values.password}
							onChange={formik.handleChange}
							error={
								formik.touched.password ? formik.errors.password : undefined
							}
						/>
						<GrayInput
							name='newPassword'
							type='password'
							label='Nowe hasło'
							value={formik.values.newPassword}
							onChange={formik.handleChange}
							error={
								formik.touched.newPassword
									? formik.errors.newPassword
									: undefined
							}
						/>
						<GrayInput
							name='newPasswordConfirmation'
							type='password'
							label='Powtórz hasło'
							value={newPasswordConfirmation}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
							) => setNewPasswordConfirmation(e.target.value)}
							error={confirmationError}
						/>
						<CTA
							body='zmień hasło'
							disabled={
								!isPasswordConfirmed || formik.values.password.trim() === ''
							}
							onClick={handleClick}
							isLoading={loading}
							size='small'
						/>
						<p className='text-brownSugar text-[13px] mt-2'>{stateMessage}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Password;
