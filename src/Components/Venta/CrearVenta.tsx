import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ventaRepo, clienteRepo, productoRepo } from "../../Api/Repositorios";
import type { ClienteDTO } from "../../Models/ClienteDTO";
import type { ProductoDTO } from "../../Models/ProductoDTO";
import type { VentaDTO } from "../../Models/VentaDTO";
import { 
  Box, Button, Typography, Paper, Grid as Grid, MenuItem, 
  TextField, Table, TableBody, TableCell, TableRow, TableHead, IconButton
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete'; // Importamos el icono de basura

export const CrearVenta = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [carrito, setCarrito] = useState<any[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoDTO | null>(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    clienteRepo.obtenerTodos().then(setClientes);
    productoRepo.obtenerTodos().then(setProductos);
  }, []);

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;
    
    // Generamos un ID temporal para poder borrarlo fácilmente del carrito
    const nuevoItem = {
      tempId: Date.now(), 
      productoId: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      cantidad: cantidad,
      precioUnitario: productoSeleccionado.precio,
      subTotal: productoSeleccionado.precio * cantidad
    };

    setCarrito([...carrito, nuevoItem]);
    setProductoSeleccionado(null);
    setCantidad(1);
  };

  // --- FUNCIÓN PARA ELIMINAR DEL CARRITO ---
  const eliminarDelCarrito = (tempId: number) => {
    setCarrito(carrito.filter(item => item.tempId !== tempId));
  };

  const calcularTotal = () => carrito.reduce((acc, item) => acc + item.subTotal, 0);

  const finalizarVenta = async () => {
    const nuevaVenta: Partial<VentaDTO> = {
      clienteId: clienteId,
      fecha: new Date().toISOString(),
      total: calcularTotal(),
      // Al enviar al backend, quitamos el tempId
      ventaItems: carrito.map(({ tempId, ...rest }) => rest)
    };

    try {
      await ventaRepo.crear(nuevaVenta as VentaDTO);
      alert("Venta realizada con éxito");
      navigate("/ventas");
    } catch (error) {
      alert("Error al procesar la venta. Verifique el stock.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Nueva Venta de Repuestos</Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">1. Seleccionar Cliente</Typography>
            <TextField
              select
              fullWidth
              label="Cliente"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              sx={{ mt: 2 }}
            >
              {clientes.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
              ))}
            </TextField>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">2. Agregar Productos</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                select
                label="Producto"
                sx={{ flexGrow: 1 }}
                value={productoSeleccionado?.id || ""}
                onChange={(e) => setProductoSeleccionado(productos.find(p => p.id === e.target.value) || null)}
              >
                {productos.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.nombre} (Stock: {p.stock})</MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                label="Cant."
                sx={{ width: 80 }}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
              <Button variant="contained" onClick={agregarAlCarrito} startIcon={<AddShoppingCartIcon />}>
                Añadir
              </Button>
            </Box>

            <Table sx={{ mt: 3 }}>
              <TableHead sx={{ backgroundColor: '#fafafa' }}>
                <TableRow>
                  <TableCell><strong>Producto</strong></TableCell>
                  <TableCell align="center"><strong>Cantidad</strong></TableCell>
                  <TableCell align="right"><strong>Subtotal</strong></TableCell>
                  <TableCell align="center"><strong>Acción</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carrito.map((item) => (
                  <TableRow key={item.tempId} hover>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell align="center">{item.cantidad} x ${item.precioUnitario}</TableCell>
                    <TableCell align="right">${item.subTotal.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => eliminarDelCarrito(item.tempId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {carrito.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={2}><Typography variant="h6">TOTAL</Typography></TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="primary">${calcularTotal().toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Button 
              fullWidth 
              variant="contained" 
              color="success" 
              sx={{ mt: 3 }} 
              disabled={carrito.length === 0 || !clienteId}
              onClick={finalizarVenta}
            >
              Confirmar Venta
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};