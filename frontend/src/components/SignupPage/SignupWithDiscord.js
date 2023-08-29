import { Button } from "@mui/material";

//discord.com/api/oauth2/authorize?client_id=1146149669139923074&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=bot%20identify

function SignupWithDiscord() {
  const discordAuth = () => {
    const url =
      "https://discord.com/api/oauth2/authorize?client_id=1146149669139923074&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify";
    window.location.href = url;
  };
  return (
    <>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#7289DA",
        }}
        onClick={discordAuth}
      >
        Signup with Discord
      </Button>
    </>
  );
}

export default SignupWithDiscord;
