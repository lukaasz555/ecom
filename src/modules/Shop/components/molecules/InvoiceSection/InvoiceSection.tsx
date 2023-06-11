import React, { useContext, useEffect, useState } from 'react';
import CTA from '../../../../../components/shared/CTA/CTA';
import { CheckoutCtx } from '../../../views/Checkout';
import { useFormik } from 'formik';
import { invoiceValidation } from '../../../../../helpers/validations';
import WhiteInput from '../../../../../components/shared/WhiteInput/WhiteInput';

interface IInvoiceSection {
	isInvoiceOpen: boolean;
	setInvoiceOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setShippingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoiceSection = ({
	isInvoiceOpen,
	setInvoiceOpen,
	setShippingOpen,
}: IInvoiceSection) => {
	const formData = useContext(CheckoutCtx);
	const [isInvoiceNeeded, setInvoiceNeeded] = useState(false);

	const formik = useFormik({
		initialValues: {
			address1: formData.invoice.address1,
			address2: formData.invoice.address2,
			city: formData.invoice.city,
			companyName: formData.invoice.companyName,
			country: formData.invoice.country,
			isInvoice: formData.invoice.isInvoice,
			lastname: formData.invoice.lastname,
			name: formData.invoice.name,
			nip: formData.invoice.nip,
			postalCode: formData.invoice.postalCode,
		},
		validationSchema: invoiceValidation,
		onSubmit: (val) => {
			formData.setInvoiceData(val);
			setInvoiceOpen(false);
			setShippingOpen(true);
		},
	});

	function handleForm(e: React.MouseEvent): void {
		e.preventDefault();
		formik.handleSubmit();
	}

	useEffect(() => {
		isInvoiceNeeded
			? (formik.values.isInvoice = true)
			: (formik.values.isInvoice = false);
	}, [isInvoiceNeeded]);

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-3'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>2. Dane do faktury</h2>
				{!isInvoiceOpen ? (
					<button
						onClick={() => setInvoiceOpen(true)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null}
			</div>
			{isInvoiceOpen ? (
				<form className='flex flex-col gap-y-3' onSubmit={formik.handleSubmit}>
					<div className='text-s'>
						<p className='mb-1'>Kupuję jako:</p>
						<div className='flex gap-x-5'>
							<p>
								<input
									type='radio'
									name='isInvoice'
									className='mr-1 hover:cursor-pointer'
									defaultChecked
									onChange={() => setInvoiceNeeded(false)}
								/>
								Osoba fizyczna
							</p>

							<p>
								<input
									type='radio'
									name='isInvoice'
									className='mr-1 hover:cursor-pointer'
									onChange={() => setInvoiceNeeded(true)}
								/>
								Firma
							</p>
						</div>
					</div>

					<div className='flex gap-x-3'>
						<div className='basis-1/2'>
							<WhiteInput
								name='name'
								type='text'
								placeholder='Imię'
								value={formik.values.name}
								error={formik.touched.name ? formik.errors.name : undefined}
								onChange={formik.handleChange}
							/>
						</div>
						<div className='basis-1/2'>
							<WhiteInput
								name='lastname'
								type='text'
								placeholder='Nazwisko'
								value={formik.values.lastname}
								error={
									formik.touched.lastname ? formik.errors.lastname : undefined
								}
								onChange={formik.handleChange}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-y-3 w-full'>
						{isInvoiceNeeded ? (
							<>
								<WhiteInput
									name='companyName'
									type='text'
									placeholder='Nazwa firmy'
									value={formik.values.companyName}
									error={
										formik.touched.companyName && isInvoiceNeeded
											? formik.errors.companyName
											: undefined
									}
									onChange={formik.handleChange}
								/>
								<WhiteInput
									name='nip'
									type='number'
									placeholder='NIP firmy'
									value={formik.values.nip}
									error={
										formik.touched.nip && isInvoiceNeeded
											? formik.errors.nip
											: undefined
									}
									onChange={formik.handleChange}
								/>
							</>
						) : null}
						<WhiteInput
							name='address1'
							type='text'
							placeholder='Adres (ulica, nr budynku/lokal)'
							value={formik.values.address1}
							error={
								formik.touched.address1 ? formik.errors.address1 : undefined
							}
							onChange={formik.handleChange}
						/>

						<WhiteInput
							name='address2'
							type='text'
							placeholder='Adres cz.2 (opcjonalnie)'
							value={formik.values.address2}
							onChange={formik.handleChange}
						/>

						<WhiteInput
							name='city'
							type='text'
							placeholder='Miasto'
							value={formik.values.city}
							error={formik.touched.city ? formik.errors.city : undefined}
							onChange={formik.handleChange}
						/>

						<div className='flex gap-x-3'>
							<div className='basis-1/2'>
								<WhiteInput
									name='postalCode'
									type='text'
									placeholder='Kod pocztowy (xx-xxx)'
									value={formik.values.postalCode}
									error={
										formik.touched.postalCode
											? formik.errors.postalCode
											: undefined
									}
									onChange={formik.handleChange}
									maxLength={6}
								/>
							</div>
							<div className='basis-1/2'>
								<select
									className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
									value={formik.values.country}
									onChange={formik.handleChange}>
									<option value='Polska'>Polska</option>
								</select>
							</div>
						</div>
					</div>
					<CTA
						body='Kontynuuj'
						id='invoiceButton'
						type='submit'
						onClick={handleForm}
					/>
				</form>
			) : null}
		</div>
	);
};

export default InvoiceSection;
