
import { Document, Page, Text, View} from '@react-pdf/renderer';
import { HeaderReport } from '@/app/layout /pdf/header';
import { brand, S } from '@/app/layout /pdf';
import type { Client} from '@/types/typesApi';


type StockItemProps = {
  id: string;
  status: 'Customer' | 'Lead' | 'Active'
};

type Props = {
  data: Client[];
};

const statusConfig = {
  Active: { bg: brand.greenBg,  text: brand.greenText,  label: 'Activo' },
  Customer:  { bg: brand.redBg,    text: brand.redText,    label: 'Pendente'},
  Lead:  { bg: brand.redBg,    text: brand.redText,    label: 'Desactivo'},
}

function StatusBadge({ status }: { status: StockItemProps['status'] }) {
  const config = statusConfig[status] ?? statusConfig['Active']

  return (
    <View style={[S.badge, { backgroundColor: config.bg }]}>
      <Text style={[S.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  )
}

export function PrintStockDetails({ data:  clients }: Props) {
  return (
    <Document>
      <Page size="A4" style={S.page}>

        <HeaderReport />

        <View style={S.titleSection}>
          <View style={S.titleWrapper}>
            <View style={S.titleAccent} />
            <Text style={S.title}>Relatório dos Clientes</Text>
          </View>
          <Text style={S.subtitle}>Controlo detalhado dos CLientes</Text>
        </View>

        <View style={S.table}>

          <View style={S.tableHeaderAccent}>
            <Text style={[S.tableHeaderCell, { width: '22%' }]}>Nome</Text>
            <Text style={[S.tableHeaderCell, { width: '18%' }]}>Tipo de usuário</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Telefone</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Emial</Text>
            <Text style={[S.tableHeaderCell, { width: '20%' }]}>Estado</Text>
            <Text style={[S.tableHeaderCell, { width: '20%' }]}>Data de Cadastro</Text>
          </View>

          {clients.map((clients, index) => (
            <View key={clients.id} style={index % 2 === 0 ? S.tableRowEven : S.tableRowOdd}>
              <Text style={[S.cellMuted, { width: '18%' }]}>
                {clients.name ?? 'N/A'} 
              </Text>
              <Text style={[S.cellBold, { width: '22%' }]}>
                {clients.isCorporative ?? 'N/A'}
              </Text>
              <Text style={[S.cell, { width: '15%' }]}>
                {clients.phone ?? 'N/A'} 
              </Text>
              <Text style={[S.cell, { width: '15%' }]}>
                {clients.email ?? 'N/A'} 
              </Text>
              <View style={{ width: '20%', paddingHorizontal: 8 }}>
                <StatusBadge status={clients.status ?? 'N/A'} />
              </View>
              <Text style={[S.cell, { width: '20%' }]}>
                {clients.date ?? "N/A"}
              </Text>
            </View>
          ))}

        </View>

        <View style={S.footer}>
          <View style={S.footerLeft}>
            <View style={S.footerDot} />
            <Text style={S.footerNote}>
              Gerado automaticamente em {new Date().toLocaleDateString('pt-AO')} · Girassol
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