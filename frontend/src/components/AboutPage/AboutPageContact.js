import { Box, Typography, Grid, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function AboutPageContact() {
  const clipboardEmail = new ClipboardItem({
    "text/plain": new Blob(["j.naeder324@gmail.com"], { type: "text/plain" }),
  });
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
          <Typography variant="h5">Contact</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="p">j.naeder324@gmail.com</Typography>
            <IconButton
              onClick={() => {
                navigator.clipboard.write([clipboardEmail]);
              }}
            >
              <ContentCopyIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default AboutPageContact;
