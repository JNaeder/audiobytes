import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [songPercent, setSongPercent] = useState(0);
  const [desiredTime, setDesiredTime] = useState(0);

  const isPlaying = useSelector((state) => state.song.isPlaying);
  const currentSong = useSelector((state) => state.song.currentSong);

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
  }, [currentSong]);

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
          justifyContent: "flex-start",
        }}
      >
        <SongInfoBox currentSong={currentSong} />
        <TransportControls playSong={playSong} isPlaying={isPlaying} />
        <ProgressBar
          changeTime={changeTime}
          handleMouseUp={handleMouseUp}
          currentTime={currentTime}
          duration={duration}
          songPercent={songPercent}
        />
      </Box>
    </>
  );
}

export default PlayBar;
