import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import NavBarButton from "./NavBarButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

function NavBar() {
  const currentUser = useSelector((state) => state.user.username);
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
          <NavBarButton icon={<HomeOutlinedIcon />} text={"Home"} path={"/"} />
          {/* <NavBarButton icon={musicIcon} text={"My Music"} path={"/mymusic"} /> */}
          {currentUser && (
            <NavBarButton
              icon={<CloudUploadOutlinedIcon />}
              text={"Upload"}
              path={"/upload"}
            />
          )}
          <NavBarButton
            icon={<RemoveRedEyeOutlinedIcon />}
            text={"Artwork"}
            path={"/visualizer"}
          />
          <NavBarButton
            icon={<InfoOutlinedIcon />}
            text={"Info"}
            path={"/about"}
          />
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
