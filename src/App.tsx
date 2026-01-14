import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";

// IMPORTACIÓN DE COMPONENTES
import { Inicio } from "./Components/Inicio/Inicio"; 
import { ListarClientes } from "./Components/Cliente/ListarClientes";
import { CrearCliente } from "./Components/Cliente/CrearCliente";
import { ListarProductos } from "./Components/Producto/ListarProductos";
import { CrearProducto } from "./Components/Producto/CrearProducto";
import { ListarVentas } from "./Components/Venta/ListarVentas";
import { CrearVenta } from "./Components/Venta/CrearVenta";
import { ListarVentaItems } from "./Components/VentaItem/ListarVentaItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          
          {/* Ruta por defecto: Bienvenida con tarjetas */}
          <Route index element={<Inicio />} />

          {/* Rutas Clientes */}
          <Route path="clientes" element={<ListarClientes />} />
          <Route path="clientes/crear" element={<CrearCliente />} />

          {/* Rutas Productos */}
          <Route path="productos" element={<ListarProductos />} />
          <Route path="productos/crear" element={<CrearProducto />} />

          {/* Rutas Ventas */}
          <Route path="ventas" element={<ListarVentas />} />
          <Route path="ventas/crear" element={<CrearVenta />} />
          <Route path="ventas/:id/items" element={<ListarVentaItems />} />

          {/* Redirección por si el usuario escribe mal la URL */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;