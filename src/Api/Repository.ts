import { httpClient } from "../Services/HttpClient";

export class Repository<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async obtenerTodos(): Promise<T[]> {
    const response = await httpClient.get<T[]>(this.endpoint);
    return response.data;
  }

  async obtenerPorId(id: string): Promise<T> {
    const response = await httpClient.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  // Cambiamos a Promise<T> para recibir el objeto creado (con su ID)
  async crear(item: Partial<T>): Promise<T> {
    const response = await httpClient.post<T>(this.endpoint, item);
    return response.data;
  }

  // Bonus: Añadimos actualizar ya que tus interfaces de C# lo permiten
  async actualizar(id: string, item: T): Promise<void> {
    await httpClient.put(`${this.endpoint}/${id}`, item);
  }
}