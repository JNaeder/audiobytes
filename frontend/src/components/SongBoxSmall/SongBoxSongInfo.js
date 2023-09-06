import { Box, Typography } from "@mui/material";
import heartIcon from "../../imgs/icons/heart.png";
import commentIcon from "../../imgs/icons/chat.png";
import playIcon from "../../imgs/icons/arrow.png";

function SongBoxSongInfo({ song }) {
  const likes = song.likes;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.2rem",
          }}
        >
          {song.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={heartIcon} height="15px" alt="like icon" />
          <Typography variant="subtitle1">{likes}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={commentIcon} height="15px" alt="comment icon" />
          <Typography variant="subtitle1">{"0"}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={playIcon} height="15px" alt="plays icon" />
          <Typography variant="subtitle1">{"0"}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default SongBoxSongInfo;
