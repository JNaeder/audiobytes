import { Card, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SongBoxSongArt from "./SongBoxArt";
import SongBoxSongInfo from "./SongBoxSongInfo";
import SongBoxUserInfo from "./SongBoxUserInfo";

function SongBoxSmall({ song, gridSize, showUser = true }) {
  const [border, setBorder] = useState("3px solid #242423");
  const currentSong = useSelector((state) => state.song.currentSong);

  useEffect(() => {
    if (currentSong && currentSong.songID === song.songID) {
      setBorder("3px solid #7798AB");
    } else {
      setBorder("3px solid #242423");
    }
  }, [currentSong, song, setBorder]);

  return (
    <>
      <Grid item xs={gridSize}>
        <Card
          sx={{
            backgroundColor: "background.darkest",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "120px",
            border: border,
            // backgroundColor: "blue",
          }}
        >
          <SongBoxSongArt song={song} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // alignContent: "center",
              justifyContent: "space-evenly",
              // backgroundColor: "red",
              width: "100%",
            }}
          >
            <SongBoxSongInfo song={song} />
            <SongBoxUserInfo song={song} showUser={showUser} />
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default SongBoxSmall;
