import React, { useEffect, useState, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Collapse,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from "@mui/material";
import NavItem from "./NavItem";
import Transitions from "@/components/@extended/Transitions";
import { makeStyles } from "@/themes/hooks";
import { BorderOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { NavItemType } from "@/types/menu";
import { RootStateProps } from "@/types/root";

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

const useStyles = makeStyles<{
  drawerOpen: boolean;
  level: number;
}>()((theme, { drawerOpen, level }) => ({
  // ... your styles here ...
}));

interface Props {
  menu: NavItemType;
  level: number;
}

const NavCollapse = ({ menu, level }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const menuState = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menuState;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined
  ) => {
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    setOpen(false); // 折叠父菜单
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const childrens = menu.children ? menu.children : [];
    childrens.forEach((item) => {
      if (pathname && pathname.includes("product-details")) {
        if (item.url && item.url.includes("product-details")) {
          setOpen(true);
        }
      }

      if (item.url === pathname) {
        setOpen(true);
        setSelected(menu.id);
      }
    });
  }, [pathname, menu]);

  const { classes, cx, css } = useStyles({
    drawerOpen,
    level
  });

  const openMini = Boolean(anchorEl);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return (
          <NavItem
            key={item.id}
            item={item}
            level={level + 1}
            onClick={handleMenuItemClick} // 传递点击处理函数
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const borderIcon = level === 1 ? <BorderOutlined className={classes.borderIcon} /> : false;
  const Icon = menu.icon!;
  const menuIcon = menu.icon ? <Icon className={classes.icon} /> : borderIcon;
  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";

  return (
    <>
      <ListItemButton
        disableRipple
        selected={selected === menu.id}
        {...(!drawerOpen && { onMouseEnter: handleClick, onMouseLeave: handleClose })}
        onClick={handleClick}
        className={classes.listItemButton}
      >
        {menuIcon && (
          <ListItemIcon
            className={cx(
              classes.listItemIcon,
              css({
                color: selected === menu.id ? theme.palette.primary.main : textColor,
                ...(!drawerOpen &&
                  selected === menu.id && {
                    bgcolor: theme.palette.mode === "dark" ? theme.palette.primary[900] : theme.palette.primary.lighter,
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark" ? theme.palette.primary.darker : theme.palette.primary.lighter
                    }
                  })
              })
            )}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6">
                {t(menu.title ?? "undefined", { ns: "title" })}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography variant="caption" color="secondary">
                  {menu.caption}
                </Typography>
              )
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          (openMini || open ? (
            <UpOutlined className={classes.upIcon} />
          ) : (
            <DownOutlined className={classes.downIcon} />
          ))}

        {!drawerOpen && (
          <Popper
            className={classes.popper}
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            popperOptions={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [-12, 1]
                  }
                }
              ]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box>{navCollapse}</Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ p: 0 }}>{navCollapse}</List>
        </Collapse>
      )}
    </>
  );
};

export default NavCollapse;
