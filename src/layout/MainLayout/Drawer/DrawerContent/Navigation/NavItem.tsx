import React, { forwardRef, useEffect, ForwardRefExoticComponent, RefAttributes } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

// project import
import { activeItem } from "@/store/reducers/menu";

// types
import { LinkTarget, NavItemType } from "@/types/menu";
import { RootStateProps } from "@/types/root";
import { useTranslation } from "react-i18next";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

interface Props {
  item: NavItemType;
  level: number;
}

const NavItem = ({ item, level }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen, openItem } = menu;

  // Determine the target attribute for the link
  const itemTarget: LinkTarget = item.target ? "_blank" : "_self";

  // Define link properties
  const listItemProps = item.external
    ? { component: "a", href: item.url, target: itemTarget }
    : { component: forwardRef((props, ref) => <Link {...props} ref={ref} to={item.url!} target={itemTarget} />) };

  // Determine icon properties
  const Icon = item.icon!;
  const itemIcon = <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />;

  // Check if the item is selected
  const isSelected = openItem.includes(item.id);

  // Get the current pathname
  const { pathname } = useLocation();

  // Update active item on page load
  useEffect(() => {
    if (pathname.includes(item.url || "")) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
  }, [pathname, dispatch, item.id, item.url]);

  // Styles
  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";
  const iconSelectedColor = drawerOpen && theme.palette.mode === "dark" ? "text.primary" : "primary.main";

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      onClick={() => {
        dispatch(activeItem({ openItem: [item.id] }));
      }}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          "&:hover": {
            bgcolor: theme.palette.mode === "dark" ? "divider" : "primary.lighter",
          },
          "&.Mui-selected": {
            bgcolor: theme.palette.mode === "dark" ? "divider" : "primary.lighter",
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              bgcolor: theme.palette.mode === "dark" ? "divider" : "primary.lighter",
            },
          },
        }),
        ...(!drawerOpen && {
          "&:hover": {
            bgcolor: "transparent",
          },
          "&.Mui-selected": {
            bgcolor: "transparent",
          },
        }),
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "secondary.light" : "secondary.lighter",
              },
              ...(isSelected && {
                bgcolor: theme.palette.mode === "dark" ? "primary.900" : "primary.lighter",
              }),
            }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {item.title && t(item.title, { ns: "title" })}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
