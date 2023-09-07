import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBarHamburgerButton({ handleClose, text, icon, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
    handleClose();
  };
  return (
    <>
      <MenuItem onClick={handleClick}>
        <ListItemIcon
          sx={{
            color: "white",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </MenuItem>
    </>
  );
}

export default NavBarHamburgerButton;
