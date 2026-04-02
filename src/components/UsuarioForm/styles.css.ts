import { style } from '@vanilla-extract/css'

export const tableUsuarioContainer = style({
  padding: '15px',
  width: '100%',
  height: '100%',
  color: 'black',
  justifyContent: 'start',
});

export const addUsuarioContainer = style({
  width: '25%',
  marginBottom: '20px',
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  rowGap: '12px',
  columnGap: '16px',
  color: 'black',
  justifyContent: 'start',
  flexDirection: 'column'
});

export const addAtletasContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const formAtletasContainer = style({
  width: '60%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const tableAtletasContainer = style({
  width: '100%'
});

export const eventoAtletaInputs = style({
  width: '60%'
});

export const mensagemErroValidacao = style({
  paddingTop: '15px',
  paddingBottom: '15px',
  width:'30%'
});
