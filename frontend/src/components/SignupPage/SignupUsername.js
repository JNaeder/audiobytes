import { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";

function SignupUsername({ setError, setUsername, username }) {
  const [usernameLower, setUsernameLower] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [checkedUsername, setCheckedUsername] = useState(false);

  let timeout = useRef(null);

  const onUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase());
    setUsernameLower(e.target.value.toLowerCase());
    setCheckedUsername(false);
    clearTimeout(timeout.current);
  };

  const checkUsernameAvailability = async (newUsername) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/check-username?username=${newUsername}`
    );
    setCheckedUsername(true);
    setUsernameAvailable(response.data.result);
  };

  useEffect(() => {
    if (username) {
      timeout.current = setTimeout(async () => {
        await checkUsernameAvailability(username);
      }, 2000);
    }
  }, [username]);
  return (
    <>
      <TextField
        id="username"
        label="Username"
        value={usernameLower}
        inputProps={{ style: { color: "white" } }}
        fullWidth
        onChange={(e) => {
          setError(null);
          onUsernameChange(e);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {checkedUsername ? (
                usernameAvailable ? (
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

export default SignupUsername;
