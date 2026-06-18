import type { OrderStatus } from '@/constants/orders';
import { StyleSheet } from '@react-pdf/renderer';

export const brand = {
  primary:    '#c5d93e', 
  dark:       '#1e293b', 
  darkMid:    '#334155', 
  light:      '#f8fafc', 
  muted:      '#94a3b8', 
  border:     '#e2e8f0', 
  white:      '#ffffff',
  green:      '#22c55e',
  greenBg:    '#f0fdf4',
  greenText:  '#15803d',
  yellow:     '#eab308',
  yellowBg:   '#fefce8',
  yellowText: '#854d0e',
  red:        '#ef4444',
  redBg:      '#fef2f2',
  redText:    '#b91c1c',
}

export const globals = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Helvetica',
        lineHeight: 1.5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    outflowCard: {
        marginBottom: 30,
        border: '1px solid #e0e0e0',
        borderRadius: 6,
        padding: 15,
        backgroundColor: '#fafafa',
    },
    headerSection: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottom: '1px dashed #ccc',
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    headerLabel: {
        width: '30%',
        fontWeight: 'bold',
        color: '#555',
    },
    headerValue: {
        width: '70%',
        color: '#333',
    },
    table: {
        width: '100%',
        border: '1px solid #e0e0e0',
        marginTop: 10,
        borderRadius: 4,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px dashed #e0e0e0',
        backgroundColor: '#fff',
    },
    tableRowLast: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    tableCell: {
        padding: 10,
        borderRight: '1px dashed #e0e0e0',
    },
    tableCellLast: {
        padding: 10,
    },
    colCode: {
        width: '25%',
    },
    colName: {
        width: '55%',
    },
    colQty: {
        width: '20%',
        textAlign: 'right',
    },
    summaryRow: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
    },
    summaryLabel: {
        fontWeight: 'bold',
        paddingRight: 10,
        color: '#555',
    },
    summaryValue: {
        fontWeight: 'bold',
        color: '#333',
    },
    pageNumber: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#888',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
        borderBottom: '2px solid #eee',
        paddingBottom: 5,
    },
    description: {
        fontSize: 12,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export const S = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: brand.white,
  },

  // Título
  titleSection: {
    textAlign: 'center',
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  titleAccent: {
    width: 4,
    height: 18,
    backgroundColor: brand.primary,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: brand.dark,
  },
  subtitle: {
    fontSize: 9,
    color: brand.muted,
    textAlign: 'center',
  },

  // Cards de sumário
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  card: {
    flex: 1,
    borderRadius: 6,
    padding: 12,
    backgroundColor: brand.light,
    borderTop: `3px solid ${brand.primary}`,
  },
  cardGreen: {
    flex: 1,
    borderRadius: 6,
    padding: 12,
    backgroundColor: brand.greenBg,
    borderTop: `3px solid ${brand.green}`,
  },
  cardRed: {
    flex: 1,
    borderRadius: 6,
    padding: 12,
    backgroundColor: brand.redBg,
    borderTop: `3px solid ${brand.red}`,
  },
  cardLabel: {
    fontSize: 7,
    color: brand.muted,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: brand.dark,
  },
  cardSub: {
    fontSize: 7,
    color: brand.muted,
    marginTop: 3,
  },

  // Tabela
  table: {
    width: '100%',
    border: `1px solid ${brand.border}`,
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: brand.dark,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  tableHeaderAccent: {
    flexDirection: 'row',
    backgroundColor: brand.dark,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderTop: `2px solid ${brand.primary}`,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: brand.muted,
    paddingHorizontal: 8,
    textTransform: 'uppercase',
  },
  tableRowEven: {
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 4,
    backgroundColor: brand.white,
    borderBottom: `1px solid ${brand.border}`,
  },
  tableRowOdd: {
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 4,
    backgroundColor: brand.light,
    borderBottom: `1px solid ${brand.border}`,
  },
  cell: {
    fontSize: 9,
    color: '#475569',
    paddingHorizontal: 8,
  },
  cellBold: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: brand.dark,
    paddingHorizontal: 8,
  },
  cellMuted: {
    fontSize: 9,
    color: brand.muted,
    paddingHorizontal: 8,
  },
  cellAccent: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#475569',
    paddingHorizontal: 8,
  },

  // Badges
  badge: {
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Linha de total
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: brand.dark,
    borderTop: `1px solid ${brand.darkMid}`,
  },
  totalLabel: {
    fontSize: 9,
    color: brand.muted,
    marginRight: 8,
  },
  totalValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: brand.primary,
  },

  // Rodapé
  footer: {
    marginTop: 24,
    paddingTop: 10,
    borderTop: `1px solid ${brand.border}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: brand.primary,
  },
  footerNote: {
    fontSize: 8,
    color: brand.muted,
  },
  pageNumber: {
    fontSize: 8,
    color: brand.muted,
  },
})


export const statusConfig: Record<
  OrderStatus,
  {
    bg: string
    text: string
    label: string
  }
> = {
  Pendente: {
    bg: brand.yellowBg,
    text: brand.yellowText,
    label: "Pendente",
  },

  Confirmado: {
    bg: "#dbeafe",
    text: "#1d4ed8",
    label: "Confirmado",
  },

  Em_processamento: {
    bg: "#f3e8ff",
    text: "#7e22ce",
    label: "Em processamento",
  },

  Enviado: {
    bg: "#ffedd5",
    text: "#ea580c",
    label: "Enviado",
  },

  Entregue: {
    bg: brand.greenBg,
    text: brand.greenText,
    label: "Entregue",
  },
}