import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import PlayBar from "./components/PlayBar";

import axios from "axios";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:8080/users");
      setAllUsers(response.data);
      console.log(response.data);
    };

    getData();
  }, []);

  return (
    <>
      <TopBar />
      <NavBar />
      <Box
        sx={{
          width: "100vw",
          height: "78vh",
          backgroundColor: "background.darkest",
        }}
      ></Box>
      <PlayBar />
    </>
  );
}

export default App;
