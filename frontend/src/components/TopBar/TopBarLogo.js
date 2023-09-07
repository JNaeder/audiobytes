import { Box, Typography } from "@mui/material";
import logo from "../../imgs/Logo-1.svg";

function TopBarLogo({ isXs }) {
  return (
    <>
      <Box
        //  Logo and Title Section
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Box
          //   Logo Section
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="audiobytes logo" height="30px" />
          {!isXs && (
            <Typography
              variant="h5"
              sx={{
                background: "linear-gradient(to right, #7798AB , #EF767A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              audiobytes
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default TopBarLogo;
