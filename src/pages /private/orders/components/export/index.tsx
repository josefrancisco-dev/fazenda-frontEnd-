import { Document, Page, Text, View } from '@react-pdf/renderer'
import { HeaderReport } from '@/app/layout /pdf/header'
import { brand, S } from '@/app/layout /pdf'
import type { Orders } from '@/types/typesApi'
import { statusConfig } from '@/constants/statusConfig'
import type { orderStatusSchema } from '@/schemas/orders'
import type z from 'zod'

type Props = {
  data: Orders[]
}

type OrderStatus = z.infer<typeof orderStatusSchema>

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]

  return (
    <View
      style={[
        S.badge,
        {
          backgroundColor:
            status === 'Pendente'
              ? brand.yellowBg
              : status === 'Confirmado'
              ? '#dbeafe'
              : status === 'Em_processamento'
              ? '#f3e8ff'
              : status === 'Enviado'
              ? '#ffedd5'
              : brand.greenBg,
        },
      ]}
    >
      <Text
        style={[
          S.badgeText,
          {
            color:
              status === 'Pendente'
                ? brand.yellowText
                : status === 'Confirmado'
                ? '#1d4ed8'
                : status === 'Em_processamento'
                ? '#7e22ce'
                : status === 'Enviado'
                ? '#c2410c'
                : brand.greenText,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  )
}

export function PrintStockDetails({ data: orders }: Props) {
  return (
    <Document>
      <Page size="A4" style={S.page}>
        <HeaderReport />

        <View style={S.titleSection}>
          <View style={S.titleWrapper}>
            <View style={S.titleAccent} />
            <Text style={S.title}>Relatório de Pedidos</Text>
          </View>

          <Text style={S.subtitle}>
            Controlo detalhado de Pedidos
          </Text>
        </View>

        <View style={S.table}>
          <View style={S.tableHeaderAccent}>
            <Text style={[S.tableHeaderCell, { width: '25%' }]}>
              Cliente
            </Text>

            <Text style={[S.tableHeaderCell, { width: '25%' }]}>
              Itens
            </Text>

            <Text style={[S.tableHeaderCell, { width: '25%' }]}>
              Estado
            </Text>

            <Text style={[S.tableHeaderCell, { width: '25%' }]}>
              Data de Cadastro
            </Text>
          </View>

          {orders.map((order, index) => (
            <View
              key={order.id}
              style={
                index % 2 === 0
                  ? S.tableRowEven
                  : S.tableRowOdd
              }
            >
              <Text style={[S.cellBold, { width: '25%' }]}>
                {order.client.name ?? 'N/A'}
              </Text>

              <Text style={[S.cellMuted, { width: '25%' }]}>
                {order.items.length}
              </Text>

              <View style={{ width: '25%', paddingHorizontal: 8 }}>
                <StatusBadge status={order.status} />
              </View>

              <Text style={[S.cell, { width: '25%' }]}>
                {new Date(order.date).toLocaleDateString('pt-AO')}
              </Text>
            </View>
          ))}
        </View>

        <View style={S.footer}>
          <View style={S.footerLeft}>
            <View style={S.footerDot} />

            <Text style={S.footerNote}>
              Gerado automaticamente em{' '}
              {new Date().toLocaleDateString('pt-AO')} · Girassol
            </Text>
          </View>

          <Text
            style={S.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
            fixed
          />
        </View>
      </Page>
    </Document>
  )
}