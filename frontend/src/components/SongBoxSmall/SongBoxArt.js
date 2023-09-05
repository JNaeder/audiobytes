import { CardMedia, IconButton } from "@mui/material";
import { useState } from "react";
import { setCurrentSong } from "../../slices/songSlice";
import { useDispatch } from "react-redux";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleIcon from "@mui/icons-material/PauseCircle";

function SongBoxSongArt({ song }) {
  const dispatch = useDispatch();
  const [mediaHovered, setMediaHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

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

  return (
    <>
      <CardMedia
        component="img"
        src={song.artURL.String}
        sx={{
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
          opacity: mediaHovered || buttonHovered ? 1 : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        // onClick={() => console.log(song)}
        onClick={() => dispatch(setCurrentSong(song))}
      >
        <PlayCircleIcon
          sx={{
            fontSize: "60px",
          }}
          color="primary"
        />
      </IconButton>
    </>
  );
}

export default SongBoxSongArt;
