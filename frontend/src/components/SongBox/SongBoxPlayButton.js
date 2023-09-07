import { Box, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { setCurrentSong, setIsPlaying } from "../../slices/songSlice";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

function SongBoxPlayButton({ song, isSm }) {
  const dispatch = useDispatch();

  const [songIsPlaying, setSongIsPlaying] = useState(false);

  const currentSong = useSelector((state) => state.song.currentSong);
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const [buttonSize, setButtonSize] = useState(null);

  const handleButtonClick = () => {
    if (currentSong && song.songID === currentSong.songID) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setCurrentSong(song));
    }
  };

  // Set play or pause button
  useEffect(() => {
    if (currentSong && song.songID === currentSong.songID && isPlaying) {
      setSongIsPlaying(true);
    } else {
      setSongIsPlaying(false);
    }
  }, [currentSong, isPlaying, song]);

  useEffect(() => {
    if (isSm) {
      setButtonSize("40px");
    } else {
      setButtonSize("70px");
    }
  }, [buttonSize, isSm]);

  return (
    <>
      <Box>
        <IconButton onClick={handleButtonClick}>
          {songIsPlaying ? (
            <PauseCircleIcon
              sx={{
                fontSize: buttonSize,
                width: buttonSize,
              }}
              color="primary"
            />
          ) : (
            <PlayCircleIcon
              sx={{
                fontSize: buttonSize,
                width: buttonSize,
              }}
              color="primary"
            />
          )}
        </IconButton>
      </Box>
    </>
  );
}

export default SongBoxPlayButton;
