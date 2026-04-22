import { style } from '@vanilla-extract/css'

export const bolaoContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  color: 'black',
  alignItems: 'center',
  justifyContent: 'center',
});

export const tableBolaoContainer = style({
  width: '100%',
  height: '100%',
  color: 'black',
  justifyContent: 'start',
});

export const addLigaContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const formLigaContainer = style({
  width: '60%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const addCopaContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const formCopaContainer = style({
  width: '60%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const addBolaoContainer = style({
  width: 'fit-content',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '20px',
  columnGap: '10px',
  marginBottom: '20px',
  alignItems: 'center',
});

export const bolaoInputs = style({
  width: 'fit-content'
});

export const bolaoDropdown = style({
  width: 'fit-content'
});

export const eventoAccordionDropdown = style({
  width: '60%'
});

export const eventoInputNumber = style({
  width: '15%'
});

export const eventoOpcoesInputNumber = style({
  width: '40%'
});

export const tabPanel = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '20px',
  columnGap: '20px',
  width: 'fit-content'
});

export const accordionPanel = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '20px'
});

export const mensagemErroValidacao = style({
  marginTop: '15px',
  width:'30%'
});

export const botoesFooter = style({
  gap: 'normal',
  marginTop:'20px'
});

export const tabPanelsContainer = style({
  width: 'fit-content',
  columnGap: '20px'
});

export const eventosPatrocinadorContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr'
});

export const formParticipantesContainer = style({
  width: '60%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  rowGap: '10px',
  columnGap: '10px'
});

export const tableParticipantesContainer = style({
  width: '100%'
});

export const labelEntidade = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '20px'
});
