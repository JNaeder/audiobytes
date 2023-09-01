import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UploadPrompt({ setSongUploaded }) {
  const [songName, setSongName] = useState("");
  const [songFile, setSongFile] = useState("");
  const [artFile, setArtFile] = useState("");
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  const validateForm = () => {
    if (songName === "") {
      setError("Song Name cannot be empty");
      return false;
    }
    if (songFile === "") {
      setError("Song File cannot be empty");
      return false;
    }
    if (artFile === "") {
      setError("Artwork cannot be empty");
      return false;
    }
    return true;
  };

  const submitSong = async () => {
    if (!validateForm()) {
      return;
    }
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
    if (response.status === 201) {
      setSongUploaded(true);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <Typography variant="h4">Upload Page</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            color: "white",
            backgroundColor: "background.dark",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            padding: "50px",
          }}
        >
          {error ? (
            <Typography variant="p" color="error">
              {error}
            </Typography>
          ) : (
            ""
          )}
          <Box
            sx={{
              width: "100%",
            }}
          >
            <InputLabel htmlFor="song-name">Song Name</InputLabel>
            <TextField
              id="song-name"
              inputProps={{ style: { color: "white" } }}
              fullWidth
              onChange={(e) => {
                setSongName(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <InputLabel htmlFor="song-file">Upload Song</InputLabel>
            <TextField
              id="song-file"
              type="file"
              inputProps={{ style: { color: "white" } }}
              fullWidth
              onChange={(e) => {
                setSongFile(e.target.files[0]);
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <InputLabel htmlFor="art-file">Upload Artwork</InputLabel>
            <TextField
              id="art-file"
              type="file"
              inputProps={{ style: { color: "white" } }}
              fullWidth
              onChange={(e) => {
                setArtFile(e.target.files[0]);
              }}
            />
          </Box>
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
    </>
  );
}

export default UploadPrompt;
