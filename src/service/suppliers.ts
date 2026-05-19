import { api } from "@/api";
import type { supplierSchemaTDO, updateSupplierTDO } from "@/schemas/supplier";
import type {GetParams, Supplier } from "@/types/typesApi";
import type { AxiosResponse } from "axios";

class SupplierService {
  private api
  private route: string

  constructor() {
     this.api = api
     this.route = "/suppliers" 
  }
  
async getAll(params?: GetParams): Promise<Supplier[]> {
  const response = await this.api.get<Supplier[]>(this.route, {
  params
  })
  return response.data
}

create(data: supplierSchemaTDO): Promise<AxiosResponse<Supplier>> {
    return this.api.post<Supplier>(this.route, data)
  }

async update(id: string, data: updateSupplierTDO): Promise<Supplier> {
    const response = await this.api.put<Supplier>(`${this.route}/${id}`, data)
    return response.data
  }

async patch(id: string, data: updateSupplierTDO): Promise<Supplier> {
    const response = await this.api.put<Supplier>(`${this.route}/${id}`, data)
    return response.data
  }

}


export const supplierService = new SupplierService()