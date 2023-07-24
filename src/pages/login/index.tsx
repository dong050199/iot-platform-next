import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NextPage } from "next";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { Alert, Paper, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { userInfo } from "os";
import { useMutation, useQuery } from "react-query";
import {
  getAccessToken,
  removeAccessToken,
  removeUserInfoFromCookie,
  setAccessToken,
  setUserInfoToCookie,
} from "../../utils/cookies";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/authentication/authenticationService";
import { ALERT_TYPE } from "../signup";
import { getUserInfo } from "../../services/apis/users";

interface IUserLogin {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const [alertType, setAlertType] = useState(ALERT_TYPE.WARNING);
  const [content, setContent] = useState("");
  const accessToken = getAccessToken();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (valuse) => {
      onApply(valuse)
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email address"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
  });

  const { message } = router.query;
  useEffect(() => {
    if (accessToken) {
      router.push("/home");
    }
    if (message) {
      setOpenSnackBar(true)
      setContent(message as string)
    }
  }, [message]);

  const { mutate: onApply, isLoading: loadingUpdate } = useMutation(
    async (values: any) => {
      try {
        console.log(values);
        const response: any = await loginUser(values);
        if (response?.status !== 200) {
          setAlertType(ALERT_TYPE.ERROR);
          setOpenSnackBar(true);
          setContent(response?.errorMessage);
          return false;
        } else {
          setAccessToken(response?.data?.data);
          //set access token to cookie
          setAlertType(ALERT_TYPE.SUCCESS);
          setOpenSnackBar(true);
          setContent("Login successfully");
          // open snack bar for notification
          const useInfoResponse: any = await getUserInfo();
          if (useInfoResponse.status !== 200) {
            setAlertType(ALERT_TYPE.ERROR);
            setOpenSnackBar(true);
            setContent("Register failed");
            return false;
          } else {
            setAlertType(ALERT_TYPE.SUCCESS);
            setOpenSnackBar(true);
            setContent("Register successfully");
            // get user info and set to cookies
            setUserInfoToCookie({
              email: useInfoResponse?.data?.data?.email,
              name: useInfoResponse?.data?.data?.full_name,
            });
            router.push("/home");
            return true;
          }
        }
      } catch (error: any) {
        setAlertType(ALERT_TYPE.ERROR);
        setOpenSnackBar(true);
        setContent(error?.errorMessage);
        return false;
      }
    }
  );

  return (
    <Container className="login-container" component="main" maxWidth="sm">
      <Paper>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={Boolean(formik.errors.email)}
                helperText={formik.errors.email as string}
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password as string}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
              >
                Sign In
              </Button>
              <Button
                startIcon={<GoogleIcon />}
                href={getGoogleUrl("")}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
              >
                Login with Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="info"
          sx={{ width: "100%" }}
        >
          {content}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
