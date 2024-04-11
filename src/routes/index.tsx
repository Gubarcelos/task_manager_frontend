import { Button, colors } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemTasks } from "../pages";
import { DetalheTasks } from "../pages/tasks/DestalheTasks";

export const AppRoutes = () => {

    const {toggleDrawerOpen} = useDrawerContext();
    return (
        <Routes>
            <Route path="/home" element={<Dashboard/>}></Route>
            <Route path="/tasks" element={<ListagemTasks/>}></Route>
            <Route path="/tasks/view/:id" element={<DetalheTasks/>}></Route>
            <Route path="/tasks/new" element={<DetalheTasks/>}></Route>

            <Route path="*" element={<Navigate to="/tasks/view"/>}></Route>
        </Routes>
    );
}