import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import SongInfoBox from "./SongInfoBox";
import TransportControls from "./TransportControls";
import ProgressBar from "./ProgressBar";
import { setIsPlaying } from "../../slices/songSlice";

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [songPercent, setSongPercent] = useState(0);
  const [desiredTime, setDesiredTime] = useState(0);

  const isPlaying = useSelector((state) => state.song.isPlaying);
  const currentSong = useSelector((state) => state.song.currentSong);

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const playSong = () => {
    if (currentSong) {
      if (audioRef.current.src !== currentSong.storageURL) {
        audioRef.current.src = currentSong.storageURL;
      }
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
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

  const songEnded = () => {
    dispatch(setIsPlaying(false));
    setCurrentTime("0:00");
    setSongPercent(0);
  };

  const changeTime = (e, value) => {
    setDesiredTime(value);
  };

  const handleMouseUp = () => {
    audioRef.current.currentTime = desiredTime;
  };

  useEffect(() => {
    if (currentSong) {
      if (audioRef.current.src !== currentSong.storageURL) {
        audioRef.current.src = currentSong.storageURL;
      }
      audioRef.current.play();
      dispatch(setIsPlaying(true));
      setCurrentTime("0:00");
      setSongPercent(0);
    }
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={songEnded} />
      <Box
        sx={{
          width: "100vw",
          height: "60px",
          backgroundColor: "background.dark",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SongInfoBox currentSong={currentSong} isSm={isSm} />
        <TransportControls playSong={playSong} isPlaying={isPlaying} />
        {!isMd ? (
          <ProgressBar
            changeTime={changeTime}
            handleMouseUp={handleMouseUp}
            currentTime={currentTime}
            duration={duration}
            songPercent={songPercent}
          />
        ) : (
          <div></div>
        )}
      </Box>
    </>
  );
}

export default PlayBar;
