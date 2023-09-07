import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import NavBarButtonMenu from "./NavBarButtonMenu";
import NavBarHamburger from "./NavBarHamburger";

function NavBar() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "50px",
          backgroundColor: "background.dark",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {isMd ? <NavBarHamburger /> : <NavBarButtonMenu />}
      </Box>
    </>
  );
}

export default NavBar;
