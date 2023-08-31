import { Button } from "@mui/material";
import DiscordIcon from "../../imgs/icons/discord.png";

function SignupWithDiscord({ buttonTitle }) {
  const discordAuth = () => {
    const url =
      "https://discord.com/api/oauth2/authorize?client_id=1146149669139923074&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify";
    window.location.href = url;
  };
  return (
    <>
      <Button
        variant="contained"
        startIcon={<img src={DiscordIcon} height="30px" alt="Menu Icon" />}
        fullWidth
        sx={{
          backgroundColor: "#7289DA",
        }}
        onClick={discordAuth}
      >
        {buttonTitle}
      </Button>
    </>
  );
}

export default SignupWithDiscord;
