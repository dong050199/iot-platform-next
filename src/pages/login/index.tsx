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
import { setUserInfo } from "../../redux/actions/user";
import { userInfo } from "os";
import { useQuery } from "react-query";
import { getAccessToken } from "../../utils/cookies";
import { AxiosResponse } from "axios";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login: NextPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const accessToken = getAccessToken();

  const router = useRouter();

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const { message } = router.query;
  useEffect(() => {
    if (accessToken) {
      router.push("/home");
    }
    if (message === "invalid") {
      setOpenSnackBar(true);
    }
  }, [message]);

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const from = router.pathname || "/";

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // 👇 Executing the loginUser Mutation
  };

  return (
    <Container
      className="login-container"
      component="main"
      maxWidth="sm"
    >
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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
            href={getGoogleUrl(from)}
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
          You must loggin to see all contents!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
