import { Box } from "@mui/material";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <TopBar />
      <Box
        sx={{
          width: "100vw",
          height: "94vh",
          backgroundColor: "background.darkest",
        }}
      ></Box>
    </>
  );
}

export default App;
