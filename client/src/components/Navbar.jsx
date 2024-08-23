import { Box, Link, Typography, useTheme } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      toast.success("Logged out successfully");
      localStorage.removeItem("authToken");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color={"primary"} fontWeight={"bold"} p={3}>
        Chatgpt Clone
      </Typography>
      {loggedIn ? (
        <NavLink to="/login" onClick={handleLogout} p={1}>
          Logout
        </NavLink>
      ) : (
        <>
          <Link href="/register" p={1}>
            Sign Up
          </Link>
          <Link href="/login" p={1}>
            Sign In
          </Link>
        </>
      )}
    </Box>
  );
};

export default Navbar;
