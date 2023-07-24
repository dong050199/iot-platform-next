import * as React from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import "../styles/global.css";
import { StyledEngineProvider } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQuery,
} from "react-query";
import AuthMiddleware from "../middleware/authenticator";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { IUser } from "../interfaces/userProfile";
import { selectUser } from "../redux/selectors/user";
import { getAccessToken, getUserInfoFromCookie } from "../utils/cookies";
import { getUserInfo } from "../services/apis/users";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

const MyApp = (props: any) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme({})}>
        <StyledEngineProvider>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <AuthMiddleware>
              {getLayout(<Component {...pageProps} />)}
            </AuthMiddleware>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
