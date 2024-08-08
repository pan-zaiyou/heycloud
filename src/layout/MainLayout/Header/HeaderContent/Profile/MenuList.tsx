import React, { useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// material-ui
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useSnackbar } from "notistack";

// project imports
import { useDispatch } from "@/store";
import { logout } from "@/store/reducers/auth";
import config from "@/config";

// assets
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export interface MenuProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  icon: React.ReactNode;
  text: string | React.ReactNode;
}

// 假设你有一个上下文来控制侧边栏状态
const SidebarContext = React.createContext({
  closeSidebar: () => {} // 关闭侧边栏的函数
});

const MenuList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { closeSidebar } = useContext(SidebarContext); // 从上下文中获取关闭侧边栏的函数

  const handleLogout = () => {
    dispatch(logout());
    enqueueSnackbar(t("notice::logout_success"), { variant: "success" });
    navigate(config.defaultPath, { replace: true });
  };

  const handleProfileClick = () => {
    navigate("/profile");
    closeSidebar(); // 点击个人中心后关闭侧边栏
  };

  const buttons = useMemo<MenuProps[]>(
    () => [
      {
        icon: <UserOutlined />,
        text: t("layout.header.profile.profile_center"),
        onClick: handleProfileClick // 使用自定义的点击处理函数
      },
      {
        icon: <LogoutOutlined />,
        text: t("layout.header.profile.logout"),
        onClick: handleLogout
      }
    ],
    [t, closeSidebar]
  );

  return (
    <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}>
      {buttons.map((button, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton onClick={button.onClick}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText
              primary={button.text}
              primaryTypographyProps={{
                noWrap: true
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
