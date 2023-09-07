import { Card, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import SongBoxSongArt from "./SongBoxArt";
import SongBoxPlayButton from "./SongBoxPlayButton";
import SongBoxSongInfo from "./SongBoxSongInfo";
import SongBoxUserInfo from "./SongBoxUserInfo";

function SongBoxSmall({ song, gridSize, showUser = true }) {
  const [border, setBorder] = useState("3px solid #242423");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSm, setIsSm] = useState(false);
  const currentSong = useSelector((state) => state.song.currentSong);
  const gridItemRef = useRef(null);

  const cutOffPixels = 450;

  useEffect(() => {
    if (currentSong && currentSong.songID === song.songID) {
      setBorder("3px solid #7798AB");
    } else {
      setBorder("3px solid #242423");
    }
  }, [currentSong, song, setBorder]);

  useEffect(() => {
    const logGridItemWidth = () => {
      if (gridItemRef.current) {
        // console.log(gridItemRef.current.clientWidth);
        setIsSm(gridItemRef.current.clientWidth < cutOffPixels);
      }
    };

    logGridItemWidth();

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [windowWidth]);

  return (
    <>
      <Grid item xs={gridSize} ref={gridItemRef}>
        <Card
          sx={{
            backgroundColor: "background.darkest",
            // backgroundColor: isSm ? "blue" : "red",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "120px",
            border: border,
          }}
        >
          <SongBoxSongArt song={song} />
          <Box
            sx={{
              display: "flex",
              flexDirection: isSm ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isSm ? "row" : "column",
                alignContent: "center",
                justifyContent: "space-between",
                // width: "100%",
                height: "100%",
              }}
            >
              <SongBoxSongInfo song={song} isSm={isSm} />
              <SongBoxUserInfo song={song} showUser={showUser} isSm={isSm} />
            </Box>
            <SongBoxPlayButton song={song} />
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default SongBoxSmall;
