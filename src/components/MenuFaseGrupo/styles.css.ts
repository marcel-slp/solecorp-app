import { style } from '@vanilla-extract/css';

export const container = style({ width: '100%' });

export const barra = style({
  height: '30px',
  width: '100%',
  backgroundColor: '#00a2ffff',
  position: 'sticky',
  top: '60px',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  boxSizing: 'border-box',
});

export const linhaDivisoria = style({
  height: '1px',
  width: '100%',
  backgroundColor: '#0e5bebff',
});

export const resumo = style({
  height: '30px',
  width: '100%',
  backgroundColor: '#00a2ffff',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  gap: '5px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'black',
});

/* Fases */
export const fasesWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const faseUnicaWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  width: '200px',
});

export const botaoFase = style({
  width: '60px',
  height: '20px',
  border: '1px solid silver',
  backgroundColor: '#00a2ffff',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: 'white',
  cursor: 'pointer',
  whiteSpace: 'nowrap',

  selectors: {
    '&[data-ativa="true"]': {
      borderColor: '#0e5bebff',
      backgroundColor: '#0e5bebff',
    },
  },
});

/* Grupos */
export const gruposWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginLeft: '100px',
  flexGrow: 1,
});

export const botaoGrupo = style({
  width: '20px',
  height: '20px',
  border: '1px solid silver',
  backgroundColor: '#00a2ffff',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: 'white',
  cursor: 'pointer',

  selectors: {
    '&[data-ativa="true"]': {
      borderColor: '#0e5bebff',
      backgroundColor: '#0e5bebff',
    },
  },
});

export const botaoEspecial = style([
  botaoGrupo,
  {
    width: '60px',
    marginLeft: '10px',
  },
]);

export const itemSpan = style({
  fontSize: '14px', 
  fontWeight: 'bold', 
  color: 'black'
});

export const gabaritoInfo = style({
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '10px',
  color: 'black',
  whiteSpace: 'nowrap',
});

export const botaoSumulas = style({
  marginLeft: 'auto',
  marginRight: '50px',
  fontSize: '12px',
  color: 'white',
  backgroundColor: '#00a2ff',
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid silver',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: 'fit-content',
  transition: 'background-color 0.3s ease',

  ':hover': {
    backgroundColor: '#0e5bebff',
  },
});