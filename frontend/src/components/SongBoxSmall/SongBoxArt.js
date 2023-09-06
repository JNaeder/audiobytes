import { CardMedia, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { setCurrentSong, setIsPlaying } from "../../slices/songSlice";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

function SongBoxSongArt({ song }) {
  const dispatch = useDispatch();
  const [mediaHovered, setMediaHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [songIsCurrentSong, setSongIsCurrentSong] = useState(false);

  const currentSong = useSelector((state) => state.song.currentSong);
  const isPlaying = useSelector((state) => state.song.isPlaying);

  const handleMediaHover = () => {
    setMediaHovered(true);
  };

  const handleMediaLeave = () => {
    setMediaHovered(false);
  };

  const handleButtonHover = () => {
    setButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setButtonHovered(false);
  };

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

  // Set if current song
  useEffect(() => {
    if (currentSong && song.songID === currentSong.songID) {
      setSongIsCurrentSong(true);
    } else {
      setSongIsCurrentSong(false);
    }
  }, [songIsPlaying, currentSong, song]);

  return (
    <>
      <CardMedia
        component="img"
        src={song.artURL.String}
        sx={{
          display: "flex",
          height: "100%",
          width: "120px",
        }}
        onMouseEnter={handleMediaHover}
        onMouseLeave={handleMediaLeave}
      />
      <IconButton
        sx={{
          position: "relative",
          transform: "translate(-130%, 0%)",
          opacity: mediaHovered || buttonHovered || songIsCurrentSong ? 1 : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        onClick={handleButtonClick}
      >
        {songIsPlaying ? (
          <PauseCircleIcon
            sx={{
              fontSize: "60px",
              width: "60px",
            }}
            color="primary"
          />
        ) : (
          <PlayCircleIcon
            sx={{
              fontSize: "60px",
              width: "60px",
            }}
            color="primary"
          />
        )}
      </IconButton>
    </>
  );
}

export default SongBoxSongArt;
