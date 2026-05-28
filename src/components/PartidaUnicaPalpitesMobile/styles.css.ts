import { style } from "@vanilla-extract/css";

export const xLinhaPenaltis = style({
  margin: '0 10px 0 14px'
});

export const nome = style({
  fontSize: "14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: 'stretch'
});

export const simb = style({
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  objectFit: "cover",
  cursor: 'pointer'
});

export const placar = style({
  width: "20%",
  textAlign: "end",
  padding: "5px",
  backgroundColor: 'white',
  '@media': {
    '(max-width: 768px)': {
      width: "30%",
    }
  }
});

export const linhaTabelaJogos = style({
  display: "grid",
  gap: "10px",
  padding: "14px",
  backgroundColor: "white",
  borderRadius: "10px",
  border: "1px solid #e0e0e0",
  marginBottom: "16px",
  //width: "470px",
  width: "fit-content",
  maxWidth: "470px",
  boxSizing: "border-box",
  minWidth: 0,

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: "1fr",
    }
  }
});

export const headerLinha = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: '18px 100px 50px 1fr',
  justifyContent: 'center',
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333",

  '@media': {
    '(max-width: 768px)': {
      justifyContent: "center",
      fontSize: "12px",
      gridTemplateColumns: '15px 82px 31px 1fr',
    }
  }
});

export const timeCasaLinha = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: '10px'
});

export const timeForaLinha = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: '10px'
});

export const resultadoLinha = style({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  paddingTop: "8px",
  borderTop: "1px solid #eee",
});