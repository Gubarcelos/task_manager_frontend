import { Avatar, Box, Divider, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";

import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useDrawerContext } from "../../contexts";
import Cookies from "universal-cookie";

const logo = require('../../../assets/logo-cobasi-512.png');

type Props = {
    children?: React.ReactNode
};

interface IListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    children?: React.ReactNode;
}

const LinkItemList: React.FC<IListItemLinkProps> = ({ icon, label, to }) => {
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    };

    return (
        <ListItemButton selected={!match} onClick={handleClick} >
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export const SideNav: React.FC<Props> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen } = useDrawerContext();
    const cookies = new Cookies();

    const navigate = useNavigate();

    const handleLogout = () => {
        cookies.remove('token');
        navigate('/login');
    };

    return (
        <>
            <Drawer
                open={isDrawerOpen}
                variant={smDown ? "temporary" : "permanent"}
                sx={{
                    width: smDown ? 'auto' : theme.spacing(28),
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: smDown ? 'auto' : theme.spacing(28)
                    }
                }}
            >
                <Box width="100%" height={theme.spacing(12)} display="flex" justifyContent="center">
                    <Avatar
                        sx={{height: theme.spacing(12), width: theme.spacing(12) }}
                        src={logo}/>
                </Box>
                <Divider />
                <List component="nav">
                    <LinkItemList
                        icon='checklist'
                        to='/tasks'
                        label='Tasks'
                    />
                </List>
                <Divider />
                <IconButton onClick={handleLogout}>
                    <Icon>logout</Icon>
                </IconButton>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: smDown ? 0 : theme.spacing(28),
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                {children}
            </Box>
        </>
    );
};