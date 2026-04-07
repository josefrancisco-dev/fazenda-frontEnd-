export interface Client {
  id: string
  name: string
  role: string
  status: 'Customer' | 'Lead' | 'Active'
  date: string
  company: string
  email: string
  phone: string
  nif:  string
  avatar?: string
}


export interface Product {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  stock: 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo'
  stockrs : Stock [] 
  banner: string
  emoji: string
  image?:  string
}

// interface certa
export interface Product {
  id:       string
  name:     string
  category: string
  quantity: number   
  unit:     string
  price:    number   
  banner:   string
  emoji:    string
  image?:   string
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

// export interface Stock {
//   id: string
//   product: string
//   categoty: string
//   unit: string
//   quantity: number
//   prece_unit: number
//   total: number
//   status: boolean
//   stock: 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo'
// }

export interface Supplier {
  id: string
  name: string
  role: string
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
  status:   boolean
  clientId: string
  // client?:  Client
  client : string
  items:    OrderItem[]
}

export interface OrderItem {
  id:        string
  quantity:  number
  price:     number   
  productId: string
  product?:  Product
  orderId:   string
}