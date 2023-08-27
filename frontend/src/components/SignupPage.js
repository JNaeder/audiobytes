import { Box, Button, Typography, TextField, FormControl } from "@mui/material";
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

  const checkPasswords = () => {
    if (password === "" || passwordCheck === "") {
      return false;
    }
    if (password !== passwordCheck) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!checkPasswords()) {
      return;
    }
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const data = {
      username: username,
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${protocol}//${hostname}:8080/register`,
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
        }}
      >
        <Typography variant="h5">Signup</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "background.dark",
            width: "50%",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <FormControl>
            <TextField
              id="username"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="password"
              label="Verify Password"
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}

export default SignupPage;
