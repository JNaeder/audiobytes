import { Box, Typography, Grid, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function AboutPageLinks() {
  return (
    <>
      <Grid item xs={3}>
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
            height: "92%",
          }}
        >
          <Typography variant="h5">Links</Typography>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => {
              window.open("https://github.com/JNaeder/audiobytes", "_blank");
            }}
          >
            Github Repository
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default AboutPageLinks;
