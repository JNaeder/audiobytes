import { Box, Typography, Grid } from "@mui/material";

function AboutPageInfo() {
  return (
    <>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            color: "white",
            backgroundColor: "background.dark",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <Typography variant="h5">About</Typography>
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
        </Box>
      </Grid>
    </>
  );
}

export default AboutPageInfo;
