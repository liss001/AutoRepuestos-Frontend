import { useEffect, useState } from "react";
import { clienteRepo } from "../../Api/Repositorios";
import type { ClienteDTO } from "../../Models/ClienteDTO";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Button, Box, CircularProgress, Alert 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const ListarClientes = () => {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const data = await clienteRepo.obtenerTodos();
      setClientes(data);
    } catch (err) {
      setError("Error al conectar con el servidor de clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Clientes
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/clientes/crear")}
        >
          Nuevo Cliente
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          {/* CAMBIO AQUÍ: Fondo azul para la cabecera */}
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Correo Electrónico</TableCell>
              <TableCell sx={{ color: "white", fontWeight: 'bold' }}>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.length > 0 ? (
              clientes.map((c) => (
                <TableRow key={c.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{c.nombre}</TableCell>
                  <TableCell>{c.telefono}</TableCell>
                  <TableCell>{c.correoElectronico}</TableCell>
                  <TableCell>{c.direccion}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  No hay clientes registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};