import { Drawer, List, ListItemButton, ListItemText, Icon, ListItemIcon, useMediaQuery, Box, useTheme, Avatar, Divider } from "@mui/material";

import { useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

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
                <Divider>
                <List component="nav">
                    {/* <LinkItemList
                        icon='home'
                        to='/home'
                        label='Home'
                    /> */}
                    <LinkItemList
                        icon='checklist'
                        to='/tasks'
                        label='Tasks'
                    />
                    {/* <LinkItemList
                        icon='star'
                        to='/user'
                        label='Tasks'
                    /> */}
                </List>
                </Divider>
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