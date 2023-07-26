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
import { getGoogleUrlSignIn } from "../../utils/getGoogleUrl";
import { Alert, Paper, Snackbar } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../../services/authentication/authenticationService";
import { QueryClient, QueryClientProvider } from "react-query";
import { getUserInfo } from "../../services/apis/users";
import { setUserInfo } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import {
  removeAccessToken,
  removeUserInfoFromCookie,
  setAccessToken,
  setUserInfoToCookie,
} from "../../utils/cookies";
import Head from "next/head";
interface IUserRegistration {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp: NextPage = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const dispatch = useDispatch();
  const [alertType, setAlertType] = useState(ALERT_TYPE.WARNING);
  const [content, setContent] = useState("");

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (values: any) => {
      onApply({ values });
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Location name is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
  });

  const { mutate: onApply, isLoading: loadingUpdate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await registerUser(values?.values);
        if (response?.status !== 200) {
          setAlertType(ALERT_TYPE.ERROR);
          setOpenSnackBar(true);
          setContent(response?.errorMessage);
          return false;
        } else {
          // set access token
          setAccessToken(response?.data?.data);
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

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Signup | Uraa</title>
      </Head>
      <Container component="main" maxWidth="sm" sx={{}}>
        <Paper>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "black" }} component="h1" variant="h3">
              Sign Up
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
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
                  name="first_name"
                  label="First Name"
                  type="text"
                  error={Boolean(formik.errors.first_name)}
                  helperText={formik.errors.first_name as string}
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  type="text"
                  error={Boolean(formik.errors.last_name)}
                  helperText={formik.errors.last_name as string}
                  value={formik.values.last_name}
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
                  error={Boolean(formik.errors.password)}
                  helperText={formik.errors.password as string}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Password Confirm"
                  type="password"
                  error={Boolean(formik.errors.confirm_password)}
                  helperText={formik.errors.confirm_password as string}
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormControlLabel
                  sx={{ color: "black" }}
                  control={<Checkbox value="remember" />}
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
                  href={getGoogleUrlSignIn("")}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: "#2E3B55" }}
                >
                  Sign Up with Gmail
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
                        router.push("/login");
                      }}
                    >
                      {"Allready have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Paper>
        <SnackBar
          openSnackBar={openSnackBar}
          handleCloseSnackBar={handleCloseSnackBar}
          alertType={alertType}
          contents={content}
        />
      </Container>
    </>
  );
};

SignUp.getLayout = (page: any) => <>{page}</>;

export default SignUp;

export const ALERT_TYPE = {
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
};

interface ISnackBarProps {
  openSnackBar: any;
  handleCloseSnackBar: any;
  alertType: any;
  contents: string;
}

export const SnackBar: FC<ISnackBarProps> = (props) => {
  return (
    <>
      <Snackbar
        open={props.openSnackBar}
        autoHideDuration={6000}
        onClose={props.handleCloseSnackBar}
      >
        <Alert
          onClose={props.handleCloseSnackBar}
          severity={props.alertType}
          sx={{ width: "100%" }}
        >
          {props.contents}
        </Alert>
      </Snackbar>
    </>
  );
};
