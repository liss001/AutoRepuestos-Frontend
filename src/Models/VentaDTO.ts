import type{ VentaItemDTO } from "./VentaItemDTO";

export interface VentaDTO {
  id: string;
  clienteId: string;
  fecha: string; // Las fechas de .NET llegan como string ISO
  total: number;
  ventaItems: VentaItemDTO[];
}