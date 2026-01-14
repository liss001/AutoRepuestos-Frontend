import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ventaRepo } from "../../Api/Repositorios";
import { 
  Box, Typography, Paper, Table, TableHead, TableRow, 
  TableCell, TableBody, Button, TableContainer, CircularProgress 
} from "@mui/material";

// IMPORTACIÓN CORRECTA DE ICONOS
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const ListarVentaItems = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      ventaRepo.obtenerPorId(id)
        .then((v: any) => {
          setItems(v.ventaItems || []);
        })
        .catch(err => console.error("Error:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 1 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate("/ventas")} 
        sx={{ mb: 3 }}
      >
        Volver al Historial
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <ReceiptIcon color="primary" fontSize="large" />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Detalle de Productos Vendidos
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID de Transacción: {id}
            </Typography>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#fafafa" }}>
              <TableRow>
                <TableCell><strong>ID Producto</strong></TableCell>
                <TableCell align="center"><strong>Cantidad</strong></TableCell>
                <TableCell align="right"><strong>Precio Unitario</strong></TableCell>
                <TableCell align="right"><strong>Subtotal</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{item.productoId}</TableCell>
                    <TableCell align="center">{item.cantidad}</TableCell>
                    <TableCell align="right">${item.precioUnitario.toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${(item.cantidad * item.precioUnitario).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No se encontraron productos en esta venta.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
            <Typography variant="subtitle1">
              Total de la Operación: 
              <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.2rem', color: '#1976d2' }}>
                ${items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0).toFixed(2)}
              </span>
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};