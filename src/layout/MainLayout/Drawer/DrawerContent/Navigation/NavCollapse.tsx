import React, { useState, useEffect, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, Popper, Paper, ClickAwayListener, Box, Typography } from "@mui/material";
import NavItem from "./NavItem";
import { NavItemType } from "@/types/menu";
import { RootStateProps } from "@/types/root";
import { BorderOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import Transitions from "@/components/@extended/Transitions";

interface Props {
  menu: NavItemType;
  level: number;
}

const NavCollapse = ({ menu, level }: Props) => {
  const theme = useTheme();
  const menuState = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menuState;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navCollapse = menu.children?.map((item) => (
    <NavItem
      key={item.id}
      item={item}
      level={level + 1}
      onClick={() => setOpen(false)}
    />
  ));

  const openMini = Boolean(anchorEl);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {menu.icon && <menu.icon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="h6">
              {menu.title}
            </Typography>
          }
        />
        {drawerOpen && (open ? <UpOutlined /> : <DownOutlined />)}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open}>
          <List>
            {navCollapse}
          </List>
        </Collapse>
      )}
      <Popper open={openMini} anchorEl={anchorEl}>
        <Transitions>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                {navCollapse}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      </Popper>
    </>
  );
};

export default NavCollapse;
