import heartIcon from "../../imgs/icons/heart.png";
import { Box, IconButton, Typography } from "@mui/material";

function SongInfoBox({ currentSong, isSm }) {
  const albumImage = currentSong
    ? currentSong.artURL.String
    : "https://audiobytes.nyc3.digitaloceanspaces.com/c9f71218-4380-4dc5-87c0-0d850cd2606c.png";
  const songName = currentSong ? currentSong.name : "Testing Song Name Here";
  const songUser = currentSong ? currentSong.username : "artist_name_here";
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start-flex",
          gap: "20px",
        }}
      >
        {currentSong ? (
          <>
            <img src={albumImage} height="100%" alt="Album Art" />
            {!isSm && (
              <>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {songName}
                  </Typography>
                  <Typography variant="subtitle2">{songUser}</Typography>
                </Box>
                <IconButton>
                  <img src={heartIcon} height="20px" alt="like icon" />
                </IconButton>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default SongInfoBox;
