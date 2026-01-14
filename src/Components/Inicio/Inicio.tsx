import { useEffect, useState } from "react";
import { productoRepo } from "../../Api/Repositorios";
import type { ProductoDTO } from "../../Models/ProductoDTO";
import { 
  Box, Typography, Card, CardContent, CardMedia, Chip, Paper, Divider 
} from "@mui/material";

import Grid from "@mui/material/Grid"; 
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';

export const Inicio = () => {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);

  useEffect(() => {
    productoRepo.obtenerTodos()
      .then(data => setProductos(data.slice(0, 8))) 
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 4, 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', letterSpacing: -1 }}>
          AutoRepuestos 
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 300 }}>
          Panel de Control e Inventario en Tiempo Real
        </Typography>
      </Paper>

      <Box sx={{ px: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <BuildIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Repuestos en Stock
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />

        {/* Usamos Grid2 con la propiedad 'container' y 'spacing' */}
        <Grid container spacing={3}>
          {productos.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
              <Card 
                sx={{ 
                  borderRadius: 4, 
                  transition: '0.3s', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)' 
                  } 
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image="https://www.shutterstock.com/image-illustration/car-parts-auto-spare-isolated-260nw-2523577955.jpg"
                  alt={p.nombre}
                  sx={{ bgcolor: '#f5f5f5', p: 1 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    REF: #{p.id.toString().slice(-5)}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, lineHeight: 1.2 }}>
                    {p.nombre}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      ${p.precio.toLocaleString()}
                    </Typography>
                    
                    <Chip 
                      icon={<InventoryIcon sx={{ fontSize: '16px !important' }} />}
                      label={p.stock}
                      color={p.stock > 10 ? "success" : p.stock > 0 ? "warning" : "error"}
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};