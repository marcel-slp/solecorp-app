import { style } from '@vanilla-extract/css';

export const classificacaoLista = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  alignItems: 'flex-start',
});

export const classificacaoLinha = style({
  display: 'flex',
  height: '40px',
  alignItems: 'center',
  backgroundColor: 'white',
  width: 'fit-content',
  borderBottom: '1px solid silver',
});

const colunaBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  padding: '2px 6px',
  boxSizing: 'border-box',
});

export const trHeadContainer = style({
  backgroundColor: "white",
  borderBottom: "2px solid silver"
});

export const thItem = style({
  textAlign: 'center',
  fontWeight: "bold"
});

export const tdItem = style({
  textAlign: 'center'
});

export const trBodyContainer = style({
  maxHeight: "45px",
  backgroundColor: "white",
  borderBottom: "1px solid silver",
  ':hover': {
    backgroundColor: "gray.50"
  }
});

export const imagemParticipante = style({
  width: "28px",
  height: "28px",
  borderRadius: "full",
  objectFit: "cover"
});

export const colunaPosicao = style([colunaBase, { width: '30px', color: 'navy' }]);
export const colunaSimbolo = style([colunaBase, { width: '40px' }]);
export const colunaNome = style([
  colunaBase,
  {
    width: '220px',
    justifyContent: 'flex-start',
    paddingLeft: '6px',
  },
]);

export const colunaVazia = style([colunaBase, { width: '20px' }]);

export const colunaPts = style([
  colunaBase,
  { width: '60px', color: 'navy', marginRight: '10px' },
]);

export const colunaJogos = style([colunaBase, { width: '40px' }]);
export const colunaVitorias = style([colunaBase, { width: '40px' }]);
export const colunaEmpates = style([colunaBase, { width: '40px' }]);
export const colunaDerrotas = style([colunaBase, { width: '40px' }]);
export const colunaGp = style([colunaBase, { width: '50px' }]);
export const colunaGc = style([colunaBase, { width: '50px' }]);
export const colunaSg = style([colunaBase, { width: '50px' }]);

export const colunaHr = style([
  colunaBase,
  {
    width: '150px',
    gap: '6px',
    padding: '0 6px',
  },
]);

export const colunaJr = style([colunaBase, { width: '50px' }]);
export const colunaPlayer = style([
  colunaBase,
  { width: '200px', justifyContent: 'flex-start' },
]);

export const bolinhaHr = style({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  flexShrink: 0,
});

export const bolinhaHrUltima = style([
  bolinhaHr,
  {
    border: '1px solid silver',
    boxShadow: 'inset 0 0 0 1px silver',
  },
]);

export const simboloImg = style({
  width: '25px',
  height: '25px',
  borderRadius: '50%',
  objectFit: 'cover',
});

export const cabecalho = style({
  fontWeight: 'bold',
  color: 'black',
});

export const legenda = style({
  marginTop: '50px',
  textAlign: 'center',
  fontSize: '9px',
  color: 'gray',
});
