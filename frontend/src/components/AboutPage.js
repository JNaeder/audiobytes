import { Box, Grid, Typography } from "@mui/material";
import AboutPageInfo from "./AboutPage/AboutPageInfo";
import AboutPageLinks from "./AboutPage/AboutPageLinks";
import AboutPageChangelog from "./AboutPage/AboutPageChangelog";
import AboutPageContact from "./AboutPage/AboutPageContact";

function AboutPage() {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "90%",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h4">audiobytes.app</Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: "0.5",
                  marginLeft: "10px",
                }}
              >
                By John Naeder
              </Typography>
            </Box>
          </Grid>
          <AboutPageInfo />
          <AboutPageLinks />
          <AboutPageContact />
          <AboutPageChangelog />
        </Grid>
      </Box>
    </>
  );
}

export default AboutPage;
