import { To, useNavigate } from "react-router-dom";
import { BarraFerramentas } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layout";
import { useEffect, useState } from "react";
import { ITask, TaskService } from "../../shared/services/api/Tasks/TasksServices";
import { Box, Icon, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Cookies from "universal-cookie";

export const ListagemTasks: React.FC = () => {

    const [rows, setRows] = useState<ITask[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(150); 
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [totalCount, setTotalCount] = useState<number>(0);
    const [userId, setUserId] = useState<string>('');
    const navigate = useNavigate();
    const cookies = new Cookies();


    useEffect(() => {
        const token = cookies.get('token');
        if(!token){
            redirectToLogin();
            return;
        }
        const decodedToken = decodeToken(token);
        console.log(decodedToken || isTokenExpired(decodedToken));
        if (!decodedToken) {
          redirectToLogin();
          return;
        }
        const { userId } = decodedToken;
        setUserId(userId);
        fetchTasks(userId, page, pageSize);
    }, [page, pageSize]);

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
                const totalPages = Math.ceil(totalCount / pageSize);
                setTotalPages(totalPages);
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

      const isTokenExpired = (decodedToken: { exp: number }) => {
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
      };

    const redirectToLogin = () => {
        navigate('/login');
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

    const handleDelete = (id : string) => {
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
    }
    const handleNav = (path : string) => {
        console.log("oi")
        navigate(path);
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }
    return (
        <LayoutBasePage
            titulo="Lista de Tarefas"
            barraDeFerramenta={
                (
            <BarraFerramentas
            buttonClick={()=> handleNav(`/tasks/new?userId=${userId}`)}
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
                                    <IconButton size="small" onClick={()=> handleNav(`/tasks/view/${row._id}?userId=${row.user}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" marginTop={2}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <IconButton key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </IconButton>
                ))}
            </Box>
        </LayoutBasePage>
    );
}
