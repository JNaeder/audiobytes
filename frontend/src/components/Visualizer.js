import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function Visualizer() {
  const currentSong = useSelector((state) => state.song.currentSong);
  const [imgSrc, setImgSrc] = useState("");
  const [songName, setSongName] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (currentSong) {
      setImgSrc(currentSong.artURL.String);
      setSongName(currentSong.name);
      setUser(currentSong.username);
    }
  }, [currentSong]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          // width: "100vw",
          height: "100%",
        }}
      >
        <Box sx={{ height: "95%" }}>
          <img src={imgSrc} height="100%" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "5%",
            // backgroundColor: "background.dark",
            borderRadius: "10px",
            margin: "auto",
          }}
        >
          <Typography variant="h5">{songName}</Typography>
          <Typography variant="h5" sx={{ opacity: 0.5 }}>
            {user}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Visualizer;
