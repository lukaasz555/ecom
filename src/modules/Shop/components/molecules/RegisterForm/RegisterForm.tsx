import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { registerValidation } from '../../../../../helpers/validations';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import CTA from '../../../../../components/shared/CTA/CTA';

const RegisterForm = () => {
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
	const [passwordConfirmationMessage, setPasswordConfirmationMessage] =
		useState<string>('');

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
			console.log(val);
		},
	});

	function handleClick(e: React.MouseEvent): void {
		e.preventDefault();
		formik.handleSubmit();
	}

	useEffect(() => {
		if (
			formik.values.password !== '' &&
			formik.values.password !== passwordConfirmation
		) {
			setPasswordConfirmationMessage('Podane hasła nie są zgodne');
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
			/>
			<CTA body='Stwórz konto' onClick={handleClick} />
		</form>
	);
};

export default RegisterForm;
