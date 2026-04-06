import { api } from "@/api"
import type { clientSchemaTDO, updateClientTDO } from "@/schemas/client"
import type { Client } from "@/types/typesApi"

class ClientService {
  private api
  private route: string

  constructor() {
    this.api = api
    this.route = "/clients"
  }

  async getAll(): Promise<Client[]> {
    const response = await this.api.get<Client[]>(this.route)
    return response.data
  }

  async create(data: clientSchemaTDO): Promise<Client> {
    const response = await this.api.post<Client>(this.route, data)
    return response.data
  }

  async update(id: string, data: updateClientTDO): Promise<Client> {
    const response = await this.api.put<Client>(`${this.route}/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`${this.route}/${id}`)
  }
}

export const clientService = new ClientService()