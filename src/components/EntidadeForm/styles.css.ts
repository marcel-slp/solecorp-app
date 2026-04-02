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
  width: '100%',
  height: '100%',
  color: 'black',
  justifyContent: 'start',
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

export const addEntidadesContainer = style({
  width: 'fit-content',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: '20px',
  marginBottom: '20px',
  alignItems: 'center',
});

export const entidadeInputs = style({
  width: '80%'
});

export const entidadeDropdown = style({
  width: '30%'
});

export const entidadeAccordionDropdown = style({
  width: '60%'
});

export const entidadeInputNumber = style({
  width: '15%'
});

export const entidadeOpcoesInputNumber = style({
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

export const entidadesPatrocinadorContainer = style({
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
