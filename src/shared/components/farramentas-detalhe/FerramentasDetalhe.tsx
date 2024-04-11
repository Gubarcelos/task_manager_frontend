import { Box, Button, Icon, Paper, paperClasses, useTheme } from "@mui/material";


interface IFerramentasDetalheProps {
    showButtonNew?: boolean;
    showButtonUpdate?: boolean;
    showButtonDelete?: boolean;
    showButtonBack?: boolean;

    onClickNew?: () => void;
    onClickUpdate?: () => void;
    onClickDelete?: () => void;
    onClickBack?: () => void;


}

export const FerramentasDetalhe: React.FC<IFerramentasDetalheProps> = ({
    showButtonNew = true,
    showButtonUpdate = true,
    showButtonDelete = true,
    showButtonBack = true,

    onClickNew,
    onClickUpdate,
    onClickDelete,
    onClickBack
}) => {
    const theme = useTheme();
    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            component={Paper}
            height={theme.spacing(5)}
        >
            {showButtonNew && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={onClickNew}
                    endIcon={<Icon>save</Icon>}
                >Salvar
                </Button>
            )}

            {showButtonUpdate && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={onClickUpdate}
                    endIcon={<Icon>update</Icon>}
                >Atualizar
                </Button>
            )}

            {showButtonDelete && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={onClickDelete}
                    endIcon={<Icon>delete</Icon>}
                >Deletar
                </Button>
            )}


            {showButtonBack && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={onClickDelete}
                    endIcon={<Icon>arrow_back</Icon>}
                >Voltar
                </Button>
            )}
        </Box>
    );
}