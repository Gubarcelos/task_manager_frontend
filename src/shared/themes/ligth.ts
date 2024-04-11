import { createTheme } from "@mui/material";
import { cyan, green } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette : {
        primary : {
            main: cyan[300] ,
            dark: cyan[800] ,
            light: cyan[100],
            contrastText: '#ffffff' ,
        },

        secondary :{
            main: green[300] ,
            dark: green[800] ,
            light: green[100],
            contrastText: '#ffffff' ,
        },
        background : {
            default: 'F7F6F3',
            paper: '#ffffff'
        }
    }
});