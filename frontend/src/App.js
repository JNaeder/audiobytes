import Box from "@mui/material/Box";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import PlayBar from "./components/PlayBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <TopBar />
      <NavBar />
      <Box
        sx={{
          width: "100vw",
          height: "78vh",
          backgroundColor: "background.darkest",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HomePage />
      </Box>
      <PlayBar />
    </>
  );
}

export default App;
