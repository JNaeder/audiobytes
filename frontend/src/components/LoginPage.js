import { Box, Button, Typography, TextField, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <FormControl>
          <TextField id="username" label="Username" />
          <TextField id="email" label="Email" type="email" />
          <TextField id="password" label="Password" type="password" />
          <Button variant="contained" color="primary">
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

export default LoginPage;
