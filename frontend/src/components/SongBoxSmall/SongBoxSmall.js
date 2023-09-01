import { Card, CardContent } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../../slices/songSlice";
import Grid from "@mui/material/Grid";
import SongBoxSongArt from "./SongBoxArt";
import SongBoxSongInfo from "./SongBoxSongInfo";
import SongBoxUserInfo from "./SongBoxUserInfo";

function SongBoxSmall({ song }) {
  const dispatch = useDispatch();

  const setSong = () => {
    dispatch(setCurrentSong(song));
  };

  return (
    <>
      <Grid item xs={6}>
        <Card
          sx={{
            backgroundColor: "background.darkest",
            display: "flex",
            height: "120px",
          }}
        >
          <SongBoxSongArt setSong={setSong} song={song} />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              width: "70%",
              padding: "5px 15px",
            }}
          >
            <SongBoxSongInfo song={song} />
            <SongBoxUserInfo song={song} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default SongBoxSmall;
