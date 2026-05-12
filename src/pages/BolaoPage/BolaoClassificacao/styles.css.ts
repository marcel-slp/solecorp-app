import { style } from '@vanilla-extract/css'

export const classificacaoContainer = style({
  width: '100%',
  minHeight: '800px',
  display: 'flex',
  flexDirection: 'column',
});

export const tituloImagem = style({
  display: "flex", 
  alignItems: "center", 
  justifyContent: "space-between", 
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "15px"
});

export const folha = style({
  width: 'fit-content',
  backgroundColor: 'rgba(226, 226, 226, 0.336)',
  borderRadius: '10px',
  padding: '20px',
  boxSizing: 'border-box',
});

export const addEventosContainer = style({
  width: '20%',
  marginBottom: '20px',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '12px',
  columnGap: '16px',
  color: 'black',
  justifyContent: 'start',
  flexDirection: 'column'
});

export const addParticipantesContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '10px',
  columnGap: '10px',
});

export const formParticipantesContainer = style({
  width: '60%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '10px',
  columnGap: '10px',
});

export const tableParticipantesContainer = style({
  width: '100%'
});

export const pdfLink = style({
  textDecoration: "none", 
  alignSelf: "end"
});

export const imageExportTitulo = style({
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "40px",
  fontWeight: "bold"
});

export const imageExportAbas = style({
  display: "flex",
  flexWrap: "nowrap",
  gap: "14px",
  justifyContent: "flex-start"
});

export const imageExportAbaUnica = style({
  width: "fit-content",
  flexShrink: 0,
  border: "1px solid #ddd",
  borderRadius: "6px"
});

export const imageExportAbaLabel = style({
  textAlign: "center",
  marginBottom: "12px",
  fontSize: "16px",
  fontWeight: "bold"
});
