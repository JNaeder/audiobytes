import { Card, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import SongBoxSongArt from "./SongBoxArt";
import SongBoxPlayButton from "./SongBoxPlayButton";
import SongBoxSongInfo from "./SongBoxSongInfo";
import SongBoxUserInfo from "./SongBoxUserInfo";

function SongBoxSmall({ song, gridSize, showUser = true }) {
  const theme = useTheme();

  const [border, setBorder] = useState("3px solid #242423");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSm, setIsSm] = useState(false);
  const currentSong = useSelector((state) => state.song.currentSong);
  const gridItemRef = useRef(null);

  const cutOffPixels = 450;

  useEffect(() => {
    if (currentSong && currentSong.songID === song.songID) {
      setBorder(`3px solid ${theme.palette.primary.main}`);
    } else {
      setBorder(`3px solid ${theme.palette.background.darkest}`);
    }
  }, [
    currentSong,
    song,
    setBorder,
    theme.palette.primary.main,
    theme.palette.background.darkest,
  ]);

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
          // For the whole song card
          sx={{
            backgroundColor: "background.darkest",
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
            // For Info + Play Button
            sx={{
              display: "flex",
              flexDirection: isSm ? "column" : "row",
              alignItems: isSm ? "space-between" : "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              // For all the Info (User/Song)
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: isSm ? "flex-start" : "space-between",
                // width: "100%",
                height: "100%",
                // backgroundColor: "green",
              }}
            >
              <SongBoxSongInfo song={song} isSm={isSm} />
              <SongBoxUserInfo song={song} showUser={showUser} isSm={isSm} />
            </Box>
            <SongBoxPlayButton song={song} isSm={isSm} />
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default SongBoxSmall;
