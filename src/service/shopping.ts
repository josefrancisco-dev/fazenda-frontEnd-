import { api } from "@/api";
import type { shoppingTDO, updateShoppingTDO } from "@/schemas/shopping";
import type {Shopping} from "@/types/typesApi";
import type { AxiosResponse } from "axios";

class ShoppingService {
  private api
  private route: string

  constructor() {
     this.api = api
     this.route = "/shopping" 
  }
  
async getAll(): Promise<Shopping[]> {
  const response = await this.api.get<Shopping[]>(this.route)
  return response.data
}

create(data: shoppingTDO): Promise<AxiosResponse<Shopping>> {
    return this.api.post<Shopping>(this.route, data)
  }

update(id: string, data: updateShoppingTDO): Promise<AxiosResponse<Shopping>> {
    return this.api.put<Shopping>(`${this.route}/${id}`, data)
  }
}

export const shoppingService = new ShoppingService()