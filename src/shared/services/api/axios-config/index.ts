import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Enviroment } from '../../../environments';

const api = axios.create({
    baseURL: Enviroment.BASE_URL
});

api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);

export {api}