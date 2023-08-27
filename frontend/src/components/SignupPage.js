import { Box, Button, Typography, TextField, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "../slices/userSlice";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState(null);

  const checkPasswords = () => {
    if (password === "" || passwordCheck === "") {
      return false;
    }
    if (password !== passwordCheck) {
      return false;
    }
    return true;
  };

  const checkPasswordStrength = () => {
    if (password === "") {
      return false;
    }
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!checkPasswords()) {
      setError("Passwords do not match");
      return;
    }
    if (!checkPasswordStrength()) {
      setError("Password is not strong enough");
      return;
    }
    const data = {
      username: username,
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/register`,
      data
    );
    if (response.status === 201) {
      dispatch(setCurrentUser(response.data));
      navigate("/");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100%",
        }}
      >
        <Typography variant="h5">Signup</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            color: "white",
            backgroundColor: "background.dark",
            width: "30%",
            height: "70%",
            borderRadius: "10px",
            padding: "50px",
          }}
        >
          {error ? <Alert severity="error">{error}</Alert> : <div></div>}
          <TextField
            id="username"
            label="Username"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
            }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setError(null);
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setError(null);
              setPassword(e.target.value);
            }}
          />
          <TextField
            id="password"
            label="Verify Password"
            type="password"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setError(null);
              setPasswordCheck(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Signup
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SignupPage;
