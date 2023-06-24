import jwt_decode from 'jwt-decode';

export function getDataFromJWT<T>(jwt: string) {
	return jwt_decode(jwt) as T;
}
