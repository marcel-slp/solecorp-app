import { style } from '@vanilla-extract/css'

export const entidadesContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  color: 'black',
  alignItems: 'center',
  justifyContent: 'center',
});

export const tableEntidadesContainer = style({
  padding: '15px',
  width: '100%',
  height: '100%',
  color: 'black',
  justifyContent: 'start',
});

export const buttonSalvarEditarEntidade = style({
  paddingBottom: '20px'
});

export const addEntidadesContainer = style({
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

export const tdItem = style({
  alignItems: 'center',
  justifyContent: 'center',
});

export const mensagemErroValidacao = style({
  width:'20%'
});
