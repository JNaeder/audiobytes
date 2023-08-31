import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UploadPage() {
  const [songName, setSongName] = useState("");
  const [songFile, setSongFile] = useState("");
  const [artFile, setArtFile] = useState("");

  const user = useSelector((state) => state.user);

  const submitSong = async () => {
    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("songFile", songFile);
    formData.append("artFile", artFile);
    formData.append("userId", user.userId);
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          height: "100%",
        }}
      >
        <Typography variant="h4">Upload Page</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "background.dark",
            width: "100%",
            height: "70%",
            borderRadius: "10px",
            padding: "50px",
          }}
        >
          <TextField
            id="song-name"
            label="Song Name"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setSongName(e.target.value);
            }}
          />
          <TextField
            id="song-file"
            type="file"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setSongFile(e.target.files[0]);
            }}
          />
          <TextField
            id="art-file"
            type="file"
            inputProps={{ style: { color: "white" } }}
            fullWidth
            onChange={(e) => {
              setArtFile(e.target.files[0]);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitSong}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default UploadPage;
