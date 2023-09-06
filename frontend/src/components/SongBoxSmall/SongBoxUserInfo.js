import { Box, Avatar, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SongBoxUserInfo({ song, showUser }) {
  const navigate = useNavigate();
  const dateUloaded = new Date(song.dateUploaded).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  let imgUrl = null;
  if (song.picURL) {
    imgUrl = song.picURL.String;
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        {showUser ? (
          <ButtonBase
            onClick={() => {
              navigate(`/user/${song.username}`);
            }}
          >
            <Avatar
              src={imgUrl}
              sx={{
                // border: "2px solid #7798AB",
                width: "35px",
                height: "35px",
              }}
            />
            <Typography variant="h6">{song.username}</Typography>
          </ButtonBase>
        ) : (
          ""
        )}
        <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
          {dateUloaded}
        </Typography>
      </Box>
    </>
  );
}

export default SongBoxUserInfo;
