import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setCurrentUser } from "../slices/userSlice";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [usernameAvailable, setUsernameAvailable] = useState(false);
  let timeout;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    if (username === "") {
      setError("Username cannot be empty");
      return;
    }
    if (email === "") {
      setError("Email cannot be empty");
      return;
    }
    if (password === "") {
      setError("Password cannot be empty");
      return;
    }
    if (!checkPasswords()) {
      setError("Passwords do not match");
      return;
    }
    if (passwordStrength < 2) {
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
      setSuccess("User Creation Successful");
      setTimeout(() => {
        dispatch(setCurrentUser(response.data));
        navigate("/");
      }, 2000);
    }
  };

  const checkUsernameAvailability = async (newUsername) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/check-username?username=${newUsername}`
    );
    setUsernameAvailable(response.data.result);
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    clearTimeout(timeout);
  };

  useEffect(() => {
    if (username) {
      timeout = setTimeout(async () => {
        await checkUsernameAvailability(username);
      }, 2000);
    }
  }, [username]);

  return (
    <>
      {success ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alert severity="success" variant="filled">
              {success}
            </Alert>
            <Typography variant="p" color="white">
              Redirecting...
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              height: "100%",
            }}
          >
            <Typography variant="h5">Signup</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                color: "white",
                backgroundColor: "background.dark",
                width: "100%",
                height: "70%",
                borderRadius: "10px",
                padding: "50px",
              }}
            >
              {error ? (
                <Alert severity="error" variant="filled">
                  {error}
                </Alert>
              ) : (
                <div></div>
              )}
              <TextField
                id="username"
                label="Username"
                inputProps={{ style: { color: "white" } }}
                fullWidth
                onChange={(e) => {
                  setError(null);
                  onUsernameChange(e);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {usernameAvailable ? (
                        <CheckCircleOutlineOutlinedIcon
                          color="success"
                          fontSize="large"
                        />
                      ) : (
                        <CancelOutlinedIcon color="error" fontSize="large" />
                      )}
                    </InputAdornment>
                  ),
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
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                inputProps={{ style: { color: "white" } }}
                fullWidth
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityOff style={{ color: "white" }} />
                        ) : (
                          <Visibility style={{ color: "white" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
              />
              <PasswordStrengthBar
                password={password}
                style={{
                  width: "100%",
                  alignContent: "center",
                }}
                onChangeScore={(score) => {
                  setPasswordStrength(score);
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
      )}
    </>
  );
}

export default SignupPage;
