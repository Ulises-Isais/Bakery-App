import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ShowChart as ShowChartIcon,
  Logout as LogoutIcon,
  Inventory as InventoryIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          { text: "Inicio", icon: <HomeIcon />, path: "/dashboard" },
          { text: "Ventas", icon: <MonetizationOnIcon />, path: "/sales" },
          { text: "Inventario", icon: <InventoryIcon />, path: "/inventory" },
          { text: "Gráficas", icon: <ShowChartIcon />, path: "/graphics" },
          { text: "Salir", icon: <LogoutIcon />, path: "/login" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra superior */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Responsive */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // mejora rendimiento en móviles
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : open ? (
        <Drawer
          variant="persistent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              transition: "transform 0.1s ease-in-out", // animación de apertura
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : null}
      {/* <Drawer
        variant={isMobile ? "temporary" :"persistent" }
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer> */}

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s",
          // Solo aplica marginLeft si el Drawer es persistent y está abierto
          marginLeft: !isMobile && open ? `${drawerWidth}px` : 0,
          width: "100%",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
