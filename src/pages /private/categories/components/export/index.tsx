
import { Document, Page, Text, View} from '@react-pdf/renderer';
import { HeaderReport } from '@/app/layout /pdf/header';
import { brand, S } from '@/app/layout /pdf';
import type { Product} from '@/types/typesApi';


type StockItemProps = {
  id: string;
  status: 'Em Estoque' | 'Estoque Médio' | 'Estoque Baixo';
};

type Props = {
  data: Product[];
};

const statusConfig = {
  'Em Estoque':    { bg: brand.greenBg,  text: brand.greenText,  label: 'Em Estoque'    },
  'Estoque Médio': { bg: brand.yellowBg, text: brand.yellowText, label: 'Estoque Médio' },
  'Estoque Baixo': { bg: brand.redBg,    text: brand.redText,    label: 'Estoque Baixo' },
}

function StatusBadge({ status }: { status: StockItemProps['status'] }) {
  const config = statusConfig[status] ?? statusConfig['Estoque Baixo']

  return (
    <View style={[S.badge, { backgroundColor: config.bg }]}>
      <Text style={[S.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  )
}

export function PrintStockDetails({ data: product }: Props) {
  return (
    <Document>
      <Page size="A4" style={S.page}>

        <HeaderReport />
 
        <View style={S.titleSection}>
          <View style={S.titleWrapper}>
            <View style={S.titleAccent} />
            <Text style={S.title}>Relatório de Produtos</Text>
          </View>
          <Text style={S.subtitle}>Controlo detalhado de Produtos</Text>
        </View>

        <View style={S.table}>

          <View style={S.tableHeaderAccent}>
            <Text style={[S.tableHeaderCell, { width: '22%' }]}>Produto</Text>
            <Text style={[S.tableHeaderCell, { width: '18%' }]}>Categoria</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Quantidade</Text>
            <Text style={[S.tableHeaderCell, { width: '10%' }]}>Unidade</Text>
            <Text style={[S.tableHeaderCell, { width: '10%' }]}>Preco</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Estado</Text>
          </View>

          {product.map((product, index) => (
            <View key={product.id} style={index % 2 === 0 ? S.tableRowEven : S.tableRowOdd}>
              <Text style={[S.cellBold, { width: '22%' }]}>
                {product.name ?? 'N/A'}
              </Text>
              <Text style={[S.cellMuted, { width: '18%' }]}>
                {product.category ?? 'N/A'}
              </Text>
              <Text style={[S.cell, { width: '15%' }]}>
                {product.quantity ?? 'N/A'} 
              </Text>
              <Text style={[S.cell, { width: '10%' }]}>
                {product.unit ?? 'N/A'} 
              </Text>
               <Text style={[S.cell, { width: '10%' }]}>
                AO {product.price ?? 'N/A'} 
              </Text>
              <View style={{ width: '15%', paddingHorizontal: 8 }}>
                <StatusBadge status={product.stock} />
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