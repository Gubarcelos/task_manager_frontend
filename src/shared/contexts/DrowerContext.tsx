import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    closeDrawer: () => void;
}
const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

type Props = {
    children?: React.ReactNode
};
export const AppDrawerProvider: React.FC<Props> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const closeDrawer = useCallback(() => {
        console.log(isDrawerOpen);
        console.log('oi')
        setIsDrawerOpen(false);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {

            const drawer = document.getElementById("app-drawer");
            if (drawer) {
                console.log('tentando fechar')
                closeDrawer();
            }
        };

        if (isDrawerOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isDrawerOpen, closeDrawer]);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, closeDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
}
