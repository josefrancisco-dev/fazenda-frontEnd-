import { api } from "@/api";
import type { orderResponseTDO } from "@/schemas/orders";
import type {Orders} from "@/types/typesApi";
import type { AxiosResponse } from "axios";

class OrdersService {
  private api
  private route: string

  constructor() {
     this.api = api
     this.route = "/orders" 
  }
  
async getAll(): Promise<Orders[]> {
  const response = await this.api.get<Orders[]>(this.route)
  return response.data
}

create(data: orderResponseTDO): Promise<AxiosResponse<Orders>> {
    return this.api.post<Orders>(this.route, data)
  }

update(id: string, data: orderResponseTDO): Promise<AxiosResponse<Orders>> {
    return this.api.put<Orders>(`${this.route}/${id}`, data)
  }
}

export const ordersService = new OrdersService()