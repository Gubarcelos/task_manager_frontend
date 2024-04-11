
import { AppBar, Box, Icon, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";
import { ReactNode } from "react";



interface ILayoutBase {
    titulo: string;
    barraDeFerramenta: ReactNode
    children?: React.ReactNode
}
export const LayoutBasePage: React.FC<ILayoutBase> = ({ children, titulo, barraDeFerramenta }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    

    const { toggleDrawerOpen } = useDrawerContext();
    return (
        <Box height="100%" display="flex" flexDirection={"column"} gap={1}>
            <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} >
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                <Typography  overflow="hidden" textOverflow="ellipsis" whiteSpace={"nowrap"} variant={smDown? "h5" : mdDown ? "h4" : "h3"}>
                    {titulo}
                </Typography>

            </Box>
            {barraDeFerramenta && (
                <Box>
                    {barraDeFerramenta}
                </Box>
            )}

            <Box>
                {children}
            </Box>
        </Box>
    );
}