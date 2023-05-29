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
export class CheckoutForm {
	email: EmailDataModel;
	invoice: InvoiceDataModel;
	ship: ShipDataModel;

	constructor(email?: string) {
		this.email = {
			emailAddress: '',
			isConsent: false,
		};
		this.invoice = {
			isInvoice: false,
			companyName: '',
			nip: '',
			name: '',
			lastname: '',
			address1: '',
			address2: '',
			city: '',
			postalCode: '',
			country: '',
		};
		this.ship = {
			inpost: '',
			phoneNumber: '',
		};
		if (email) {
			this.email = {
				emailAddress: email,
				isConsent: false,
			};
		}
	}

	setEmailSection(emailAddress: string, isConsent: boolean) {
		this.email = {
			emailAddress,
			isConsent,
		};
	}
	setInvoiceData(invoice: InvoiceDataModel) {
		this.invoice = {
			isInvoice: invoice.isInvoice,
			companyName: invoice.companyName,
			nip: invoice.nip,
			name: invoice.name,
			lastname: invoice.lastname,
			address1: invoice.address1,
			address2: invoice.address2,
			city: invoice.city,
			postalCode: invoice.postalCode,
			country: invoice.country,
		};
	}
	setShipSection(inpost: string, phoneNumber: string) {
		this.ship = {
			inpost,
			phoneNumber,
		};
	}
}
