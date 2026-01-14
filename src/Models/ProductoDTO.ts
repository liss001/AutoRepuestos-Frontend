export interface ProductoDTO {
  id: string;
  nombre: string;
  precio: number; // En TS usamos number para decimal/int
  stock: number;
}