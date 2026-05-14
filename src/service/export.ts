
import { api } from "@/api"
import type { Client, Orders, Product, Shopping, Stock, Supplier } from "@/types/typesApi"

class PrintService {
    async getStockPrint(): Promise<Stock[]> {
      const response = await api.get<Stock[]>("/stock/print")
      return response.data
    }

    async getSupplierPrint(): Promise<Supplier[]> {
      const response = await api.get<Supplier[]>("/suppliers/print")
      return response.data
    }

    async getClientsPrint(): Promise<Client[]> {
      const response = await api.get<Client[]>("/clients/print")
      return response.data
    }

    async getProductPrint(): Promise<Product[]> {
      const response = await api.get<Product[]>("/products/print")
      return response.data
    }

      async getOrdersPrint(): Promise<Orders[]> {
      const response = await api.get<Orders[]>("/orders/print")
      return response.data
    }

    async getShoppingPrint(): Promise<Shopping[]> {
      const response = await api.get<Shopping[]>("/shopping/print")
      return response.data
    }
}

export const printService = new PrintService()