import { api } from "@/api"
import type { StockTDO } from "@/schemas/stock"
import type { Stock } from "@/types/typesApi"
import type { AxiosResponse } from "axios"



class StockService {

    private api
    private route: string
  
    constructor() {
       this.api = api
       this.route = "/stock" 
    }

    async getAll(): Promise<Stock[]> {
      const response = await this.api.get<Stock[]>(this.route)
      return response.data
    }
    
    create(data: StockTDO): Promise<AxiosResponse<Stock>> {
        return this.api.post<Stock>(this.route, data)
      }
    
    update(id: string, data: StockTDO): Promise<AxiosResponse<Stock>> {
        return this.api.put<Stock>(`${this.route}/${id}`, data)
      }
}

export const stockService = new StockService()
