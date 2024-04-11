import { Button, colors } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemTasks } from "../pages";

export const AppRoutes = () => {

    const {toggleDrawerOpen} = useDrawerContext();
    return (
        <Routes>
            <Route path="/home" element={<Dashboard/>}></Route>
            <Route path="/tasks" element={<ListagemTasks/>}></Route>
            <Route path="*" element={<Navigate to="/home"/>}></Route>
        </Routes>
    );
}