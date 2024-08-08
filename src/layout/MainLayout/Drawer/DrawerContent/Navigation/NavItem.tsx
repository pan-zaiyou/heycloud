import React, { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { activeItem } from "@/store/reducers/menu";
import { NavItemType } from "@/types/menu";
import { RootStateProps } from "@/types/root";
import { useTranslation } from "react-i18next";

interface Props {
  item: NavItemType;
  level: number;
  onClick?: () => void;
}

const NavItem = ({ item, level, onClick }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen, openItem } = menu;

  const isSelected = openItem.includes(item.id);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === item.url) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
  }, [pathname, dispatch, item.url, item.id]);

  return (
    <ListItemButton
      component={item.external ? "a" : forwardRef((props, ref) => <Link {...props} ref={ref} to={item.url!} />)}
      disabled={item.disabled}
      selected={isSelected}
      onClick={onClick}
    >
      {item.icon && (
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
      )}
      <ListItemText
        primary={
          <Typography variant="h6">
            {t(item.title)}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
