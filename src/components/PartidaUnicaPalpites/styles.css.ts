import { style } from "@vanilla-extract/css";

export const linhaTabelaJogos = style({
  display: "grid",
  gridTemplateColumns: "50px 150px 60px 24px 60px 150px 280px 140px 110px 170px",
  alignItems: "center",
  gap: "10px 12px",
  padding: "12px 0",
  borderBottom: "1px solid #e0e0e0",
  //minWidth: "min-content",
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: "50px 150px 60px 24px 60px 150px 280px 140px 110px 170px",
      gap: "6px 8px",
    }

  },
});

export const segundaLinhaTabelaJogos = style({
  display: "grid",
  gridRow: 'auto',
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  gap: "8px 12px",
  padding: "8px 0",
  borderBottom: "1px solid #e0e0e0",
  minWidth: "min-content",
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: "50px 150px 60px 24px 60px 150px 280px 140px 110px 170px 80px",
      gap: "6px 8px",
    }

  },
});

export const itemLinha = style({
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "14px"
});

export const xLinhaPenaltis = style({
  margin: '0 10px 0 14px'
});

export const nomeSimbEsqContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: 'flex-end',
  gap: "6px",
});

export const nomeSimbDirContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const nome = style({
  fontSize: "14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  //maxWidth: "150px"
});

export const simb = style({
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  objectFit: "cover",
  cursor: 'pointer'
});

export const placar = style({
  width: "40px",
  textAlign: "center",
  padding: "5px",
  backgroundColor: 'white',
});

export const data = style({
  width: "100px",
});

export const hora = style({
  width: "60px",
});

export const local = style({
  width: "140px",
});

export const iconGroup = style({
  display: "flex",
  gap: "6px",
});

