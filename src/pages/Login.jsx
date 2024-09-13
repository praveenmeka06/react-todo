import { useState } from "react";
import { Button, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../util/validation";
import { useFormik } from "formik";
import { userList } from "../data/dummyData";
import Snackbar from "@mui/material/Snackbar";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/useAuth";

function Login() {
  const classes = useStyles();
  const { setCurrentUser } = useAuth();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "",
    severity: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      //dummy authorization code, need to replace with api call and authorize the credentials
      for (const user of userList) {
        if (user.email === values.email && user.password === values.password) {
          setAlertOptions({
            ...alertOptions,
            message: "Loggedin successfully!",
            severity: "success",
          });
          setOpen(true);
          //dummy authorization token, need to replace with jwt token
          localStorage.setItem("auth", "loggedIn");
          setCurrentUser("loggedIn");
          navigate("/");
          return;
        }
      }
      setAlertOptions({
        ...alertOptions,
        message: "Try again with valid credentials",
        severity: "error",
      });
      setOpen(true);
      localStorage.removeItem("auth");
      setCurrentUser(null);
    },
  });

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div>
          <h2 className={classes.text}>Log In</h2>
        </div>
        <div className={classes.inputDiv}>
          <div>Email</div>
          <CustomInput
            placeholder="Enter email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className={classes.inputDiv}>
          <div>Password</div>
          <CustomInput
            name="password"
            type="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          onClick={formik.handleSubmit}
        >
          Login
        </Button>
        <div className={classes.text}>
          No account? <Link to="/signup">Signup</Link>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={alertOptions.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertOptions.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles({
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  container: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
  },
  inputDiv: {
    margin: "20px 0px",
  },
  button: {
    width: "300px",
  },
  text: {
    margin: "10px 0px",
    textAlign: "center",
  },
});

export default Login;
