import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SongBoxSmall from "../components/SongBoxSmall";

import axios from "axios";

function HomePage() {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:8080/homepage/songs");
      setAllSongs(response.data);
    };

    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "80%",
          height: "90%",
          borderRadius: "10px",
          backgroundColor: "background.dark",
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            padding: "20px",
          }}
        >
          {allSongs.map((song, i) => {
            return <SongBoxSmall key={i} song={song} />;
          })}
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;