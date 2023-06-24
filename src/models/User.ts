import { UserRolesEnum } from '../enums/UserRolesEnum';

export class User {
	id = '';
	name: string;
	lastname: string;
	email: string;
	role: UserRolesEnum;
	password?: string;
	token?: string;

	constructor(name: string, lastname: string, email: string, password: string) {
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.role = UserRolesEnum.User;
	}
}
