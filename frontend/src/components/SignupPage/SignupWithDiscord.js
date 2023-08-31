import { Button } from "@mui/material";
import queryString from "query-string";
import DiscordIcon from "../../imgs/icons/discord.png";

function SignupWithDiscord({ buttonTitle }) {
  const discordAuth = () => {
    const params = queryString.stringify({
      client_id: "1146149669139923074",
      redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}/auth`,
      response_type: "code",
      scope: "identify",
    });
    const url = `https://discord.com/api/oauth2/authorize?${params}`;
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
