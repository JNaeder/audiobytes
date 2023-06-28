import { Card, CardMedia, CardContent, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../slices/songSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import heartIcon from "../imgs/icons/heart.png";
import commentIcon from "../imgs/icons/chat.png";
import playIcon from "../imgs/icons/arrow.png";

function SongBoxSmall({ song }) {
  console.log(song);
  const dispatch = useDispatch();

  const dateUloaded = new Date(song.dateUploaded).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

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
          <ButtonBase
            onClick={setSong}
            sx={
              {
                // height: "20%",
              }
            }
          >
            <CardMedia component="img" src={song.artURL.String} />
          </ButtonBase>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4">{song.name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src={heartIcon} height="20px" />
                <Typography variant="h5">{"2"}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src={commentIcon} height="20px" />
                <Typography variant="h5">{"1"}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src={playIcon} height="20px" />
                <Typography variant="h5">{"0"}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <Avatar
                src={song.picURL}
                sx={{
                  border: "2px solid #7798AB",
                }}
              />
              <Typography variant="h5">{song.username}</Typography>
              <Typography variant="subtitle2">{dateUloaded}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default SongBoxSmall;
