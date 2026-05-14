
import { Document, Page, Text, View} from '@react-pdf/renderer';
import { HeaderReport } from '@/app/layout /pdf/header';
import { brand, S } from '@/app/layout /pdf';


type StockItem = {
  id: string;
  quantity: number;
  value_Total: number;
  status: 'Em_Estoque' | 'Estoque_Medio' | 'Estoque_Baixo';
  product?: {
    name: string;
    category: string;
    unit: string;
    price: number;
  };
};

type Props = {
  data: StockItem[];
};


const statusConfig = {
  Em_Estoque:    { bg: brand.greenBg,  text: brand.greenText,  label: 'Em Estoque' },
  Estoque_Medio: { bg: brand.yellowBg, text: brand.yellowText, label: 'Médio'      },
  Estoque_Baixo: { bg: brand.redBg,    text: brand.redText,    label: 'Baixo'      },
}

function StatusBadge({ status }: { status: StockItem['status'] }) {
  const config = statusConfig[status] ?? statusConfig['Estoque_Baixo']
  return (
    <View style={[S.badge, { backgroundColor: config.bg }]}>
      <Text style={[S.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  )
}

export function PrintStockDetails({ data: stocks }: Props) {
  const totalItems = stocks.length
  const totalValue = stocks.reduce((acc, s) => acc + (s.value_Total ?? 0), 0)
  const lowStock   = stocks.filter(s => s.status === 'Estoque_Baixo').length
  const inStock    = stocks.filter(s => s.status === 'Em_Estoque').length

  return (
    <Document>
      <Page size="A4" style={S.page}>

        <HeaderReport />

        <View style={S.titleSection}>
          <View style={S.titleWrapper}>
            <View style={S.titleAccent} />
            <Text style={S.title}>Relatório de Estoque</Text>
          </View>
          <Text style={S.subtitle}>Controlo detalhado dos produtos em estoque</Text>
        </View>

        <View style={S.summaryRow}>
          <View style={S.card}>
            <Text style={S.cardLabel}>Total de Itens</Text>
            <Text style={S.cardValue}>{totalItems}</Text>
            <Text style={S.cardSub}>{inStock} em stock</Text>
          </View>
          <View style={S.cardGreen}>
            <Text style={S.cardLabel}>Valor Total</Text>
            <Text style={S.cardValue}>AO {totalValue.toFixed(2)}</Text>
            <Text style={S.cardSub}>valor acumulado</Text>
          </View>
          <View style={S.cardRed}>
            <Text style={S.cardLabel}>Estoque Baixo</Text>
            <Text style={S.cardValue}>{lowStock}</Text>
            <Text style={S.cardSub}>requer atenção</Text>
          </View>
        </View>

        <View style={S.table}>

          <View style={S.tableHeaderAccent}>
            <Text style={[S.tableHeaderCell, { width: '22%' }]}>Produto</Text>
            <Text style={[S.tableHeaderCell, { width: '18%' }]}>Categoria</Text>
            <Text style={[S.tableHeaderCell, { width: '14%' }]}>Quantidade</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Preço Unit.</Text>
            <Text style={[S.tableHeaderCell, { width: '16%' }]}>Valor Total</Text>
            <Text style={[S.tableHeaderCell, { width: '15%' }]}>Status</Text>
          </View>

          {stocks.map((stock, index) => (
            <View key={stock.id} style={index % 2 === 0 ? S.tableRowEven : S.tableRowOdd}>
              <Text style={[S.cellBold, { width: '22%' }]}>
                {stock.product?.name ?? 'N/A'}
              </Text>
              <Text style={[S.cellMuted, { width: '18%' }]}>
                {stock.product?.category ?? 'N/A'}
              </Text>
              <Text style={[S.cell, { width: '14%' }]}>
                {stock.quantity} {stock.product?.unit ?? ''}
              </Text>
              <Text style={[S.cell, { width: '15%' }]}>
                AO {stock.product?.price?.toFixed(2) ?? '0.00'}
              </Text>
              <Text style={[S.cellAccent, { width: '16%' }]}>
                AO {stock.value_Total?.toFixed(2) ?? '0.00'}
              </Text>
              <View style={{ width: '15%', paddingHorizontal: 8 }}>
                <StatusBadge status={stock.status} />
              </View>
            </View>
          ))}

          <View style={S.totalRow}>
            <Text style={S.totalLabel}>VALOR TOTAL DO ESTOQUE</Text>
            <Text style={S.totalValue}>AO {totalValue.toFixed(2)}</Text>
          </View>

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