import { style } from '@vanilla-extract/css';

export const folhaContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

export const tituloImagem = style({
  width: '100%',
  margin: '0 0 20px 0',
  display: 'flex',

  '@media': {
    '(max-width: 480px)': {
      marginBottom: '16px',
    }
  }
});

export const folha = style({
  width: '100%',
  maxWidth: '1200px',
  backgroundColor: 'rgba(226, 226, 226, 0.336)',
  borderRadius: '10px',
  padding: '0px',
  boxSizing: 'border-box',

  '@media': {
    '(max-width: 768px)': {
      padding: '10px',
    }
  }
});

export const linhaTabelaJogos = style({
  display: 'grid',
  gridTemplateColumns: "40px 1fr 50px 20px 50px 1fr 100px 50px 150px 80px",
  alignItems: "center",
  gap: "8px",
  padding: "8px 4px",
  borderBottom: "1px solid #ccc",

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: "35px 1fr 45px 18px 45px 1fr 90px 45px 80px 60px",
      gap: "6px",
      padding: "6px 2px",
      fontSize: "13px",
    }
  }
});

export const nome = style({
  fontSize: "14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  '@media': {
    '(max-width: 768px)': {
      fontSize: "12.5px",
      maxWidth: "110px",
    }
  }
});

export const simb = style({
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  objectFit: "cover",

  '@media': {
    '(max-width: 768px)': {
      width: "22px",
      height: "22px",
    }
  }
});

export const placar = style({
  width: "40px",
  textAlign: "center",
  padding: "5px",
  backgroundColor: 'white',

  '@media': {
    '(max-width: 768px)': {
      width: "36px",
      fontSize: "13px",
    }
  }
});

export const data = style({
  width: "100px",
  fontSize: "13px",

  '@media': {
    '(max-width: 768px)': {
      width: "80px",
      fontSize: "12px",
    }
  }
});

export const hora = style({
  width: "60px",
  '@media': {
    '(max-width: 768px)': { width: "50px" }
  }
});

export const local = style({
  width: "140px",
  fontSize: "13px",

  '@media': {
    '(max-width: 768px)': {
      width: "90px",
      fontSize: "12px",
    }
  }
});