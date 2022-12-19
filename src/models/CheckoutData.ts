export interface EmailDataModel {
	email: string;
	consent: boolean;
}

export interface InvoiceDataModel {
	name: string;
	lastname: string;
	companyName: string;
	companyNip: string;
	address1: string;
	address2: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface ShipDataModel {
	phoneNumber: string;
	inpost: string;
}
