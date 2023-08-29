import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordStrengthBar from "react-password-strength-bar";

function SignupPassword({
  setError,
  setPassword,
  setPasswordStrength,
  password,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
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
    </>
  );
}

export default SignupPassword;
