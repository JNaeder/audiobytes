import { Box, Typography, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import moment from "moment";

function UserPageInfo({ userInfo }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [memberSince, setMemberSince] = useState(null);
  const [lastLogin, setLastLogin] = useState(null);

  const formatDate = (date) => {
    const dateObj = moment(date);
    return dateObj.format("MM/DD/YY");
  };

  useEffect(() => {
    if (userInfo.picURL) {
      setImgUrl(userInfo.picURL.String);
    }
    setMemberSince(formatDate(userInfo.memberSince));
    setLastLogin(formatDate(userInfo.lastLogin));
  }, [userInfo]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Avatar
            src={imgUrl}
            sx={{
              width: "100px",
              height: "100px",
              marginRight: "20px",
            }}
          />
          <Typography variant="h3">{userInfo.username}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              opacity: 0.5,
              marginRight: "20px",
            }}
          >
            Member Since: {memberSince}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.5,
            }}
          >
            Last Login: {lastLogin}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default UserPageInfo;
