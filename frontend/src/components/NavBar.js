import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
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
          <Button
            variant="contained"
            startIcon={<img src={homeIcon} height="20px" />}
            sx={{
              backgroundColor: "background.darkest",
            }}
          >
            <Typography>Home</Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<img src={musicIcon} height="20px" />}
            sx={{
              backgroundColor: "background.darkest",
            }}
          >
            <Typography>My Music</Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<img src={uploadIcon} height="20px" />}
            sx={{
              backgroundColor: "background.darkest",
            }}
          >
            <Typography>Upload</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "background.darkest",
            }}
          >
            <Typography>About</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
