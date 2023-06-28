import { ButtonBase, CardMedia } from "@mui/material";

function SongBoxSongArt({ setSong, song }) {
  return (
    <>
      <ButtonBase onClick={setSong}>
        <CardMedia
          component="img"
          src={song.artURL.String}
          sx={{
            height: "100%",
          }}
        />
      </ButtonBase>
    </>
  );
}

export default SongBoxSongArt;
