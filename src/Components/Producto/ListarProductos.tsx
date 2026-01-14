import { useEffect, useState } from "react";
import { productoRepo } from "../../Api/Repositorios";
import type { ProductoDTO } from "../../Models/ProductoDTO";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Button, Box, CircularProgress, Chip, Alert 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';

export const ListarProductos = () => {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productoRepo.obtenerTodos();
      setProductos(data);
    } catch (err) {
      setError("No se pudo conectar con el servidor de productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
          Inventario de Repuestos
        </Typography>
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<AddBoxIcon />}
          onClick={() => navigate("/productos/crear")}
        >
          Nuevo Producto
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f8e9" }}>
            <TableRow>
              <TableCell><strong>Nombre del Repuesto</strong></TableCell>
              <TableCell align="right"><strong>Precio Unitario</strong></TableCell>
              <TableCell align="right"><strong>Stock</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.length > 0 ? (
              productos.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.nombre}</TableCell>
                  <TableCell align="right">${p.precio.toFixed(2)}</TableCell>
                  <TableCell align="right">{p.stock}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={p.stock > 10 ? "Disponible" : p.stock > 0 ? "Bajo Stock" : "Agotado"} 
                      color={p.stock > 10 ? "success" : p.stock > 0 ? "warning" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No hay productos registrados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};