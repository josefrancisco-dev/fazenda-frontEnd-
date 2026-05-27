import { api } from "@/api";
import type { orderResponseTDO, updateOrderDTO } from "@/schemas/orders";
import type {GetParams, Orders} from "@/types/typesApi";
import type { AxiosResponse } from "axios";

class OrdersService {
  private api
  private route: string

  constructor() {
     this.api = api
     this.route = "/orders" 
  }
  
async getAll(params?: GetParams): Promise<Orders[]> {
  const response = await this.api.get<Orders[]>(this.route, {
    params
  })
  return response.data
}

async create(data: orderResponseTDO): Promise<AxiosResponse<Orders>> {
    const response =  await this.api.post<Orders>(this.route, data)
    return response 
  }

update(id: string, data: updateOrderDTO): Promise<AxiosResponse<Orders>> {
    return this.api.put<Orders>(`${this.route}/${id}`, data)
  }

patch(id: string, data: Partial<{ status: string }>): Promise<AxiosResponse<Orders>> {
      return this.api.patch<Orders>(`${this.route}/${id}`, data)
  }
}

export const ordersService = new OrdersService()