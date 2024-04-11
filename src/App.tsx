import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes";

import { lightTheme } from "./shared/themes";
import { SideNav } from "./shared/components";
import { AppDrawerProvider } from "./shared/contexts";
import { ThemeProvider } from "@mui/material";
import { SignIn } from "./pages";
export const App = () => {
  return (
    <AppDrawerProvider>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
        <Routes>
            {/* Defina a rota da página de login diretamente aqui */}
            <Route path="/login" element={<SignIn />} />

            {/* Rota padrão com a SideNav e outras páginas */}
            <Route path="/*" element={<SideNav><AppRoutes /></SideNav>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppDrawerProvider>

  );
}

