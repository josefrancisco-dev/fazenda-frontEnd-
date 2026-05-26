import { api } from "@/api"
import type { CreateCategoryDTO, UpdateCategoryDTO } from "@/schemas/category"
import type { Category, GetParams } from "@/types/typesApi"


export class CategoryService {

   async getAll(params?:GetParams) : Promise<Category[]>{
    const response = await api.get<Category[]>("/categories", {
      params
    })
    
    return response.data
  }

   async getById(id: string) : Promise<Category> {
    const response = await api.get<Category>(`/categories/${id}`)
    return response.data
  }

   async create(data: CreateCategoryDTO) :  Promise<Category>  {
    const response = await api.post<Category>("/categories", data)
    return response.data
  }

   async update(id: string, data: UpdateCategoryDTO) :  Promise<Category> {
    const response = await api.put<Category>(`/categories/${id}`, data)
    return response.data
  }

   async patch(id: string, data: UpdateCategoryDTO) :  Promise<Category> {
    const response = await api.patch<Category>(`/categories/${id}`, data)
    return response.data
  }

  async delete(id: string) {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  }
}

export const categoryService = new CategoryService()