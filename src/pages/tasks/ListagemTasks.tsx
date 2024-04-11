import { To, useNavigate } from "react-router-dom";
import { BarraFerramentas } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layout";
import { useEffect, useState } from "react";
import { ITask, TaskService } from "../../shared/services/api/Tasks/TasksServices";
import { Icon, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const ListagemTasks: React.FC = () => {


    const [rows, setRows] = useState<ITask[]>([]);


    useEffect(() => {
        TaskService.getUserTasks('6616c8ed1d4754c9357c4da7')
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message)
                }
                else {
                    // Converter e formatar as datas
                    const formattedRows = result.map(row => ({
                        ...row,
                        startDate: formatarData(row.startDate),
                        finishDate: formatarData(row.finishDate)
                    }));
                    setRows(formattedRows);
                }
            });
    }, []);

    const formatarData = (data: string) => {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObj.getFullYear();
        const hora = dataObj.getHours().toString().padStart(2, '0');
        const minutos = dataObj.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    };

    const handleDelete = (id : string) => {
        console.log("o ida é"+ id)
        // if(confirm('Realmente quer apagar a tarefa ?')) {
            TaskService.deletebyId(id)
            .then((result) => {
                if(result instanceof Error) {
                    alert(result.message);
                }else {
                    setRows(oldRowls => {
                        return [
                            ...oldRowls.filter(oldRow => oldRow._id != id )
                        ];
                    });
                    alert('Resgistro apagado')
                }
            })
        // }
    }
    const navigate = useNavigate();
    const handleNav = (path : string) => {
        console.log("oi")
        navigate(path);
    }
    return (
        <LayoutBasePage
            titulo="Lista de Tarefas"
            barraDeFerramenta={
                (
            <BarraFerramentas
            buttonClick={()=> handleNav('/tasks/new')}
            />)}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Data inicio</TableCell>
                            <TableCell>Data fim</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Deletar</TableCell>
                            <TableCell>Editar</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row._id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{row.finishDate}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={()=> handleDelete(row._id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    </TableCell>
                                    <TableCell>
                                    <IconButton size="small" onClick={()=> handleNav(`/tasks/view/${row._id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBasePage>
    );
}