import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import logo from "../imgs/Logo-1.svg";
import profilePic from "../imgs/profilePic.jpg";

function TopBar() {
  return (
    <>
      <Box
        width="100vw"
        height="50px"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          top: 0,
          left: 0,
          backgroundColor: "background.darkest",
        }}
      >
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
            <img src={logo} alt="logo" height="30px" />
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(to right, #7798AB , #EF767A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              audiobytes
            </Typography>
          </Box>
          <Box
            // User Section
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "20%",
              minWidth: "250px",
            }}
          >
            <Typography variant="h6">drmonkfish</Typography>
            <Avatar
              alt="profilePic"
              src={profilePic}
              sx={{
                height: "38px",
                width: "38px",
                border: "2px solid #7798AB",
              }}
            />
            <Button variant="contained">Logout</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TopBar;
