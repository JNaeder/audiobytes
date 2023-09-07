import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import TopBar from "./components/TopBar/TopBar";
import NavBar from "./components/NavBar/NavBar";
import PlayBar from "./components/PlayBar/PlayBar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage/AboutPage";
import MyMusic from "./components/MyMusic";
import UploadPage from "./components/UploadPage/UploadPage";
import Visualizer from "./components/Visualizer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import AuthPage from "./components/AuthPage";
import UserPage from "./components/UserPage/UserPage";

function App() {
  // const theme = useTheme();
  // console.log(theme);
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <NavBar />
        <Box
          sx={{
            width: "100vw",
            height: "calc(100vh - 160px)",
            backgroundColor: "background.darkest",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/mymusic" element={<MyMusic />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/visualizer" element={<Visualizer />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/user/:username" element={<UserPage />} />
          </Routes>
        </Box>
        <PlayBar />
      </BrowserRouter>
    </>
  );
}

export default App;
