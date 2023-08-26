import { Box, IconButton } from "@mui/material";
import playIcon from "../../imgs/icons/play-button.png";
import pauseIcon from "../../imgs/icons/pause-button.png";
import nextIcon from "../../imgs/icons/next.png";

function TransportControls({ playSong, isPlaying }) {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "20%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <IconButton
          sx={{
            height: "100%",
          }}
        >
          <img
            src={nextIcon}
            style={{ transform: "scaleX(-1)" }}
            height="40%"
            alt="Prev Icon"
          />
        </IconButton>
        <IconButton
          onClick={playSong}
          sx={{
            height: "100%",
          }}
        >
          <img
            src={isPlaying ? pauseIcon : playIcon}
            height="80%"
            alt="Play Button"
          />
        </IconButton>
        <IconButton
          sx={{
            height: "100%",
          }}
        >
          <img src={nextIcon} height="40%" alt="Next Icon" />
        </IconButton>
      </Box>
    </>
  );
}

export default TransportControls;
