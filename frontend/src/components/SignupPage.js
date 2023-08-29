import { Box, Button, Typography, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "../slices/userSlice";
import axios from "axios";
import SignupUsername from "./SignupPage/SignupUsername";
import SignupEmail from "./SignupPage/SignupEmail";
import SignupPassword from "./SignupPage/SignupPassword";
import SignupPasswordVerify from "./SignupPage/SignupPasswordVerify";
import SignupWithDiscord from "./SignupPage/SignupWithDiscord";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    if (password !== passwordCheck) {
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
              <SignupUsername
                setError={setError}
                setUsername={setUsername}
                username={username}
              />
              <SignupEmail setError={setError} setEmail={setEmail} />
              <SignupPassword
                setError={setError}
                setPassword={setPassword}
                password={password}
                setPasswordStrength={setPasswordStrength}
              />
              <SignupPasswordVerify
                setError={setError}
                password={password}
                passwordCheck={passwordCheck}
                setPasswordCheck={setPasswordCheck}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Signup
              </Button>
              <SignupWithDiscord />
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
