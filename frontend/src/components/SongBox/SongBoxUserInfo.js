import { Box, Avatar, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../util/timeFunctions";

function SongBoxUserInfo({ song, showUser, isSm }) {
  const navigate = useNavigate();
  const dateUloaded = formatDate(song.dateUploaded);

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
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: "10px",
          whiteSpace: "nowrap",
        }}
      >
        {showUser && (
          <ButtonBase
            onClick={() => {
              navigate(`/user/${song.username}`);
            }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              // backgroundColor: "red",
            }}
          >
            {!isSm && (
              <Avatar
                src={imgUrl}
                sx={{
                  width: "35px",
                  height: "35px",
                  marginRight: "10px",
                }}
              />
            )}
            <Typography variant="h6">{song.username}</Typography>
          </ButtonBase>
        )}
        {!isSm && (
          <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
            {dateUloaded}
          </Typography>
        )}
      </Box>
    </>
  );
}

export default SongBoxUserInfo;
