export interface EmailDataModel {
	emailAddress: string;
	isConsent: boolean;
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
	isInvoice: boolean;
}

export interface ShipDataModel {
	phoneNumber: string;
	inpost: string;
}

export interface ICheckoutForm {
	email: EmailDataModel;
	invoice: InvoiceDataModel;
	ship: ShipDataModel;
}
