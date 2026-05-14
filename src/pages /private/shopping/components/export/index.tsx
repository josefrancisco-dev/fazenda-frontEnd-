
import { Document, Page, Text, View} from '@react-pdf/renderer';
import { HeaderReport } from '@/app/layout /pdf/header';
import { brand, S } from '@/app/layout /pdf';
import type { Shopping } from '@/types/typesApi';


type Props = {
  data: Shopping[];
};


const statusConfig = {
  'true':    { bg: brand.greenBg,  text: brand.greenText,  label: 'Concluído'},
  'false': { bg: brand.redBg,    text: brand.redText,    label: 'Pendente' },
}

function StatusBadge({ status }: { status: boolean }) {
  const key = String(status) as 'true' | 'false'; 
  const config = statusConfig[key] ?? statusConfig['false'];

  return (
    <View style={[S.badge, { backgroundColor: config.bg }]}>
      <Text style={[S.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  )
}


export function PrintStockDetails({ data: shopping }: Props) {

  return (
    <Document>
      <Page size="A4" style={S.page}>

        <HeaderReport />

        <View style={S.titleSection}>
          <View style={S.titleWrapper}>
            <View style={S.titleAccent} />
            <Text style={S.title}>Relatório de Compras</Text>
          </View>
          <Text style={S.subtitle}>Controlo detalhado de compras</Text>
        </View>


        <View style={S.table}>

          <View style={S.tableHeaderAccent}>
            <Text style={[S.tableHeaderCell, { width: '25%' }]}>Fornecedor</Text>
            <Text style={[S.tableHeaderCell, { width: '25%' }]}>Itens</Text>
            <Text style={[S.tableHeaderCell, { width: '25%' }]}>Total</Text>
            <Text style={[S.tableHeaderCell, { width: '25%' }]}>Estado</Text>
          </View>

          {shopping.map((shopping, index) => (
            <View key={shopping.id} style={index % 2 === 0 ? S.tableRowEven : S.tableRowOdd}>
              <Text style={[S.cellBold, { width: '25%' }]}>
                {shopping.supplier?.name ?? 'N/A'}
              </Text>
              <Text style={[S.cellMuted, { width: '25%' }]}>
                {shopping.items.length}
              </Text>
              <Text style={[S.cell, { width: '25%' }]}>
               AO  {shopping.total} 
              </Text>
              <View style={{ width: '25%', paddingHorizontal: 8 }}>
                <StatusBadge status={shopping.status} />
              </View>
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