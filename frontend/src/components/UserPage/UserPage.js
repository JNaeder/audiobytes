import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserPageInfo from "./UserPageInfo";
import UserPageSongs from "./UserPageSongs";

function UserPage() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const url = `${process.env.REACT_APP_API_ENDPOINT}/userinfo/${username}`;
      const response = await axios.get(url);
      setUserInfo(response.data);
    };
    getData();
  }, [username]);

  return (
    <>
      {userInfo ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              height: "100%",
              marginTop: "20px",
              //   backgroundColor: "red",
            }}
          >
            <UserPageInfo userInfo={userInfo} />
            <UserPageSongs userInfo={userInfo} />
          </Box>
        </>
      ) : (
        <Typography>Loading</Typography>
      )}
    </>
  );
}

export default UserPage;
