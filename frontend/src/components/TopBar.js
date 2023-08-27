import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { logout } from "../slices/userSlice";

import logo from "../imgs/Logo-1.svg";

function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, profilePic } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
            {username ? (
              <>
                <Typography variant="h6">{username}</Typography>
                <Avatar
                  alt="profilePic"
                  src={profilePic}
                  sx={{
                    height: "38px",
                    width: "38px",
                    border: "2px solid #7798AB",
                  }}
                />
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div></div>
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TopBar;
