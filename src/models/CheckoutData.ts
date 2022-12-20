export interface EmailDataModel {
	email: string;
	consent: boolean;
}

export interface InvoiceDataModel {
	name: string;
	lastname: string;
	companyName: string;
	nip: string;
	address1: string;
	address2: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface ShipDataModel {
	countryCode: string;
	phoneNumber: string;
	inpost: string;
}

export interface ICheckoutForm {
	email: EmailDataModel;
	invoice: InvoiceDataModel;
	shipping: ShipDataModel;
}
