import { Box, Typography } from "@mui/material";

function AboutPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">audiobytes.app</Typography>
        <Typography variant="h5">By John Naeder</Typography>
        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            color: "white",
            backgroundColor: "background.dark",
            width: "20%",
            height: "70%",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <br />
          <Typography variant="p">
            This portfolio project is a work in progress.
          </Typography>
          <br />
          <Typography variant="p">
            So many buttons don't work yet, but I'm working on it. Get off my
            case.
          </Typography>
          <br />
          <Typography variant="p">
            Right now you can create an account, either with username and
            password or with Discord OAuth2. You can upload a song, and you can
            listen to songs. You can't do much else.
          </Typography>
          <br />
          <Typography variant="p">
            Please give me feedback as I want to this to be a nice portfolio.
          </Typography>
          <br />
          <Typography variant="p">
            Email me:{" "}
            <a href="mailto:j.naeder324@gmail.dom">J.Naeder324@gmail.com</a>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default AboutPage;
