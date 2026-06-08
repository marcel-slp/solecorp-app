import { style } from "@vanilla-extract/css";

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
  marginBottom: '10px',

  '@media': {
    '(max-width: 768px)': {
      justifyContent: "center",
      fontSize: "12px",
      gridTemplateColumns: '21px 82px 31px 1fr'
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
  marginBottom: '10px',
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  paddingTop: "8px",
  borderTop: "1px solid #eee",
});

export const placarContainer = style({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  marginLeft: 'auto',
  gap: '6px',

  '@media': {
    '(max-width: 768px)': {
      gap: '4px',
    }
  }
});
