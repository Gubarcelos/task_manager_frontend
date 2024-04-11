
import { api } from "../axios-config"

export interface ITask {
    _id : string,
    type : string,
    name : string,
    startDate : string,
    finishDate : string,
    status : string,
    user : string
}


const getUserTasks = async (userId : string) : Promise<ITask [] | Error> => {
    try {
        const {data} = await api.get(`/tasks/user/${userId}`);
        if(data) {
            return data;
        }
        return new Error('Erro ao pegar tasks')
    } catch (error) {
        console.log(error)
        return new Error((error as {message : string}).message || 'Error na api');
    }
}

const getById = async (id : string) : Promise<ITask | Error > => {
    try {
        const {data} = await api.get(`/tasks/${id}`);
        if(data) {
            return data;
        }
        return new Error('Erro ao pegar tasks')
    } catch (error) {
        console.log(error)
        return new Error((error as {message : string}).message || 'Error na api');
    }
}

const create = async (payload : Omit<ITask, '_id'>) : Promise<ITask | Error> => {
    try {
        const {data} = await api.post<ITask>(`/tasks`,payload);
        if(data) {
            return data;
        }
        return new Error('Erro ao salvar task')
    } catch (error) {
        console.log(error)
        return new Error((error as {message : string}).message || 'Error na api');
    }
}

const update = async (_id : string, payload : any) : Promise<any> => {
    try {
        const {data} = await api.post<ITask>(`/tasks/${_id}`,payload);
        if(data) {
            return data;
        }
        return new Error('Erro ao atualizar task')
    } catch (error) {
        console.log(error)
        return new Error((error as {message : string}).message || 'Error na api');
    }
}

const deletebyId = async (_id : string) : Promise<void | Error> => {
    try {
        await api.delete(`/tasks/${_id}`);
    } catch (error) {
        console.log(error)
        return new Error((error as {message : string}).message || 'Error na api');
    }
}


export const TaskService = {
    getUserTasks,
    getById,
    create,
    update,
    deletebyId
}