import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import heartIcon from "../imgs/icons/heart.png";
import playIcon from "../imgs/icons/play-button.png";
import nextIcon from "../imgs/icons/next.png";
import { useSelector } from "react-redux";

function PlayBar() {
  const currentSong = useSelector((state) => state.song.currentSong);
  const albumImage = currentSong ? currentSong.artURL.String : "";
  const songName = currentSong ? currentSong.name : "--------";
  const songUser = currentSong ? currentSong.username : "----------";
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "10vh",
          backgroundColor: "background.dark",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
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
          <img src={albumImage} height="100%" />
          <Box>
            <Typography variant="h5">{songName}</Typography>
            <Typography variant="subtitle1">{songUser}</Typography>
          </Box>
          <img src={heartIcon} height="20px" />
        </Box>
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
            />
          </IconButton>
          <IconButton
            sx={{
              height: "100%",
            }}
          >
            <img src={playIcon} height="80%" />
          </IconButton>
          <IconButton
            sx={{
              height: "100%",
            }}
          >
            <img src={nextIcon} height="40%" />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "60%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <Typography variant="subtitle1">{"0:00"}</Typography>
          <Slider
            sx={{
              width: "80%",
              "& .MuiSlider-track": {
                height: "20px",
              },
              "& .MuiSlider-thumb": {
                color: "#EEF8E2",
                height: "30px",
                width: "30px",
              },
              "& .MuiSlider-rail": {
                height: "20px",
                color: "background.darkest",
                opacity: 1,
              },
            }}
          />
          <Typography variant="subtitle1">{"3:30"}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default PlayBar;
