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
import AuthMiddleware from "../../middleware/authenticator";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import { IUser } from "../../interfaces/userProfile";
import { selectUser } from "../../redux/selectors/user";
import { getAccessToken } from "../../utils/cookies";
import { getUserInfo } from "../../services/authentication/authenticationService";
import { setUserInfo } from "../../redux/actions/user";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

const BaseProvider = (props: any) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme({})}>
        <StyledEngineProvider>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <AuthMiddleware>
              <MiddlewareProfile>
                {getLayout(<Component {...pageProps} />)}
              </MiddlewareProfile>
            </AuthMiddleware>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default BaseProvider;

const MiddlewareProfile = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isFetching } = useQuery(
    ["get-user-cache"],
    () => getUserInfo(),
    {
      onSuccess: async ({ data }) => {
        if (data?.data) {
          dispatch(
            setUserInfo({
              email: data?.data?.email,
              numberEmail: data?.data.number_email,
              notification: data?.data.notification,
              name: data?.data?.full_name,
            })
          );
          return
        }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return <>{children}</>;
};
