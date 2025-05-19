import { StyleSheet, Font } from '@react-pdf/renderer';
import { View, Image } from '@react-pdf/renderer';

// Register fonts - using standard fonts for simplicity
// Default font (Calibri for PDF)
Font.register({
  family: 'Calibri',
  fonts: [
    {
      src: 'https://db.onlinewebfonts.com/t/267bd6adfcf4ef37a3fb97092614dda1.ttf',
    },
    {
      src: 'https://db.onlinewebfonts.com/t/267bd6adfcf4ef37a3fb97092614dda1.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://db.onlinewebfonts.com/t/267bd6adfcf4ef37a3fb97092614dda1.ttf',
      fontStyle: 'italic',
    },
  ],
});

// Monospace font for fixed-width formatting
Font.register({
  family: 'Courier',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/courier-new@1.0.4/Courier New.ttf' },
    { 
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/courier-new-bold@1.0.4/Courier New Bold.ttf',
      fontWeight: 'bold'
    }
  ]
});

// Common styles for all PDF documents
export const commonStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Calibri',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#000000',
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  title: {
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 24,
  },
  tableCell: {
    padding: 5,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    fontSize: 10,
  },
});

// Specific styles for offer letter
export const offerLetterStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Calibri',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  companyAddress: {
    fontSize: 10,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  companyContact: {
    fontSize: 10,
    marginBottom: 2,
  },
  logo: {
    width: 60,
    height: 'auto',
  },
  letterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateSection: {
    marginBottom: 8,
  },
  toSection: {
    marginBottom: 8,
  },
  letterContent: {
    marginBottom: 20,
    textAlign: 'justify',
  },
  paragraph: {
    marginBottom: 7,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginTop: 30,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 11,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    paddingTop: 5,
    fontSize: 10,
  },
  salaryTable: {
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  tableRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
});

// Specific styles for appointment letter
export const appointmentLetterStyles = StyleSheet.create({
  page: {
    ...commonStyles.page,
    fontFamily: 'Calibri',
    fontSize: 12,
    lineHeight: 1.6,
  },
  subjectLine: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontWeight: 'bold',
    margin: '20px 0 10px',
  },
  tableContainer: {
    marginVertical: 20,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
    borderLeft: '1pt solid black',
    borderRight: '1pt solid black',
  },
  tableRowFirst: {
    flexDirection: 'row',
    borderTop: '1pt solid black',
    borderBottom: '1pt solid black',
    borderLeft: '1pt solid black',
    borderRight: '1pt solid black',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 8,
    flex: 1,
    borderRight: '1pt solid black',
  },
  tableCell: {
    padding: 8,
    flex: 1,
    borderRight: '1pt solid black',
  },
  tableCellLast: {
    padding: 8,
    flex: 1,
  },
});

// Other document-specific styles
export const appraisalLetterStyles = StyleSheet.create({
  page: {
    ...commonStyles.page,
    fontFamily: 'Calibri',
    fontSize: 12,
    lineHeight: 1.6,
  },
  subjectLine: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontWeight: 'bold',
    margin: '20px 0 10px',
  },
});

export const relievingLetterStyles = StyleSheet.create({
  page: {
    ...commonStyles.page,
    fontFamily: 'Calibri',
    fontSize: 12,
    lineHeight: 1.6,
  },
  subjectLine: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
});

export const incrementLetterStyles = StyleSheet.create({
  page: {
    ...commonStyles.page,
    fontFamily: 'Calibri',
    fontSize: 12,
    lineHeight: 1.6,
  },
  subjectLine: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
});

// Payslip specific styles
export const payslipStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Calibri',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Calibri',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    fontFamily: 'Calibri',
  },
  section: {
    marginVertical: 5,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tableColWide: {
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 5,
    fontFamily: 'Calibri',
  },
  tableCell: {
    padding: 5,
    fontFamily: 'Calibri',
  },
  summaryBox: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Calibri',
  },
});

// Watermark Component for background company logo
interface WatermarkProps {
  logoSrc?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({ logoSrc }) => {
  // Only render if logo exists
  if (!logoSrc) return null;
  
  const watermarkStyles = StyleSheet.create({
    watermarkContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    watermarkImage: {
      width: '70%',
      height: 'auto',
      opacity: 0.12, // Lighter opacity (0.12 = 12% opacity, 88% transparent)
    }
  });
  
  return (
    <View style={watermarkStyles.watermarkContainer}>
      <Image src={logoSrc} style={watermarkStyles.watermarkImage} />
    </View>
  );
}; 