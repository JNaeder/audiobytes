import { Box, Button, Typography, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/userSlice";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/login`,
        data
      );
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data));
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
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
        <Typography variant="h5">Login</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            color: "white",
            backgroundColor: "background.dark",
            width: "30%",
            height: "50%",
            borderRadius: "10px",
            padding: "50px",
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            id="username"
            label="Username"
            fullWidth
            inputProps={{ style: { color: "white" } }}
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
