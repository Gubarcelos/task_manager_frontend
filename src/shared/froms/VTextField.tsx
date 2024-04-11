import { TextField } from "@mui/material";
import { useField } from "@unform/core";
import React, { useEffect } from "react";


type TVtextFieldProps = {
    name : string;
}
export const VTextField : React.FC<TVtextFieldProps> = ({name, ...rest}) => {
    const {registerField,fieldName,defaultValue,error,clearError} = useField(name);

    return (
        <TextField
        {...rest}
        />
    );
}