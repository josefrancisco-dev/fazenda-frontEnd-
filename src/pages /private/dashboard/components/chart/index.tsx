"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useDashboardChart } from "@/quereis/useDashboard"

const chartConfig = {
  desktop: {
    label: "Receita",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface SalesChartProps {
  className?: string
}

export function SalesChart({ className }: SalesChartProps) {
  const { data: chartData, isLoading } = useDashboardChart()

  const formattedData = chartData?.map(item => ({
    month: new Date(item.mes + "-01")
    .toLocaleString("pt-PT", { month: "long" }),
    desktop: item.total,
  })) ?? []

  const trending = (() => {
    if (!formattedData || formattedData.length < 2) return null
    const last   = formattedData[formattedData.length - 1].desktop
    const before = formattedData[formattedData.length - 2].desktop
    return before > 0 ? (((last - before) / before) * 100).toFixed(1) : null
  })()

  const isPositive = trending !== null && Number(trending) >= 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Receita por Mês</CardTitle>
        <CardDescription>
          {formattedData.length > 0
            ? `${formattedData[0]?.month} - ${formattedData[formattedData.length - 1]?.month}`
            : "Carregando..."
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="max-h-[250px] h-[250px] flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-slate-100 rounded" />
          </div>
        ) : formattedData.length === 0 ? (
          <div className="max-h-[250px] h-[250px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Nenhum dado disponível</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
            <BarChart
              accessibilityLayer
              data={formattedData}
              barSize={60}
              barCategoryGap="5%"
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#f59e0b" stopOpacity={1}   />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="url(#barGradient)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trending && (
          <div className="flex gap-2 leading-none font-medium">
            Trending {isPositive ? "up" : "down"} by {Math.abs(Number(trending))}% this month
            {isPositive
              ? <TrendingUp   className="h-4 w-4 text-green-500" />
              : <TrendingDown className="h-4 w-4 text-red-500"   />
            }
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Receita total dos últimos meses
        </div>
      </CardFooter>
    </Card>
  )
}