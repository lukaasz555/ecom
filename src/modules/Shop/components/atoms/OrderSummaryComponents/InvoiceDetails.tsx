import React from 'react';
import { InvoiceDataModel } from '../../../../../models/CheckoutData';

interface IInvoiceDetails {
	invoiceDetails: InvoiceDataModel;
}

const InvoiceDetails = ({ invoiceDetails }: IInvoiceDetails) => {
	const {
		isInvoice,
		name,
		lastname,
		companyName,
		nip,
		address1,
		address2,
		postalCode,
		city,
	} = invoiceDetails;
	return (
		<div>
			<h3 className='font-lato font-[400]'>Dane do faktury:</h3>
			<ul className='font-lato font-[300]'>
				{!isInvoice ? (
					<li>
						<p>
							{name} {lastname}
						</p>
					</li>
				) : null}

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
	);
};

export default InvoiceDetails;
