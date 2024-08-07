import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface Props extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240; // Assuming drawerWidth is 240px

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== "open" })<Props>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7.5)})`
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setOpen(false); // Collapse the sidebar when a menu item is clicked
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => handleMenuItemClick("/home")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleMenuItemClick("/about")}>
          <ListItemText primary="About" />
        </ListItem>
        {/* Add more menu items here */}
      </List>
    </Drawer>
  );
};

const AppBarWithSidebar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyled open={true} position="fixed">
        {/* AppBar content */}
      </AppBarStyled>
      <Sidebar />
    </Box>
  );
};

export default AppBarStyled;
