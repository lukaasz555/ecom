import React, { useContext } from 'react';
import WhiteInput from '../../../../../components/shared/WhiteInput/WhiteInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import { CheckoutCtx } from '../../../views/Checkout';
import { shippingValidation } from '../../../../../helpers/validations';
import { useFormik } from 'formik';

interface IShippingSection {
	isShippingOpen: boolean;
	setShippingOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShippingSection = ({
	isShippingOpen,
	setShippingOpen,
	setFormFilled,
}: IShippingSection) => {
	const formData = useContext(CheckoutCtx);
	const formik = useFormik({
		initialValues: {
			inpost: formData.ship.inpost,
			phoneNumber: formData.ship.phoneNumber,
		},
		validationSchema: shippingValidation,
		onSubmit: (val) => {
			formData.setShipSection(val.inpost, val.phoneNumber);
			setFormFilled(true);
		},
	});

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>3. Dostawa</h2>
				{!isShippingOpen ? (
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
					<form
						className='flex flex-col gap-y-3'
						onSubmit={formik.handleSubmit}>
						<div>
							<WhiteInput
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								error={formik.errors.phoneNumber}
								type='number'
								name='phoneNumber'
								maxLength={9}
								placeholder='Numer telefonu (bez numeru kierunkowego)'
							/>
						</div>
						<div>
							<WhiteInput
								type='text'
								value={formik.values.inpost}
								placeholder='Numer paczkomatu (np. GDA147M)'
								onChange={formik.handleChange}
								name='inpost'
								error={formik.errors.inpost}
							/>

							<div className='flex justify-between items-start'>
								<a
									href='https://inpost.pl/znajdz-paczkomat'
									target='_blank'
									rel='noreferrer'
									className='text-s text-brownSugar font-lato mt-1 hover:underline'>
									Znajdź swój paczkomat
								</a>
							</div>
						</div>
						<CTA body='podsumowanie' id='shipButton' type='submit' />
					</form>
				</>
			) : null}
		</div>
	);
};

export default ShippingSection;
