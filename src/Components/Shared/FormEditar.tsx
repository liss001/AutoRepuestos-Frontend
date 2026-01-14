/*import { useEffect, useState } from "react";
import { Repository } from "../../Api/Repository";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormEditarProps<T extends { id: number | string }> {
  repo: Repository<T>;
  id: string;
  campos: Array<keyof T>;
  titulo: string;
  onSuccess?: () => void;
}

export const FormEditar = <T extends { id: number | string }>({
  repo,
  id,
  campos,
  titulo,
  onSuccess,
}: FormEditarProps<T>) => {
  const [item, setItem] = useState<T | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  useEffect(() => {
    repo.obtenerPorId(id).then(setItem);
  }, [id]);

  const handleChange = (field: keyof T, value: any) => {
    if (!item) return;
    setItem({ ...item, [field]: value });
  };

  const handleSubmit = async () => {
    if (!item) return;
    try {
      await repo.actualizar(item.id, item);
      setSnackbarMessage(`${titulo} actualizado correctamente`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      if (onSuccess) onSuccess();
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      setSnackbarMessage(`Error al actualizar ${titulo}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (!item) return <Typography>Cargando...</Typography>;

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Editar {titulo}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {campos.map((campo) => (
          <TextField
            key={campo as string}
            label={campo as string}
            value={item[campo] as any}
            onChange={(e) => handleChange(campo, e.target.value)}
          />
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
*/