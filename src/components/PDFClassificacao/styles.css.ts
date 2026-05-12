import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 7.5,
    flexDirection: 'column',
    fontFamily: "Helvetica"
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  tableContainer: {
    width: '10.8%',
    paddingRight: 4
  },
  tableTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  table: {
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: 0.8,
    borderColor: '#999',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5px solid #ccc',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  cellPos: { width: '11%', textAlign: 'center', padding: 2 },
  cellNome: { width: '55%', paddingLeft: 4, paddingVertical: 2 },
  cellPts: { width: '34%', textAlign: 'center', padding: 2 },
});
