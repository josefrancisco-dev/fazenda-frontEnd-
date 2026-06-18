import { formatDateTime } from '@/lib/data-utils';
import { View, Text, StyleSheet , Image as PdfImage} from '@react-pdf/renderer';
import logo from '@/assets/logo-girassol.png';
 
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: '2px solid #c5d93e',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    width: 28,
    height: 28,
    backgroundColor: '#f59e0b',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  brandName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  brandSub: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 1,
  },
  dateBox: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 8,
    color: '#94a3b8',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
})
 
export const HeaderReport = () => {
  const currentDate = formatDateTime(new Date());
 
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <div
          className="relative z-10 flex items-center justify-center px-5 py-5"
        >
         <PdfImage
          src={logo}
          style={{ width: 80, height: 40, objectFit: 'contain' }}
        />
        </div>
      </View>
 
      {/* Data */}
      <View style={styles.dateBox}>
        <Text style={styles.dateLabel}>GERADO EM</Text>
        <Text style={styles.dateValue}>{currentDate}</Text>
      </View>
    </View>
  )
}
 