import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layout";
import { FerramentasDetalhe } from "../../shared/components";
import { TaskService } from "../../shared/services/api/Tasks/TasksServices";

// Styled Components
import styled from "styled-components";
import { useDrawerContext } from "../../shared/contexts";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%; /* Agora o formulário ocupará toda a largura disponível */
    margin: 0; /* Removendo a margem automática */
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #007bff; /* Mudança de cor ao focar */
  }
`;

export const DetalheTasks: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    console.log('o id é '+userId);

    const [nome, setNome] = useState('');
    const [tipoTarefa, setTipoTarefa] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [status, setStatus] = useState('');
    const [user, setUser] = useState('');

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 16); 
        return formattedDate;
      };

    useEffect(() => {
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
            user: user,
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
                <StyledInput
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
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