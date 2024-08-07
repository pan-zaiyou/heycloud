import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";

// ==============================|| HEADER - APP BAR STYLED ||============================== //

interface Props extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240; // 左侧菜单栏宽度

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== "open" })<Props>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7.5)})`,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarWithSidebar: React.FC = () => {
  const [open, setOpen] = useState(true); // 控制菜单的展开和收缩状态

  const handleDrawerToggle = () => {
    setOpen(!open); // 切换菜单状态
  };

  const handleMenuItemClick = () => {
    setOpen(false); // 点击子菜单项时收缩菜单栏
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBarStyled position="fixed" open={open}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ marginRight: '36px' }}
        >
          <MenuIcon />
        </IconButton>
        {/* 其他 AppBar 内容 */}
      </AppBarStyled>

      {/* Drawer 组件用于显示左侧菜单栏 */}
      <Drawer
        variant="persistent"
        anchor="left"
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
          <ListItem button onClick={handleMenuItemClick}>
            <ListItemText primary="Submenu Item 1" />
          </ListItem>
          <ListItem button onClick={handleMenuItemClick}>
            <ListItemText primary="Submenu Item 2" />
          </ListItem>
          {/* Add more menu items here */}
        </List>
      </Drawer>
    </div>
  );
};

export default AppBarWithSidebar;
