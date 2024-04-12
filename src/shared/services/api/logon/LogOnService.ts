import { ITask } from "../Tasks/TasksServices";
import { api } from "../axios-config";

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
  }

  const create = async (payload : Omit<IUser, '_id'>) : Promise<IUser | Error> => {
    try {
        const {data} = await api.post<IUser>(`/users`,payload);
        if(data) {
            return data;
        }
        return new Error('Erro ao salvar Usuario')
    } catch (error) {
        console.log(error)
        return new Error((error as {message : string}).message || 'Error na api');
    }
}


  export const LogOnService = {
    create

}