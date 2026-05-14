
import { Document, Page, Text, View} from '@react-pdf/renderer';
import { HeaderReport } from '@/app/layout /pdf/header';
import { brand, S } from '@/app/layout /pdf';
import type { Supplier } from '@/types/typesApi';


type StockItemProps = {
  id: string;
  status: 'Customer' | 'Lead' | 'Active'
};

type Props = {
  data: Supplier[];
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

export function PrintStockDetails({ data: supplier }: Props) {
  // const totalItems = supplier.length
  // const totalValue = supplier.reduce((acc, s) => acc + (s.value_Total ?? 0), 0)
  // const lowStock   = supplier.filter(s => s.status === 'Estoque_Baixo').length
  // const inStock    = supplier.filter(s => s.status === 'Em_Estoque').length

  return (
    <Document>
      <Page size="A4" style={S.page}>

        <HeaderReport />

        <View style={S.titleSection}>
          <View style={S.titleWrapper}>
            <View style={S.titleAccent} />
            <Text style={S.title}>Relatório de Fornecedores</Text>
          </View>
          <Text style={S.subtitle}>Controlo detalhado dos Fornecedores</Text>
        </View>

        <View style={S.table}>

          <View style={S.tableHeaderAccent}>
            <Text style={[S.tableHeaderCell, { width: '22%' }]}>Empresa</Text>
            <Text style={[S.tableHeaderCell, { width: '18%' }]}>Presentante</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Telefone</Text>
            <Text style={[S.tableHeaderCell, { width: '27%' }]}>Estado</Text>
            <Text style={[S.tableHeaderCell, { width: '28%' }]}>Data de Cadastro</Text>
          </View>

          {supplier.map((supplier, index) => (
            <View key={supplier.id} style={index % 2 === 0 ? S.tableRowEven : S.tableRowOdd}>
              <Text style={[S.cellBold, { width: '22%' }]}>
                {supplier.company ?? 'N/A'}
              </Text>
              <Text style={[S.cellMuted, { width: '18%' }]}>
                {supplier.name ?? 'N/A'}
              </Text>
              <Text style={[S.cell, { width: '15%' }]}>
                {supplier.phone ?? 'N/A'} 
              </Text>
              <View style={{ width: '27%', paddingHorizontal: 8 }}>
                <StatusBadge status={supplier.status ?? 'N/A'} />
              </View>
              <Text style={[S.cell, { width: '28%' }]}>
                {supplier.date ?? "N/A"}
              </Text>
            </View>
          ))}

          {/* <View style={S.totalRow}>
            <Text style={S.totalLabel}>VALOR TOTAL DO ESTOQUE</Text>
            <Text style={S.totalValue}>AO {totalValue.toFixed(2)}</Text>
          </View> */}

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