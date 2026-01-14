import { AppBar, Toolbar, Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Divider } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

// Iconos
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';

const drawerWidth = 240;

export const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 1. Header Azul */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <StorefrontIcon sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap component="div">
            AutoRepuestos "El Amigo"
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 2. Menú Lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Espacio para que no lo tape el AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* BOTÓN INICIO (Página de Bienvenida) */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Inicio" sx={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>

            <Divider />

            {/* BOTÓN CLIENTES */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/clientes")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItemButton>
            </ListItem>

            {/* BOTÓN PRODUCTOS */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/productos")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItemButton>
            </ListItem>

            {/* BOTÓN VENTAS */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/ventas")}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Ventas" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 3. Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet /> {/* Aquí se cargan todos tus componentes */}
      </Box>
    </Box>
  );
};