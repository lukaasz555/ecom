import React from 'react';
import { ICheckoutForm } from '../../../models/CheckoutData';
import CTA from '../../atoms/CTA/CTA';
import { useAppSelector } from '../../../hooks/hooks';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { getQty } from '../../../helpers/getQty';
import { productsValue } from '../../../helpers/productsValue';

interface OrderSummaryProps {
	checkoutForm: ICheckoutForm;
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummary = ({ checkoutForm, setFormFilled }: OrderSummaryProps) => {
	const {
		name,
		lastname,
		companyName,
		nip,
		address1,
		address2,
		postalCode,
		city,
		isInvoice,
	} = checkoutForm.invoice;
	const { emailAddress } = checkoutForm.email;
	const { phoneNumber, inpost } = checkoutForm.ship;

	const items = useAppSelector((state) => state.cart.items);
	const uniqItems = useAppSelector((state) => state.cart.uniqueItems);

	const itemsCost: number = productsValue(items);
	const deliveryCost: number = 9.9;
	const total: number = itemsCost + deliveryCost;

	const handleClick = () => console.log(checkoutForm);

	return (
		<div className='OrderSummary bg-white px-4 py-5 border-[#C7C7C7] border-[1px] w-full flex flex-col gap-y-8 '>
			<div className='flex justify-between items-start'>
				<h1 className='text-xl font-[400] font-lato mb-2'>
					Podsumowanie zamówienia
				</h1>
				<button
					onClick={() => setFormFilled(false)}
					className='hover:underline text-pencil text-s'>
					Zmień dane
				</button>
			</div>

			<div>
				<h3 className='font-lato font-[400]'>Dane kontaktowe:</h3>
				<ul className='font-lato font-[300]'>
					<li>
						<p>{emailAddress}</p>
						<p>{phoneNumber}</p>
						<p>
							Wybrany paczkomat: <span className='font-[400]'>{inpost}</span>
						</p>
					</li>
				</ul>
			</div>

			<div>
				<h3 className='font-lato font-[400]'>Dane do faktury:</h3>
				<ul className='font-lato font-[300]'>
					<li>
						<p>
							{name} {lastname}
						</p>
					</li>
					{isInvoice ? (
						<li>
							<p>{companyName}</p>
							<p>NIP: {nip}</p>
						</li>
					) : null}
					<li>
						<p>{address1}</p>
						<p>{address2}</p>
					</li>
					<li>
						<p>
							{postalCode} {city}
						</p>
					</li>
				</ul>
			</div>

			<div className='flex flex-col'>
				<h3 className='font-lato font-[400] mb-2'>Produkty:</h3>
				<div className='flex flex-col items-between font-lato text-s font-[300] '>
					<div className='flex border-b-[1px] mb-1 pb-1 px-3 justify-between '>
						<div className='basis-[60%]'>
							<p>nazwa</p>
						</div>
						<div className='basis-[15%] text-center'>
							<p>ilość</p>
						</div>
						<div className='basis-[15%] text-right'>
							<p>cena</p>
						</div>
					</div>

					{uniqItems.map(({ title, price, discount, id }) => (
						<div className='flex font-[400] px-3 justify-between mb-1'>
							<div className='basis-[60%]'>
								<p>{title}</p>
							</div>
							<div className='basis-[15%] text-center'>
								<p>{getQty(id, items)}</p>
							</div>
							<div className='basis-[15%] text-right'>
								<p>
									{handleNumbFormat(getQty(id, items) * (price - discount))} zł
								</p>
							</div>
						</div>
					))}

					{itemsCost <= 99 ? (
						<div className='flex font-[400] px-3'>
							<div className='basis-[60%] '>
								<p>Wysyłka - Paczkomaty InPost</p>
							</div>

							<div className='basis-[40%] text-right'>
								<p>{handleNumbFormat(deliveryCost)} zł</p>
							</div>
						</div>
					) : null}

					<div className='flex font-[400] px-3 mt-3 justify-end'>
						<div>
							<p className='text-m'>Łącznie: {handleNumbFormat(total)} zł</p>
						</div>
					</div>
				</div>
			</div>

			<div className='flex justify-center'>
				<div>
					<CTA body='ZAMAWIAM' onClick={handleClick} />
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
