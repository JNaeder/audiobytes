import { Box, Typography, Grid } from "@mui/material";

function AboutPageChangelog() {
  return (
    <>
      <Grid item xs={12}>
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
          <Typography variant="h5">Changelog</Typography>
        </Box>
      </Grid>
    </>
  );
}

export default AboutPageChangelog;
