import { Repository } from "./Repository";
import type { ClienteDTO } from "../Models/ClienteDTO";
import type { ProductoDTO } from "../Models/ProductoDTO";
import type { VentaDTO } from "../Models/VentaDTO";
import type { VentaItemDTO } from "../Models/VentaItemDTO";

export const clienteRepo = new Repository<ClienteDTO>("/Cliente");
export const productoRepo = new Repository<ProductoDTO>("/Producto");
export const ventaRepo = new Repository<VentaDTO>("/Venta");
// AÑADE ESTA LÍNEA:
export const ventaItemRepo = new Repository<VentaItemDTO>("/VentaItem");