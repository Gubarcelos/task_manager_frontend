
import Cookies from "universal-cookie";
import { api } from "../axios-config";

export interface ILogin {
    email : string,
    password : string;
}

const login = async (payload: ILogin): Promise<void | Error> => {
    try {
        const response = await api.post(`/auth/login`, payload);
        console.log(response.data);
        console.log(response.headers.getAuthorization);
        console.log(response.status);
        console.log(response);

        if (response.status === 204 && response.headers.getAuthorization) {
            const cookies = new Cookies();
            cookies.set('token', response.headers.authorization, { path: '/', maxAge: 3600 }); // Defina o tempo de expiração conforme necessário
            return;
        }
        return new Error('Erro ao fazer login');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro na API');
    }
}
export const LoginService = {
    login
}