import { useState } from "react";
import { productoRepo } from "../../Api/Repositorios";
import type { ProductoDTO } from "../../Models/ProductoDTO";

export const ListarProductoPorId = () => {
  const [producto, setProducto] = useState<ProductoDTO | null>(null);
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const buscarProducto = async () => {
    try {
      const data = await productoRepo.obtenerPorId(id);
      setProducto(data);
      setError("");
    } catch (err) {
      console.error(err);
      setProducto(null);
      setError("Producto no encontrado");
    }
  };

  return (
    <div>
      <h2>Buscar Producto por ID</h2>
      <input
        type="text"
        placeholder="Ingrese ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={buscarProducto}>Buscar</button>

      {error && <p>{error}</p>}

      {producto && (
        <div>
          <p>Nombre: {producto.nombre}</p>
          <p>Precio: {producto.precio}</p>
          <p>Stock: {producto.stock}</p>
        </div>
      )}
    </div>
  );
};
