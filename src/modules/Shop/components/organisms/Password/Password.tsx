import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { passwordUpdateValidation } from '../../../../../helpers/validations';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import { useAppSelector } from '../../../../../hooks/hooks';
import { changePassword } from '../../../../../services/user.service';

const Password = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [isSuccess, setSuccess] = useState(false);
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
			changePassword({
				email: user!.email,
				password: values.password,
				newPassword: values.newPassword,
			});
		},
	});

	function handleClick(e: React.MouseEvent): void {
		e.preventDefault();
		formik.handleSubmit();
	}

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
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Password;
