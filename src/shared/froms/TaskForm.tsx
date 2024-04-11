import React, { useState } from "react";
import { TextField, Box, Button, Icon } from "@mui/material";

interface TaskFormData {
    type: string;
    name: string;
    startDate: string;
    finishDate: string;
    status: string;
}

interface TaskFormProps {
    initialValues?: Partial<TaskFormData>; // Alteração aqui
    onSubmit: (data: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues = {}, onSubmit }) => {
    const [formData, setFormData] = useState<TaskFormData>({
        type: initialValues.type || "", // Definindo valores padrão para cada campo
        name: initialValues.name || "",
        startDate: initialValues.startDate || "",
        finishDate: initialValues.finishDate || "",
        status: initialValues.status || "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField
                name="type"
                label="Tipo da Tarefa"
                variant="outlined"
                fullWidth
                value={formData.type}
                onChange={handleChange}
            />
            <TextField
                name="name"
                label="Nome da Tarefa"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                name="startDate"
                label="Data de Início"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={formData.startDate}
                onChange={handleChange}
            />
            <TextField
                name="finishDate"
                label="Data de Término"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={formData.finishDate}
                onChange={handleChange}
            />
            <TextField
                name="status"
                label="Status"
                variant="outlined"
                fullWidth
                value={formData.status}
                onChange={handleChange}
            />
        </Box>
    );
};

export default TaskForm;