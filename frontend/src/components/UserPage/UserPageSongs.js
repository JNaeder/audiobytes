import { Box, Typography, Grid } from "@mui/material";
import SongBoxSmall from "../SongBox/SongBox";

function UserPageSongs({ userInfo }) {
  return (
    <>
      <Box
        sx={{
          width: "80%",
          height: "70%",
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
          {userInfo.songs ? (
            userInfo.songs.map((song, i) => (
              <SongBoxSmall key={i} song={song} gridSize={6} showUser={false} />
            ))
          ) : (
            <Typography>No Songs</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default UserPageSongs;
