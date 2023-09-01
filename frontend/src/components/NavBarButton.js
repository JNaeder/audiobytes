import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBarButton({ icon, text, path }) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        startIcon={icon}
        sx={{
          backgroundColor: "background.darkest",
        }}
        onClick={() => {
          navigate(path);
        }}
      >
        {text && <Typography>{text}</Typography>}
      </Button>
    </>
  );
}

export default NavBarButton;
