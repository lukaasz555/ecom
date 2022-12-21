import React, { useState } from 'react';
import CTA from '../../atoms/CTA/CTA';
import { InvoiceDataModel } from '../../../models/CheckoutData';
import { useForm } from 'react-hook-form';
import { ICheckoutForm } from '../../../models/CheckoutData';

interface IInvoiceSection {
	isInvoiceOpen: boolean;
	setInvoiceOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setShippingOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setCheckoutForm: React.Dispatch<React.SetStateAction<ICheckoutForm>>;
	checkoutForm: ICheckoutForm;
}

const InvoiceSection = ({
	isInvoiceOpen,
	setInvoiceOpen,
	setShippingOpen,
	setCheckoutForm,
	checkoutForm,
}: IInvoiceSection) => {
	const [isInvoiceNeeded, setInvoiceNeeded] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<InvoiceDataModel>();

	const onSubmit = (data: InvoiceDataModel) => {
		setCheckoutForm((prev) => ({ ...prev, invoice: data }));
		setCheckoutForm((prev) => ({
			...prev,
			invoice: {
				...prev.invoice,
				isInvoice: isInvoiceNeeded,
			},
		}));
		setInvoiceOpen(false);
		setShippingOpen(true);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-3'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>2. Dane do faktury</h2>
				{checkoutForm.invoice.name !== '' && !isInvoiceOpen ? (
					<button
						onClick={() => setInvoiceOpen(true)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null}
			</div>
			{isInvoiceOpen ? (
				<>
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
									/* 									onChange={() =>
										setCheckoutForm((prev) => ({
											...prev,
											invoice: {
												...prev.invoice,
												isInvoice: false,
											},
										}))
									} */
								/>
								Osoba fizyczna
							</p>

							<p>
								<input
									type='radio'
									name='isInvoice'
									className='mr-1 hover:cursor-pointer'
									onChange={() => setInvoiceNeeded(true)}
									/* onChange={() =>
										setCheckoutForm((prev) => ({
											...prev,
											invoice: {
												...prev.invoice,
												isInvoice: true,
											},
										}))
									} */
								/>
								Firma
							</p>
						</div>
					</div>

					<div className='flex gap-x-3'>
						<div className='basis-1/2'>
							<input
								type='text'
								placeholder='Imię'
								{...register('name', { required: true })}
								className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
							/>
							<p className='text-xs text-brownSugar'>
								{errors.name ? 'Imię jest wymagane' : null}
							</p>
						</div>

						<div className='basis-1/2'>
							<input
								type='text'
								placeholder='Nazwisko'
								{...register('lastname', { required: true })}
								className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
							/>
							<p className='text-xs text-brownSugar'>
								{errors.lastname ? 'Nazwisko jest wymagane' : null}
							</p>
						</div>
					</div>
					{isInvoiceNeeded ? (
						<div className='flex flex-col gap-y-3'>
							<div>
								<input
									type='text'
									placeholder='Nazwa firmy'
									{...register('companyName', {
										required: isInvoiceNeeded ? true : false,
									})}
									className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
								/>
								<p className='text-xs text-brownSugar'>
									{errors.companyName && isInvoiceNeeded
										? 'Wprowadź nazwę firmy'
										: null}
								</p>
							</div>

							<div>
								<input
									type='text'
									placeholder='NIP firmy'
									{...register('nip', {
										required: isInvoiceNeeded ? true : false,
										minLength: 10,
										maxLength: 10,
									})}
									className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
								/>
								<p className='text-xs text-brownSugar'>
									{errors.nip && isInvoiceNeeded
										? 'Podaj prawidłowy NIP (10 znaków)'
										: null}
								</p>
							</div>
						</div>
					) : null}

					<div className='flex flex-col'>
						<div className='mb-3'>
							<input
								type='text'
								placeholder='Adres (ulica, nr budynku / nr lokalu)'
								{...register('address1', { required: true })}
								className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
							/>
							<p className='text-xs text-brownSugar'>
								{errors.address1 ? 'Wprowadź adres' : null}
							</p>
						</div>

						<input
							type='text'
							placeholder='Adres cz.2 (opcjonalnie)'
							{...register('address2', { required: false })}
							className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
						/>
						<p className='text-xs text-brownSugar'>
							{errors.address2 ? 'Wprowadź adres' : null}
						</p>
					</div>

					<div>
						<input
							type='text'
							placeholder='Miasto'
							{...register('city', { required: true })}
							className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
						/>
						<p className='text-xs text-brownSugar'>
							{errors.city ? 'Podaj miasto' : null}
						</p>
					</div>

					<div className='flex gap-x-3'>
						<div className='basis-1/2'>
							<input
								type='text'
								placeholder='Kod pocztowy (xx-xxx)'
								className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
								{...register('postalCode', {
									required: true,
									maxLength: 6,
									minLength: 6,
								})}
							/>
							<p className='text-xs text-brownSugar'>
								{errors.postalCode ? 'Prawidłowy format to XX-XXX' : null}
							</p>
						</div>

						<div className='basis-1/2'>
							<select
								className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
								{...register('country', { required: true })}>
								<option selected value='Polska'>
									Polska
								</option>
							</select>
						</div>
					</div>
				</>
			) : null}

			{isInvoiceOpen ? (
				<CTA body='Kontynuuj' id='invoiceButton' type='submit' />
			) : null}
		</form>
	);
};

export default InvoiceSection;
