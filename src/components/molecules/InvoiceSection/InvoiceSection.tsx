import React, { useState } from 'react';
import CTA from '../../atoms/CTA/CTA';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import { InvoiceDataModel } from '../../../models/CheckoutData';

interface IInvoiceSection {
	invoiceData: InvoiceDataModel;
	setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceDataModel>>;
	isInvoiceOpen: boolean;
	setInvoiceOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleClick: (e: React.MouseEvent) => void;
}

const InvoiceSection = ({
	invoiceData,
	setInvoiceData,
	isInvoiceOpen,
	setInvoiceOpen,
	handleClick,
}: IInvoiceSection) => {
	const [invoice, setInvoice] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) =>
		setInvoiceData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));

	const handleContinue = (e: React.MouseEvent) => {
		console.log(invoiceData);
		// valid inputs...
		handleClick(e);
	};

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>2. Dane do faktury</h2>
				{invoiceData.name !== '' && !isInvoiceOpen ? (
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
						<form className='flex gap-x-5'>
							<p>
								<input
									type='radio'
									name='invoiceInput'
									value='noInvoice'
									className='mr-1 hover:cursor-pointer'
									defaultChecked
									onChange={() => setInvoice(false)}
								/>
								Osoba fizyczna
							</p>

							<p>
								<input
									type='radio'
									name='invoiceInput'
									value='invoice'
									className='mr-1 hover:cursor-pointer'
									onChange={() => setInvoice(true)}
								/>
								Firma
							</p>
						</form>
					</div>

					<div className='flex gap-x-3'>
						<WhiteInput
							type='text'
							value={invoiceData.name}
							placeholder='Imię'
							name='name'
							onChange={handleInputChange}
						/>
						<WhiteInput
							type='text'
							value={invoiceData.lastname}
							placeholder='Nazwisko'
							name='lastname'
							onChange={handleInputChange}
						/>
					</div>
					{invoice ? (
						<div className='flex flex-col gap-y-3'>
							<WhiteInput
								type='text'
								value={invoiceData.companyName}
								placeholder='Nazwa firmy'
								name='companyName'
								onChange={handleInputChange}
							/>
							<WhiteInput
								type='text'
								value={invoiceData.companyNip}
								placeholder='NIP firmy'
								name='companyNip'
								onChange={handleInputChange}
							/>
						</div>
					) : null}

					<div className='flex flex-col gap-y-3'>
						<WhiteInput
							type='text'
							value={invoiceData.address1}
							placeholder='Adres (ulica, nr budynku / nr lokalu)'
							name='address1'
							onChange={handleInputChange}
						/>
						<WhiteInput
							type='text'
							value={invoiceData.address2}
							placeholder='Adres cz.2 (opcjonalnie)'
							name='address2'
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<WhiteInput
							type='text'
							value={invoiceData.city}
							placeholder='Miasto'
							name='city'
							onChange={handleInputChange}
						/>
					</div>

					<div className='flex gap-x-3'>
						<WhiteInput
							type='text'
							value={invoiceData.postalCode}
							placeholder='Kod pocztowy (xx-xxx)'
							name='postalCode'
							onChange={handleInputChange}
						/>

						<select
							className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'
							value={invoiceData.country}
							name='country'
							onChange={handleInputChange}>
							<option selected value='Polska'>
								Polska
							</option>
							<option value='DE'>Niemcy</option>
						</select>
					</div>
				</>
			) : null}

			{isInvoiceOpen ? (
				<CTA body='Kontynuuj' id='invoiceButton' onClick={handleContinue} />
			) : null}
		</div>
	);
};

export default InvoiceSection;
