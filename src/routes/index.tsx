import { Routes, Route, Navigate } from "react-router-dom";
import { DetalheTasks } from "../pages/tasks/DestalheTasks";
import { ListagemTasks } from "../pages";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/tasks" element={<ListagemTasks/>}></Route>
            <Route path="/tasks/view/:id" element={<DetalheTasks/>}></Route>
            <Route path="/tasks/new" element={<DetalheTasks/>}></Route>
            <Route path="*" element={<Navigate to="/login"/>}></Route>
        </Routes>
    );
}