import { Button, Menu } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import NavBarHamburgerButton from "./NavBarHamburgerButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

function NavBarHamburger() {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector((state) => state.user.username);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        startIcon={<MenuIcon />}
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        sx={{
          backgroundColor: "background.darkest",
        }}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#242423",
          },
        }}
      >
        <NavBarHamburgerButton
          handleClose={handleClose}
          text={"Home"}
          icon={<HomeOutlinedIcon />}
          path={"/"}
        />
        {currentUser && (
          <NavBarHamburgerButton
            handleClose={handleClose}
            icon={<CloudUploadOutlinedIcon />}
            text={"Upload"}
            path={"/upload"}
          />
        )}
        <NavBarHamburgerButton
          handleClose={handleClose}
          icon={<RemoveRedEyeOutlinedIcon />}
          text={"Artwork"}
          path={"/visualizer"}
        />
        <NavBarHamburgerButton
          handleClose={handleClose}
          icon={<InfoOutlinedIcon />}
          text={"Info"}
          path={"/about"}
        />
      </Menu>
    </div>
  );
}

export default NavBarHamburger;
