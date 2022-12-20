import React from 'react';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import { ShipDataModel } from '../../../models/CheckoutData';
import CTA from '../../atoms/CTA/CTA';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ICheckoutForm } from '../../../models/CheckoutData';

interface IShippingSection {
	isShippingOpen: boolean;
	setShippingOpen: React.Dispatch<React.SetStateAction<boolean>>;
	shipData: ShipDataModel;
	setShipData: React.Dispatch<React.SetStateAction<ShipDataModel>>;
	checkoutForm: ICheckoutForm | {};
	setCheckoutForm: React.Dispatch<React.SetStateAction<{} | ICheckoutForm>>;
}

const ShippingSection = ({
	isShippingOpen,
	setShippingOpen,
	shipData,
	setShipData,
	checkoutForm,
	setCheckoutForm,
}: IShippingSection) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShipData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleContinue = (e: React.MouseEvent) => {
		setCheckoutForm((prev) => ({ ...prev, shipping: shipData }));
		console.log(checkoutForm);
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
								Paczkomat InPost - 9,90zł (0zł przy zakupach powyzej 99zł)
							</li>
						</ul>
					</div>
					<div className='flex gap-x-5'>
						<div className='basis-1/2'>
							<div className='border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full'>
								{/* 								<select className='text-s px-2 w-[70px] border-[1px] p-2 font-[300] border-[#C7C7C7] bg-white outline-black text-m w-full border-r-0'>
									<option value='PL'>+48</option>
								</select>
								<WhiteInput
									type='number'
									value={shipData.phoneNumber}
									name='phoneNumber'
									placeholder='Nr telefonu'
									onChange={handleInputChange}
									max={999}
									
								/> */}
								<PhoneInput
									name='phoneNumber'
									countries={['PL']}
									style={{ outline: 'black' }}
									addInternationalOption={false}
									placeholder='Numer telefonu'
									value={shipData.phoneNumber}
									onChange={(value: string) =>
										setShipData((prev) => ({
											...prev,
											[shipData.phoneNumber]: value,
										}))
									}
								/>
							</div>

							<p className='text-s font-lato mt-1'>
								- tylko cyfry, <br />- bez numeru kierunkowego,
							</p>
						</div>
						<div className='basis-1/2'>
							<WhiteInput
								type='text'
								value={shipData.inpost}
								placeholder='Numer paczkomatu'
								onChange={handleInputChange}
								name='inpost'
								maxLength={9}
							/>
							<p className='text-s font-lato mt-1'>
								- przykładowe formaty: KRA05APP, GDA147M;
							</p>
							<a
								href='https://inpost.pl/znajdz-paczkomat'
								target='_blank'
								rel='noreferrer'
								className='text-s text-brownSugar font-lato mt-1 hover:underline'>
								Znajdź paczkomat
							</a>
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
