import { style } from '@vanilla-extract/css'

export const classificacaoContainer = style({
  width: '100%',
  minHeight: '800px',
  display: 'flex',
  flexDirection: 'column'
});

export const tituloImagem = style({
  width: '90%',
  maxWidth: '527px',
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'flex-start',
});

export const folha = style({
  width: '100%',
  backgroundColor: 'rgba(226, 226, 226, 0.336)',
  borderRadius: '10px',
  padding: '20px',
  boxSizing: 'border-box',
});

export const addEventosContainer = style({
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
