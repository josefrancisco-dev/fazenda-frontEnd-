import { api } from "@/api"
import type { LoginDTO } from "@/schemas/auth"
import type { Client, Login } from "@/types/typesApi"

interface ApiResponse {
  client: Client
}

class ClientService {
  async create(data: LoginDTO): Promise<Login> {
    const response = await api.post<Login>("/auth/login", data)
    return response.data
  }

  async getMe(): Promise<Client> {
    const response = await api.get<Client>("/auth/me")
    return response.data
  }

  async validate(): Promise<Client> {
    const response = await api.get<ApiResponse>("/auth/me")
    return response.data.client 
  }

  async logout(token: string) {
    return api.get('/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export const loginService = new ClientService()