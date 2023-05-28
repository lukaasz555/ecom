import { UserRolesEnum } from '../enums/UserRolesEnum';
export class User {
	name: string;
	lastname: string;
	email: string;
	password: string;
	role: UserRolesEnum;

	constructor(name: string, lastname: string, email: string, password: string) {
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.role = UserRolesEnum.User;
	}
}
