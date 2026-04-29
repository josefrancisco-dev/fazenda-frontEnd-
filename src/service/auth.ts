import { api } from "@/api"
import type { LoginDTO } from "@/schemas/auth"
import type { Client, Login } from "@/types/typesApi"

class ClientService {
  // private api
  // private route: string

  // constructor() {
  //   this.api = api
  //   this.route = "/auth/login"
  // }

  async create(data: LoginDTO): Promise<Login> {
    const response = await api.post<Login>("/auth/login", data)
    return response.data
  }

  async getMe(): Promise<Client> {
    const response = await api.get<Client>("/auth/me")
    return response.data
  }

 async validate(): Promise<Client> {
    const response = await api.get<Client>('/auth/validate')
    return response.data
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