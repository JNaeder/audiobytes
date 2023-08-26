import heartIcon from "../../imgs/icons/heart.png";
import { Box, IconButton, Typography } from "@mui/material";

function SongInfoBox({ currentSong }) {
  const albumImage = currentSong ? currentSong.artURL.String : "";
  const songName = currentSong ? currentSong.name : "--------";
  const songUser = currentSong ? currentSong.username : "----------";
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "20%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start-flex",
          gap: "20px",
        }}
      >
        <img src={albumImage} height="100%" alt="Album Art" />
        <Box>
          <Typography variant="h6">{songName}</Typography>
          <Typography variant="subtitle2">{songUser}</Typography>
        </Box>
        <IconButton>
          <img src={heartIcon} height="20px" alt="like icon" />
        </IconButton>
      </Box>
    </>
  );
}

export default SongInfoBox;
