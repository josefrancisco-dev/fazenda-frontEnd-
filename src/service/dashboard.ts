import { api } from "@/api"

export interface DashboardOverview {
  receita_total: number
  total_pedidos: number
  total_compras: number
  estoque_baixo: number
  atividades: {
    tipo:      string
    descricao: string
    data:      string
  }[]
}

export interface ChartData {
  mes:   string
  total: number
}

class DashboardService {
  private api
  private route: string

  constructor() {
    this.api  = api
    this.route = "/dashboard"
  }

  async getOverview(): Promise<DashboardOverview> {
    const response = await this.api.get<DashboardOverview>(this.route)
    return response.data
  }

  async getChart(): Promise<ChartData[]> {
    const response = await this.api.get<ChartData[]>(`${this.route}/chart`)
    return response.data
  }
}

export const dashboardService = new DashboardService()