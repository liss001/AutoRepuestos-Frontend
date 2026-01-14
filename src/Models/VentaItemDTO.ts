export interface VentaItemDTO {
  id?: string; // Opcional al crear, obligatorio al recibir
  productoId: string;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
}