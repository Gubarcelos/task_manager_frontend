import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";


interface IBarraDeFerramentasProps {
    textoBusca?: string;
    showIput?: boolean;
    changeSearchText?: (newText: string) => void;
    newButtonText?:string;
    buttonClick?:() =>void

}
export const BarraFerramentas: React.FC<IBarraDeFerramentasProps> = ({
    textoBusca = '', 
    changeSearchText, 
    showIput = false,
    newButtonText = 'Novo',
    buttonClick

}) => {

    const theme = useTheme();
    return (
        <Box gap={1} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" component={Paper} height={theme.spacing(5)}>
            {showIput &&(
                <TextField size="small" placeholder="Pesquisar" value={textoBusca} onChange={(e) => changeSearchText?.(e.target.value)} />
            )}
            <Box flex={1} display="flex" justifyContent="end">
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={buttonClick}
                    endIcon={<Icon>add</Icon>}
                >{newButtonText}
                </Button>
            </Box>
        </Box>
    );
}