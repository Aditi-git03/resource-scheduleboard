import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Toolbar, AppBar, Typography, IconButton, Box, useMediaQuery
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import Sidebar from "./components/Sidebar";

const drawerWidth = 240;

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Resource Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={open}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: { sm: `calc(100% - ${open ? drawerWidth : 60}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
