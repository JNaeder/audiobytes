import { CardMedia } from "@mui/material";

function SongBoxSongArt({ song }) {
  return (
    <>
      <CardMedia
        component="img"
        src={song.artURL.String}
        sx={{
          display: "flex",
          height: "100%",
          width: "120px",
          marginRight: "10px",
        }}
      />
    </>
  );
}

export default SongBoxSongArt;
