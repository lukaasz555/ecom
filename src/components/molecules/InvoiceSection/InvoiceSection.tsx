import React, { useState } from 'react';
import CTA from '../../atoms/CTA/CTA';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';

interface IShippingSection {
	shippingFilled: boolean;
	setShippingFilled: React.Dispatch<React.SetStateAction<boolean>>;
	handleEmailFilled: () => void;
}

const InvoiceSection = ({
	shippingFilled,
	setShippingFilled,
	handleEmailFilled,
}: IShippingSection) => {
	const handleClick = (e: React.MouseEvent) => {
		setShippingFilled(true);
	};
	const [invoice, setInvoice] = useState(false);
	const [invoiceForm, setInvoiceForm] = useState({
		name: '',
		lastname: '',
		companyName: '',
		companyNip: '',
		address1: '',
		address2: '',
		city: '',
		postalCode: '',
		country: 'Polska',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInvoiceForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>2. Dane do faktury</h2>
				{shippingFilled ? (
					<button
						onClick={() => setShippingFilled(false)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null}
			</div>
			{shippingFilled ? null : (
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
							value={invoiceForm.name}
							placeholder='Imię'
							name='name'
							onChange={handleInputChange}
						/>
						<WhiteInput
							type='text'
							value={invoiceForm.lastname}
							placeholder='Nazwisko'
							name='lastname'
							onChange={handleInputChange}
						/>
					</div>
					{invoice ? (
						<div className='flex flex-col gap-y-3'>
							<WhiteInput
								type='text'
								value={invoiceForm.companyName}
								placeholder='Nazwa firmy'
								name='companyName'
								onChange={handleInputChange}
							/>
							<WhiteInput
								type='text'
								value={invoiceForm.companyNip}
								placeholder='NIP firmy'
								name='companyNip'
								onChange={handleInputChange}
							/>
						</div>
					) : null}

					<div className='flex flex-col gap-y-3'>
						<WhiteInput
							type='text'
							value={invoiceForm.address1}
							placeholder='Adres (ulica, nr budynku / nr lokalu)'
							name='address1'
							onChange={handleInputChange}
						/>
						<WhiteInput
							type='text'
							value={invoiceForm.address2}
							placeholder='Adres cz.2 (opcjonalnie)'
							name='address2'
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<WhiteInput
							type='text'
							value={invoiceForm.city}
							placeholder='Miasto'
							name='city'
							onChange={handleInputChange}
						/>
					</div>

					<div className='flex gap-x-3'>
						<WhiteInput
							type='text'
							value={invoiceForm.postalCode}
							placeholder='Kod pocztowy (xx-xxx)'
							name='postalCode'
							onChange={handleInputChange}
						/>

						<select className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'>
							<option value='Poland' defaultChecked>
								Polska
							</option>
						</select>
					</div>
				</>
			)}

			{shippingFilled ? null : <CTA body='Kontynuuj' onClick={handleClick} />}
		</div>
	);
};

export default InvoiceSection;
