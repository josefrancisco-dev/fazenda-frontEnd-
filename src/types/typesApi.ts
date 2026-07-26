import type { OrderStatus } from "@/constants/orders"

export type Role    = 'Client' | 'Commercial_Manager' | 'Admin'
export type StatuStocks = 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo'

export interface Category {
  id: string
  name: string
  description?: string | null
  createdAt: string
}

export interface Login {
  email:  string 
  password:  string
  token: string
}

export interface Client {
  id: string
  name: string
  role:  Role
  status: 'Customer' | 'Lead' | 'Active'
  date: string
  isCorporative: string
  email: string
  phone: string
  nif:  string 
  password : string
  avatar?: string
}

export interface Product {
  id:       string
  name:     string
  category: Category
  quantity: number   
  unit:     string
  price:    number   
  banner:   string
  emoji:    string
  image?:   string
  stock: 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo'
  stocks:      Stock[]
  orderItems:  OrderItem[]
}

export interface ShoppingItem {
  id:       string
  name:     string
  quantity: number
  price:    number
}

export interface Shopping {
  id:      string
  number:  number
  supplier: {                
    id:      string
    name:    string
    company: string
  }
  items:   ShoppingItem[]
  total:   number
  status:  boolean
}

export interface Supplier {
  id: string
  name: string
  role:  'Client'| 'Supplier' | 'Admin'
  status: 'Customer' | 'Lead' | 'Active'
  date: string
  company: string
  email: string
  nif: string
  phone: string
  avatar?: string
}

export interface Stock {
  id:          string
  quantity:    number      
  value_Total: number      
  status:      'Em_Estoque' | 'Estoque_Medio' | 'Estoque_Baixo'
  productId:   string
  product?:    Product
}

export interface Orders {
  id:       string
  number:   number
  date:     string
  total:    number
  status:   OrderStatus
  clientId: string
  client:  Client
  items:    OrderItem[]
}

export interface OrderItem {
  id:        string
  quantity:  number
  price:     number   
  productId: string
  product:  Product
  orderId:   string
}

export type AuthToken = {
  token: string;
};


export interface GetParams {
  q?: string; 
  status?: OrderStatus;
  from?: string;
  to?: string;
}
