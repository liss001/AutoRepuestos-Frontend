import { useState } from "react";
import { clienteRepo } from "../../Api/Repositorios";
import type { ClienteDTO } from "../../Models/ClienteDTO";

export const ListarClientePorId = () => {
  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const buscarCliente = async () => {
    try {
      const data = await clienteRepo.obtenerPorId(id);
      setCliente(data);
      setError("");
    } catch (err) {
      console.error(err);
      setCliente(null);
      setError("Cliente no encontrado");
    }
  };

  return (
    <div>
      <h2>Buscar Cliente por ID</h2>
      <input
        type="text"
        placeholder="Ingrese ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={buscarCliente}>Buscar</button>

      {error && <p>{error}</p>}

      {cliente && (
        <div>
          <p>Nombre: {cliente.nombre}</p>
          <p>Teléfono: {cliente.telefono}</p>
          <p>Correo: {cliente.correoElectronico}</p>
          <p>Dirección: {cliente.direccion}</p>
        </div>
      )}
    </div>
  );
};
