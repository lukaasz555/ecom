import React from 'react';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import { ShipDataModel } from '../../../models/CheckoutData';
import CTA from '../../atoms/CTA/CTA';

interface IShippingSection {
	isShippingOpen: boolean;
	setShippingOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleClick: (e: React.MouseEvent) => void;
	shipData: ShipDataModel;
	setShipData: React.Dispatch<React.SetStateAction<ShipDataModel>>;
}

const ShippingSection = ({
	isShippingOpen,
	setShippingOpen,
	handleClick,
	shipData,
	setShipData,
}: IShippingSection) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShipData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleContinue = (e: React.MouseEvent) => {
		// valid inputs...
		handleClick(e);
	};

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>3. Dostawa</h2>
				{/* 				{shippingFilled ? (
					<button
						onClick={() => setShippingFilled(false)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null} */}
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
							<WhiteInput
								type='text'
								value={shipData.phoneNumber}
								name='phoneNumber'
								placeholder='Nr telefonu'
								onChange={handleInputChange}
								maxLength={9}
							/>
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
