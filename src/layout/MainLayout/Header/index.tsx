import { ReactNode } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";

// project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";
import IconButton from "@/components/@extended/IconButton";

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

const Header: React.FC<Props> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const iconBackColorOpen = theme.palette.mode === "dark" ? "grey.200" : "grey.300";
  const iconBackColor = theme.palette.mode === "dark" ? "background.default" : "grey.100";

  // Common header
  const mainHeader: ReactNode = (
    <Toolbar>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        variant="light"
        sx={{ 
          color: "text.primary", 
          bgcolor: open ? iconBackColorOpen : iconBackColor, 
          ml: { xs: 0, lg: -2 } 
        }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} position="fixed" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}`, zIndex: 1200 }}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}`, zIndex: 1200 }}>
          {mainHeader}
        </AppBar>
      )}
    </>
  );
};

export default Header;
