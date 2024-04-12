import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layout";
import { FerramentasDetalhe } from "../../shared/components";
import { TaskService } from "../../shared/services/api/Tasks/TasksServices";

import styled from "styled-components";
import { useDrawerContext } from "../../shared/contexts";
import Cookies from "universal-cookie";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledSelect = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const DetalheTasks: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();

    const cookies = new Cookies();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');


    const [nome, setNome] = useState('');
    const [tipoTarefa, setTipoTarefa] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [status, setStatus] = useState<string>('pending');
    const [user, setUser] = useState('');

    const statusOptions = ['pending', 'in-progress', 'completed', 'expired'];


    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 16);
        return formattedDate;
    };

    useEffect(() => {
        const token = cookies.get('token');
        if (!token) {
            handleNav('/login');
            return;
        }
        const decodedToken = decodeToken(token);
        if (!decodedToken) {
            handleNav('/login');
            return;
        }
        if (id !== 'nova') {
            TaskService.getById(id).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                    handleNav('/tasks');
                } else {
                    setNome(result.name);
                    setTipoTarefa(result.type);
                    setStartDate(formatDate(result.startDate));
                    setFinishDate(formatDate(result.finishDate));
                    setStatus(result.status);
                    setUser(result.user);
                }
            });
        }
    }, [id]);

    const navigate = useNavigate();
    const handleNav = (path: string) => {
        navigate(path);
    };

    const handleSave = () => {
        const data = {
            type: tipoTarefa,
            name: nome,
            startDate: startDate,
            finishDate: finishDate,
            status: status,
            user: userId ?? '',
        };
        console.log(data);

        if (id === 'nova') {
            TaskService.create(data).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro salvo com sucesso');
                    handleNav('/tasks');
                }
            });
        } else {
            TaskService.update(id, data).then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro atualizado com sucesso');
                    handleNav('/tasks');
                }
            });
        }
    };

    const handleDelete = (id: string) => {
        TaskService.deletebyId(id).then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                alert('Registro apagado');
                handleNav('/tasks');
            }
        });
    };

    const decodeToken = (token: string) => {
        try {
            const decodedPayload = JSON.parse(atob(token.split('.')[1]));
            return decodedPayload;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    };
    return (
        <LayoutBasePage
            titulo={id === 'nova' ? 'Nova Tarefa' : nome}
            barraDeFerramenta={
                <FerramentasDetalhe
                    showButtonUpdate={false}
                    showButtonDelete={id !== 'nova'}
                    onClickNew={handleSave}
                    onClickDelete={() => handleDelete(id)}
                    onClickBack={() => handleNav(`/tasks`)}
                />
            }
        >
            <FormContainer>
                <StyledInput
                    type="text"
                    placeholder="Tipo da Tarefa"
                    value={tipoTarefa}
                    onChange={(e) => setTipoTarefa(e.target.value)}
                />
                <StyledInput
                    type="text"
                    placeholder="Nome da Tarefa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <StyledInput
                    type="datetime-local"
                    placeholder="Data de Início"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <StyledInput
                    type="datetime-local"
                    placeholder="Data de Término"
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                />
                <StyledSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {statusOptions.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </StyledSelect>
                <StyledInput
                    hidden
                    type="text"
                    placeholder="Usuário"
                    value={userId ?? ''}
                    disabled
                />
            </FormContainer>
        </LayoutBasePage>
    );
};