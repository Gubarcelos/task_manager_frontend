import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layout";
import { FerramentasDetalhe } from "../../shared/components";
import { TaskService } from "../../shared/services/api/Tasks/TasksServices";

export const DetalheTasks : React.FC = () => { 

    const { id = 'nova' }  = useParams<'id'>();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [tipoTarefa, setTipoTarefa] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [status, setStatus] = useState('');
    const [user, setUser] = useState('');

    useEffect(()=> {
        if(id !== 'nova') {
            TaskService.getById(id)
            .then((result)=> {
                setIsLoading(false)
                if(result instanceof Error) {
                    alert(result.message);
                    handleNav('/tasks');
                } else {
                    setNome(result.name);
                    setTipoTarefa(result.type);
                    setStartDate(result.startDate);
                    setFinishDate(result.finishDate);
                    setStatus(result.status);
                    setUser(result.user);
                }
            });
        }
    }, [id]);

    const navigate = useNavigate();
    const handleNav = (path : string) => {
        navigate(path);
    }

    const handleSave = () => {
        const data = {
            type: tipoTarefa,
            name: nome,
            startDate: startDate,
            finishDate: finishDate,
            status: status,
            user: user
        };

        if (id === 'nova') {
            TaskService.create(data)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro salvo com sucesso');
                    handleNav('/tasks');
                }
            });
        } else {
            TaskService.update(id, data)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro atualizado com sucesso');
                    handleNav('/tasks');
                }
            });
        }
    };

    const handleDelete = (id : string) => {
        TaskService.deletebyId(id)
        .then((result) => {
            if(result instanceof Error) {
                alert(result.message);
            } else {
                alert('Registro apagado');
                handleNav('/tasks');
            }
        });
    };

    return (
        <LayoutBasePage 
        titulo={id === 'nova' ? 'Nova Tarefa' : nome}
        barraDeFerramenta ={
            <FerramentasDetalhe
            showButtonUpdate = {true}
            showButtonDelete = {id !== 'nova'}

            onClickUpdate={() => {}}
            onClickNew={handleSave}
            onClickDelete={()=>handleDelete(id)}
            onClickBack={()=> handleNav(`/tasks`)}
            />
        }
        >
            {/* Formulário */}
            <form>
                <input 
                    type="text"
                    placeholder="Tipo da Tarefa"
                    value={tipoTarefa}
                    onChange={(e) => setTipoTarefa(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Nome da Tarefa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input 
                    type="date"
                    placeholder="Data de Início"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input 
                    type="date"
                    placeholder="Data de Término"
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </form>
        </LayoutBasePage>
    );
};