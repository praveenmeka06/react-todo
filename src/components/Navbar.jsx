import { makeStyles } from "@mui/styles";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/img/vite.svg";
import { Button } from "@mui/material";

function Navbar() {
  const classes = useStyles();
  const { setCurrentUser } = useAuth();
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoDiv}>
          <img src={logo} />
        </div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.selectedLink : "")}
        >
          <div className={classes.linkDiv}>Home</div>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? classes.selectedLink : "")}
        >
          <div className={classes.linkDiv}>Login</div>
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? classes.selectedLink : "")}
        >
          <div className={classes.linkDiv}>SignUp</div>
        </NavLink>
        <Button className={classes.linkDiv} variant="outlined" onClick={logout}>
          Logout
        </Button>
      </div>
      <Outlet />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.41)",
    background: "#e6effa",
    padding: "10px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 10px",
    },
  },
  logoDiv: {
    flex: "1 1 0",
  },
  linkDiv: {
    margin: "0px 40px !important",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 10px !important",
    },
  },
  selectedLink: {
    fontWeight: "bold",
    color: "green",
  },
}));

export default Navbar;
