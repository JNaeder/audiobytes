import { Box } from "@mui/material";
import TopBarLogo from "./TopBarLogo";
import TopBarUserLogin from "./TopBarUserLogin";
import { useMediaQuery, useTheme } from "@mui/material";

function TopBar() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          top: 0,
          left: 0,
          backgroundColor: "background.darkest",
          // backgroundColor: "red",
        }}
      >
        <TopBarLogo isXs={isXs} />
        <TopBarUserLogin isSm={isSm} />
      </Box>
    </>
  );
}

export default TopBar;
