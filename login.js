import "../App.css";
import React, { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import { useAuth } from "../auth/auth";

function Login() {

  const { onLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    onLogin();
  };

  return (
    <Fragment>
      <Box className="login-box">
        <Paper elevation={3}>
          <Typography variant="h3" component="div" gutterBottom>
            Login
          </Typography>
          <div className="login-form">
            <TextField
              id="username"
              label="Username"
              value={username}
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="login-buttons">
            <Button
              variant="contained"
              type="submit"
              id="login-btn"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              disabled={username === "" || password === ""}
            >
              Login
            </Button>
          </div>
        </Paper>
      </Box>
    </Fragment>
  );
}

export default Login;
