import { api } from "@/api";
import type { ProductTDO, updateProductTDO } from "@/schemas/product";
import type { GetParams, Product } from "@/types/typesApi";
import type { AxiosResponse } from "axios";

class ProductService {
  private api
  private route: string

  constructor() {
    this.api = api
    this.route = "/products"
  }

  async getAll(params?: GetParams): Promise<Product[]>{
  
  const response = await this.api.get<Product[]>(this.route, {params})

  const products = await Promise.all(
    response.data.map(async (product) => {
      if (!product.image) return product
      try {
        const imgResponse = await this.api.get(product.image, { 
          responseType: "blob",
          baseURL: import.meta.env.VITE_APP_URL
        })
        const blobUrl = URL.createObjectURL(imgResponse.data)
        return { ...product, image: blobUrl }
      } catch {
        return product
      }
    })
  )

  return products
}

  create(data: ProductTDO): Promise<AxiosResponse<Product>> {
    const formData = new FormData()
    formData.append("name",     data.name)
    formData.append("category", data.category)
    formData.append("unit", data.unit)
    formData.append("price",    String(data.price))
    formData.append("banner",   data.banner)
    formData.append("emoji",    data.emoji)
    if (data.image) formData.append("image", data.image) 

    return this.api.post<Product>(this.route, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  }

  update(id: string, data: updateProductTDO): Promise<AxiosResponse<Product>> {
    const formData = new FormData()
    if (data.name)     formData.append("name",     data.name)
    if (data.category) formData.append("category", data.category)
    if (data.unit) formData.append("unit", data.unit)
    if (data.price)    formData.append("price",    String(data.price))
    if (data.banner)   formData.append("banner",   data.banner)
    if (data.emoji)    formData.append("emoji",    data.emoji)
    if (data.image)    formData.append("image",    data.image)

    return this.api.put<Product>(`${this.route}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  }
}

export const productService = new ProductService()