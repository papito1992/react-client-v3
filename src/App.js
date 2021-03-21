import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import {AuthContext} from './context/auth-context';
import {useAuth} from "./hooks/auth-hook";

const LoggedInComponent = lazy(() => import("./components/authorized/Main"));
const LoggedOutComponent = lazy(() => import("./components/unauthorized/Main"));

function App() {
  const {token, login, logout, userId} = useAuth();
  return (
      <BrowserRouter>
      <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
          }}
      >
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/admin">
                <LoggedInComponent />
              </Route>
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </AuthContext.Provider>
      </BrowserRouter>
  );
}

export default App;
