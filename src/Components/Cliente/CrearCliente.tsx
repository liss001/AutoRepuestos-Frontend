import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clienteRepo } from "../../Api/Repositorios";
import type { ClienteDTO } from "../../Models/ClienteDTO";
import { 
  Box, TextField, Button, Typography, Paper, Grid as Grid, Alert 
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const CrearCliente = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<ClienteDTO>>({
    nombre: "",
    telefono: "",
    correoElectronico: "",
    direccion: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clienteRepo.crear(formData as ClienteDTO);
      navigate("/clientes");
    } catch (err) {
      setError("No se pudo registrar el cliente. Intente de nuevo.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 2 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate("/clientes")}
        sx={{ mb: 2 }}
      >
        Volver a la lista
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
          Registrar Nuevo Cliente
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nombre Completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="correoElectronico"
                type="email"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                multiline
                rows={2}
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button 
                fullWidth 
                type="submit" 
                variant="contained" 
                size="large"
                startIcon={<SaveIcon />}
              >
                Guardar Cliente
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};