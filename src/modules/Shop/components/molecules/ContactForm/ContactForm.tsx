import React, { useState } from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import Textarea from '../../../../../components/shared/Textarea/Textarea';
import CTA from '../../../../../components/shared/CTA/CTA';
import { sendMessage } from '../../../../../services/contact.service';
import { useFormik } from 'formik';
import { messageValidation } from '../../../../../helpers/validations';

const ContactForm = () => {
	const [postError, setPostError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isSent, setSent] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		formik.handleSubmit();
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			subject: '',
			message: '',
		},
		validationSchema: messageValidation,
		onSubmit: (values) => {
			setLoading(true);
			sendMessage(values)
				.then(() => {
					setSent(true);
					setPostError(false);
					formik.values.email = '';
					formik.values.subject = '';
					formik.values.message = '';
				})
				.catch((e) => setPostError(true))
				.finally(() => setLoading(false));
		},
	});

	return (
		<form
			className='flex flex-col lg:basis-[50%]'
			onSubmit={formik.handleSubmit}>
			<GrayInput
				type='email'
				label='Twój e-mail:'
				name='email'
				onChange={formik.handleChange}
				value={formik.values.email}
				error={formik.errors.email}
			/>
			<GrayInput
				type='text'
				label='Temat:'
				name='subject'
				onChange={formik.handleChange}
				value={formik.values.subject}
				error={formik.errors.subject}
			/>

			<Textarea
				name='message'
				label='Wiadomość:'
				onChange={formik.handleChange}
				value={formik.values.message}
				error={formik.errors.message}
			/>
			{postError ? (
				<div className='mt-3 mb-6 text-m lg:text-s text-brownSugar'>
					<p> Coś poszło nie tak, spróbuj ponownie</p>
				</div>
			) : null}

			<div className='mt-10 lg:mt-3  lg:self-start h-[50px]'>
				{isSent ? (
					<p className='mt-3 text-m text-darkGreen font-[500] font-lato'>
						Dziękujemy za przesłanie wiadomości!
					</p>
				) : (
					<CTA
						body='wyślij'
						onClick={handleClick}
						isLoading={isLoading}
						size='small'
						type='submit'
					/>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
