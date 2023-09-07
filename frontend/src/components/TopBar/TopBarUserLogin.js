import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Avatar, Button, ButtonBase } from "@mui/material";
import { logout } from "../../slices/userSlice";

function TopBarUserLogin({ isSm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, profilePic } = useSelector((state) => state.user);

  let img_url = null;
  if (profilePic) {
    img_url = profilePic.String;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {username ? (
        <>
          <ButtonBase onClick={() => navigate(`/user/${username}`)}>
            {!isSm && <Typography variant="h6">{username}</Typography>}
            <Avatar
              alt="profilePic"
              src={img_url}
              sx={{
                height: "38px",
                width: "38px",
                border: "2px solid #7798AB",
              }}
            />
          </ButtonBase>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </>
      )}
    </>
  );
}

export default TopBarUserLogin;
