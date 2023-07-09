import { UserRolesEnum } from '../enums/UserRolesEnum';

interface RegisterForm {
	name: string;
	lastname: string;
	email: string;
	password: string;
	consent?: boolean;
}

export class User {
	id = 'user';
	name: string;
	lastname: string;
	email: string;
	role: UserRolesEnum;
	password?: string;
	token?: string;
	consent?: boolean = false;

	constructor(registerForm: RegisterForm) {
		this.name = registerForm.name;
		this.lastname = registerForm.lastname;
		this.email = registerForm.email;
		this.password = registerForm.password;
		this.consent = registerForm.consent;
		this.role = UserRolesEnum.User;
	}
}
