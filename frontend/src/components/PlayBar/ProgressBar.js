import { Box, Slider, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

function ProgressBar({
  changeTime,
  handleMouseUp,
  currentTime,
  duration,
  songPercent,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            height: "100%",
            width: "60%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <Typography variant="subtitle1">{currentTime}</Typography>
          <Slider
            sx={{
              width: "80%",
              "& .MuiSlider-track": {
                height: "7px",
                // transition: "2s",
              },
              "& .MuiSlider-thumb": {
                color: "#EEF8E2",
                height: "10px",
                width: "10px",
              },
              "& .MuiSlider-rail": {
                height: "7px",
                color: "background.darkest",
                opacity: 1,
              },
            }}
            value={songPercent}
            onChange={changeTime}
            step={0.01}
            onMouseUp={handleMouseUp}
          />
          <Typography variant="subtitle1">{duration}</Typography>
        </Box>
      )}
    </>
  );
}

export default ProgressBar;
