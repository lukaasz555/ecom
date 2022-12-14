import React, { useState } from 'react';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import CTA from '../../atoms/CTA/CTA';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ICheckoutForm } from '../../../models/CheckoutData';
import { inpostValidation } from '../../../helpers/validations';

interface IShippingSection {
	isShippingOpen: boolean;
	setShippingOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setCheckoutForm: React.Dispatch<React.SetStateAction<ICheckoutForm>>;
	checkoutForm: ICheckoutForm;
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShippingSection = ({
	isShippingOpen,
	setShippingOpen,
	checkoutForm,
	setCheckoutForm,
	setFormFilled,
}: IShippingSection) => {
	const [phoneNoError, setPhoneNoError] = useState(false);
	const [inpostError, setInpostError] = useState(false);

	const validation = (phone: string, inpost: string) => {
		if (phone.length === 12 && inpost.length >= 5 && inpost.length <= 10) {
			return true;
		} else {
			return false;
		}
	};

	const handleContinue = (e: React.MouseEvent) => {
		let isPhoneValid = false;
		let isInpostValid = false;
		const { phoneNumber, inpost } = checkoutForm.ship;
		if (phoneNumber.length !== 12) {
			setPhoneNoError(true);
		} else {
			setPhoneNoError(false);
			isPhoneValid = true;
		}

		if (inpostValidation(inpost)) {
			setInpostError(false);
			isInpostValid = true;
		} else {
			setInpostError(true);
		}

		if (isPhoneValid && isInpostValid) {
			setFormFilled(true);
		}
	};

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>3. Dostawa</h2>
				{isShippingOpen ? (
					<button
						onClick={() => setShippingOpen(false)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null}
			</div>
			{isShippingOpen ? (
				<>
					<div>
						<h3 className='text-l font-[400] font-lato mb-2'>Opcje dostawy</h3>
						<ul>
							<li className='text-s font-lato flex items-center'>
								<input type='checkbox' checked disabled className='mr-2' />
								Paczkomat InPost - 9,90z?? (0z?? przy zakupach powyzej 99z??)
							</li>
						</ul>
					</div>
					<div className='flex flex-col gap-y-3'>
						<div>
							<div className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'>
								<PhoneInput
									name='phoneNumber'
									countries={['PL']}
									style={{ outline: 'black' }}
									addInternationalOption={false}
									placeholder='Numer telefonu'
									limitMaxLength={true}
									onChange={(value: string) =>
										setCheckoutForm((prev) => ({
											...prev,
											ship: {
												...prev.ship,
												phoneNumber: value,
											},
										}))
									}
								/>
							</div>

							<p className='text-s font-lato mt-1 text-brownSugar'>
								{phoneNoError ? 'Wprowad?? poprawny numer telefonu' : null}
							</p>
						</div>
						<div>
							<WhiteInput
								type='text'
								value={checkoutForm.ship.inpost}
								placeholder='Numer paczkomatu (np. GDA147M)'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const value = e.target.value;
									setCheckoutForm((prev) => ({
										...prev,
										ship: {
											...prev.ship,
											inpost: value.toUpperCase(),
										},
									}));
								}}
								name='inpost'
								maxLength={9}
								minLength={5}
							/>
							<p className='text-s font-lato mt-1 mb-2 text-brownSugar'>
								{inpostError ? 'Kod paczkomatu jest nieprawid??owy' : null}
							</p>
							<div className='flex justify-between items-start'>
								<a
									href='https://inpost.pl/znajdz-paczkomat'
									target='_blank'
									rel='noreferrer'
									className='text-s text-brownSugar font-lato mt-1 hover:underline'>
									Znajd?? sw??j paczkomat
								</a>
							</div>
						</div>
					</div>
					<div>
						{isShippingOpen ? (
							<CTA
								body='podsumowanie'
								id='shipButton'
								onClick={handleContinue}
							/>
						) : null}
					</div>
				</>
			) : null}
		</div>
	);
};

export default ShippingSection;
