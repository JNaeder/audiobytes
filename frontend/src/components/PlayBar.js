import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import heartIcon from "../imgs/icons/heart.png";
import playIcon from "../imgs/icons/play-button.png";
import pauseIcon from "../imgs/icons/pause-button.png";
import nextIcon from "../imgs/icons/next.png";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const formatTime = (time) => {
  if (time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  } else {
    return "0:00";
  }
};

function PlayBar() {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songPercent, setSongPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [desiredTime, setDesiredTime] = useState(0);

  const currentSong = useSelector((state) => state.song.currentSong);
  const albumImage = currentSong ? currentSong.artURL.String : "";
  const songName = currentSong ? currentSong.name : "--------";
  const songUser = currentSong ? currentSong.username : "----------";

  const playSong = () => {
    if (currentSong) {
      if (audioRef.current.src !== currentSong.storageURL) {
        audioRef.current.src = currentSong.storageURL;
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const updateTime = () => {
    if (isPlaying) {
      const duration = formatTime(audioRef.current.duration);
      const currentTime = formatTime(audioRef.current.currentTime);
      const songPercent = Math.floor(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
      setCurrentTime(currentTime);
      setDuration(duration);
      setSongPercent(songPercent);
    }
  };

  const changeTime = (e, value) => {
    setDesiredTime(value);
  };

  const handleMouseUp = () => {
    audioRef.current.currentTime = desiredTime;
  };

  return (
    <>
      <audio ref={audioRef} onTimeUpdate={updateTime} />
      <Box
        sx={{
          width: "100vw",
          height: "60px",
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
            onClick={playSong}
            sx={{
              height: "100%",
            }}
          >
            <img src={isPlaying ? pauseIcon : playIcon} height="80%" />
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
          <Typography variant="subtitle1">{currentTime}</Typography>
          <Slider
            sx={{
              width: "80%",
              "& .MuiSlider-track": {
                height: "7px",
                // transition: "2s",
              },
              "& .MuiSlider-thumb": {
                color: "#EEF8E2",
                height: "10px",
                width: "10px",
              },
              "& .MuiSlider-rail": {
                height: "7px",
                color: "background.darkest",
                opacity: 1,
              },
            }}
            value={songPercent}
            onChange={changeTime}
            step={0.01}
            onMouseUp={handleMouseUp}
          />
          <Typography variant="subtitle1">{duration}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default PlayBar;
