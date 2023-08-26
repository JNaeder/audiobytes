import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBarButton({ icon, text, path }) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        startIcon={<img src={icon} height="20px" alt="Start Icon" />}
        sx={{
          backgroundColor: "background.darkest",
        }}
        onClick={() => {
          navigate(path);
        }}
      >
        <Typography>{text}</Typography>
      </Button>
    </>
  );
}

export default NavBarButton;
