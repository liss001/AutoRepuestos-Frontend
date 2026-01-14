import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productoRepo } from "../../Api/Repositorios";
import type { ProductoDTO } from "../../Models/ProductoDTO";
import { 
  Box, TextField, Button, Typography, Paper, Grid, Alert 
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const CrearProducto = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<ProductoDTO>>({
    nombre: "",
    precio: 0,
    stock: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "nombre" ? value : Number(value) 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((formData.precio ?? 0) <= 0) {
        setError("El precio debe ser mayor a 0");
        return;
    }

    try {
      await productoRepo.crear(formData as ProductoDTO);
      navigate("/productos");
    } catch (err: any) {
      setError("Error al registrar el producto. Intente de nuevo.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate("/productos")}
        sx={{ mb: 2 }}
      >
        Volver al Inventario
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Registrar Nuevo Repuesto
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nombre del Producto"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej. Pastillas de freno Delanteras"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Precio de Venta"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleChange}
                required
                slotProps={{ htmlInput: { step: "0.01", min: "0" } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Stock Inicial"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                slotProps={{ htmlInput: { min: "0" } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button 
                fullWidth 
                type="submit" 
                variant="contained" 
                size="large"
                startIcon={<SaveIcon />}
                color="primary"
              >
                Guardar Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};