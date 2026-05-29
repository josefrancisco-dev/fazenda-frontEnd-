import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "@/service/dashboard"

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn:  () => dashboardService.getOverview(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useDashboardChart() {
  return useQuery({
    queryKey: ["dashboard-chart"],
    queryFn:  () => dashboardService.getChart(),
    staleTime: 1000 * 60 * 5,
  })
}