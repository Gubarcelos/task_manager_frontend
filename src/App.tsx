import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes";

import { lightTheme } from "./shared/themes";
import { SideNav } from "./shared/components";
import { AppDrawerProvider } from "./shared/contexts";
import { ThemeProvider } from "@mui/material";
import { SignIn, SignUp } from "./pages";
export const App = () => {
  
  return (
    <AppDrawerProvider>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/logon" element={<SignUp/>} />
            <Route path="/*" element={<SideNav><AppRoutes /></SideNav>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppDrawerProvider>

  );
}

