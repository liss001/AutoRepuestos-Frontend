import { useEffect, useState } from "react";
import { ventaRepo } from "../../Api/Repositorios";
import type { VentaDTO } from "../../Models/VentaDTO";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Button, Box, CircularProgress 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// IMPORTACIÓN CORRECTA DE ICONOS
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ListarVentas = () => {
  const [ventas, setVentas] = useState<VentaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    ventaRepo.obtenerTodos()
      .then(setVentas)
      .catch(err => console.error("Error al cargar ventas", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Historial de Ventas</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => navigate("/ventas/crear")}
        >
          Nueva Venta
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>ID Cliente</strong></TableCell>
              <TableCell align="right"><strong>Total</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.length > 0 ? (
              ventas.map((v) => (
                <TableRow key={v.id} hover>
                  <TableCell>{new Date(v.fecha).toLocaleString()}</TableCell>
                  <TableCell>{v.clienteId}</TableCell>
                  <TableCell align="right"><strong>${v.total.toFixed(2)}</strong></TableCell>
                  <TableCell align="center">
                    <Button 
                      size="small" 
                      variant="outlined"
                      startIcon={<VisibilityIcon />} 
                      onClick={() => navigate(`/ventas/${v.id}/items`)}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No hay ventas registradas.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};