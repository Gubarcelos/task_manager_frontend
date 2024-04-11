import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./shared/themes";
import { SideNav } from "./shared/components";
import { AppDrawerProvider } from "./shared/contexts";
export const App = () => {
  return (
    <AppDrawerProvider>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <>
            <SideNav>
              <AppRoutes />
            </SideNav>
          </>
        </BrowserRouter>
      </ThemeProvider>
    </AppDrawerProvider>

  );
}

