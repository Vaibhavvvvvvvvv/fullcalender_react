import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };
  
  const getButtonStyle = (path) => ({
    backgroundColor: location.pathname === path ? "transparent" : "inherit",
    color: location.pathname === path ? "black" : "inherit",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Patient Appointment System
        </Typography>
        <Box>
          {currentUser ? (
            // Show these buttons when the user is authenticated
            <>
              <Button sx={getButtonStyle("/")} component={Link} to="/">
                Home
              </Button>
              <Button sx={getButtonStyle("/doctors")} component={Link} to="/doctors">
                Doctors
              </Button>
              <Button sx={getButtonStyle("/appointments")} component={Link} to="/appointments">
                Appointments
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            // Show these buttons when the user is not authenticated
            <>
                <Button sx={getButtonStyle("/login")} component={Link} to="/login">
                Login
              </Button>
              <Button sx={getButtonStyle("/signup")} component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;