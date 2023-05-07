import React from 'react';

interface IContactDetails {
	emailAddress: string;
	phoneNumber: string;
	inpost: string;
}

const ContactDetails = ({
	emailAddress,
	phoneNumber,
	inpost,
}: IContactDetails): JSX.Element => {
	return (
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
	);
};

export default ContactDetails;
