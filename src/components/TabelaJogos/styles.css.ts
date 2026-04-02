import { style } from "@vanilla-extract/css";

export const linhaTabelaJogos = style({
  display: "grid",
  gridTemplateColumns: "40px 80px 1fr 50px 20px 50px 1fr 100px 80px 150px 120px",
  alignItems: "center",
  gap: "8px",
  padding: "6px 0",
  borderBottom: "1px solid #ccc",
});

export const itemLinha = style({
  textAlign: "center",
  fontWeight: "bold"
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
  maxWidth: "150px"
});

export const simb = style({
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  objectFit: "cover"
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
