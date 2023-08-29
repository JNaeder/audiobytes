import { TextField } from "@mui/material";

function SignupEmail({ setError, setEmail }) {
  return (
    <>
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
    </>
  );
}

export default SignupEmail;
