import { style } from "@vanilla-extract/css";

export const linhaTabelaJogos = style({
  display: "grid",
  gridTemplateColumns: "50px 1fr 60px 24px 60px 1fr 150px 140px 250px",
  alignItems: "center",
  gap: "8px 12px",
  padding: "8px 0",
  borderBottom: "1px solid #e0e0e0",
  minWidth: "min-content",
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: "50px 1fr 60px 24px 60px 1fr 150px 140px 250px",
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
  margin: '0 10px 0 16px'
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
  whiteSpace: "nowrap"
});

export const simb = style({
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  objectFit: "cover",
  cursor: 'pointer'
});
