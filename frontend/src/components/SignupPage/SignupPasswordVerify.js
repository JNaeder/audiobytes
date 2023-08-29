import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function SignupPasswordVerify({
  setError,
  password,
  setPasswordCheck,
  passwordCheck,
}) {
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const onPasswordVerifyChange = (e) => {
    setPasswordCheck(e.target.value);
    if (e.target.value === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  return (
    <>
      <TextField
        id="password"
        label="Verify Password"
        type="password"
        inputProps={{ style: { color: "white" } }}
        fullWidth
        onChange={(e) => {
          setError(null);
          onPasswordVerifyChange(e);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {passwordCheck.length > 0 ? (
                passwordsMatch ? (
                  <CheckCircleOutlineOutlinedIcon
                    color="success"
                    fontSize="large"
                  />
                ) : (
                  <CancelOutlinedIcon color="error" fontSize="large" />
                )
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default SignupPasswordVerify;
