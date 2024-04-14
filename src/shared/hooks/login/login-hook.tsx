import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useLoginHook = () => {

    const [userId, setUserId] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const decodedToken = decodeToken(token);
        if (!decodedToken || isTokenExpired(decodedToken)) {
            redirectToLogin();
            return;
        }

        const { userId } = decodedToken;
        setUserId(userId);
    }, []);

    const decodeToken = (token: string) => {
        try {
            const decodedPayload = JSON.parse(atob(token.split('.')[1]));
            return decodedPayload;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    };

    const isTokenExpired = (decodedToken: { exp: number }) => {
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(decodedToken.exp)
        return decodedToken.exp < currentTime;
    };

    const redirectToLogin = () => {
        navigate('/login');
    };
    return userId;

}