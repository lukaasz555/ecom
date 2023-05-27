import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { registerValidation } from '../../../../../helpers/validations';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import InputErrorMessage from '../../../../../components/shared/InputErrorMessage/InputErrorMessage';
import { useNavigate } from 'react-router-dom';
import { addNewUser } from '../../../../../features/user/userSlice';
import { User } from '../../../../../models/User';
import { useDispatch } from 'react-redux';

const RegisterForm = () => {
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
	const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
		useState<string>('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

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
			const user = new User(
				val.lastname,
				val.lastname,
				val.email,
				val.password
			);
			dispatch(addNewUser(user));
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
		<form onSubmit={formik.handleSubmit} className='min-w-[280px]'>
			<GrayInput
				type='text'
				label='Imię:'
				name='name'
				onChange={formik.handleChange}
				value={formik.values.name}
				error={formik.errors.name}
			/>

			<GrayInput
				type='text'
				label='Nazwisko:'
				name='lastname'
				onChange={formik.handleChange}
				value={formik.values.lastname}
				error={formik.errors.lastname}
			/>

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
						<InputErrorMessage text={formik.errors.consent} />
					</div>
				)}
			</div>
			<CTA body='Stwórz konto' type='submit' onClick={handleClick} />
		</form>
	);
};

export default RegisterForm;
