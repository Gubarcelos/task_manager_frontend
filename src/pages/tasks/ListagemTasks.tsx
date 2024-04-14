import { To, useNavigate } from "react-router-dom";
import { BarraFerramentas } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layout";
import { useEffect, useState } from "react";
import { ITask, TaskService } from "../../shared/services/api/Tasks/TasksServices";
import { Box, Icon, IconButton, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useLoginHook } from "../../shared/hooks";


export const ListagemTasks: React.FC = () => {
    const userId = useLoginHook();
    const [rows, setRows] = useState<ITask[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [totalCount, setTotalCount] = useState<number>(0);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (userId) {
            fetchTasks(userId, page, pageSize);
        }
    }, [userId, page, pageSize]);

    const fetchTasks = (userId: string, currentPage: number, size: number) => {
        TaskService.getUserTasks(userId, currentPage, size)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    const formattedRows = result.tasks.map(row => ({
                        ...row,
                        startDate: formatarData(row.startDate),
                        finishDate: formatarData(row.finishDate)
                    }));
                    setRows(formattedRows);
                    setTotalCount(result.totalCount);
                    const totalPages = Math.ceil(result.totalCount / pageSize);
                    console.log(totalPages)
                    console.log(result.totalCount)
                    setTotalPages(totalPages);
                }
            });
    };


    const formatarData = (data: string) => {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObj.getFullYear();
        const hora = dataObj.getHours().toString().padStart(2, '0');
        const minutos = dataObj.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    };

    const handleCompleteTask = (taskId: string) => {
        TaskService.update(taskId, { status: 'completed' }).then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskId]);
                fetchTasks(userId, page, pageSize);
            }
        });
    };

    const handleDelete = (id: string) => {
        TaskService.deletebyId(id)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setRows(oldRowls => {
                        return [
                            ...oldRowls.filter(oldRow => oldRow._id != id)
                        ];
                    });
                    alert('Resgistro apagado')
                }
            })
    }
    const handleNav = (path: string) => {
        navigate(path);
    }
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }
    return (
        <LayoutBasePage
            titulo="Lista de Tarefas"
            barraDeFerramenta={
                (
                    <BarraFerramentas
                        buttonClick={() => handleNav(`/tasks/new`)}
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
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        {row.status === 'completed' ? (
                                            <>
                                                <Icon style={{ color: 'green' }}>check_circle</Icon>
                                                <span style={{ marginLeft: '8px' }}>{row.status}</span>
                                            </>
                                        ) : row.status === 'expired' ? (
                                            <>
                                                <IconButton size="small" onClick={() => handleCompleteTask(row._id)}>
                                                    <Icon style={{ color: 'red' }}>cancel</Icon>
                                                    <span style={{ marginLeft: '8px' }}>{row.status}</span>
                                                </IconButton>
                                            </>
                                        ) : (
                                            <IconButton size="small" disabled={completedTasks.includes(row._id)} onClick={() => handleCompleteTask(row._id)}>
                                                <Icon>check_circle_outline</Icon>
                                                <span style={{ marginLeft: '8px' }}>{row.status}</span>
                                            </IconButton>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row._id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleNav(`/tasks/view/${row._id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} justifyContent="center" alignItems="center" marginTop={2}>
                <Pagination
                    count={totalPages}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary" />
            </Stack>
        </LayoutBasePage>
    );
}


