import Box from "@mui/material/Box";
import NavBarButton from "./NavBarButton";
import homeIcon from "../imgs/icons/home.png";
import musicIcon from "../imgs/icons/wave-sound.png";
import uploadIcon from "../imgs/icons/cloud-computing.png";

function NavBar() {
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
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <NavBarButton icon={homeIcon} text={"Home"} path={"/"} />
          <NavBarButton icon={musicIcon} text={"My Music"} path={"/mymusic"} />
          <NavBarButton icon={uploadIcon} text={"Upload"} path={"/upload"} />
          <NavBarButton icon={null} text={"About"} path={"/about"} />
          <NavBarButton icon={null} text={"Visualizer"} path={"/visualizer"} />
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
