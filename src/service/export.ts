
import { api } from "@/api"
import type { Stock } from "@/types/typesApi"

class PrintService {
     async getStockPrint(): Promise<Stock[]> {
        const response = await api.get<Stock[]>("/stock/print")
        return response.data
      }
}

export const printService = new PrintService()