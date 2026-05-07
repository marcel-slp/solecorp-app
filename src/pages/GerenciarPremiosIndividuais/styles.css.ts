import { style } from '@vanilla-extract/css'

export const tableJoagdorContainer = style({
  marginLeft: '10px',
  width: '100%',
  height: '100%',
  color: 'black',
  justifyContent: 'start'
});

export const selectPremiosIndividuaisContainer = style({
  width: '25%',
  marginBottom: '20px',
  marginTop: '30px',
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  rowGap: '12px',
  columnGap: '16px',
  color: 'black',
  justifyContent: 'start',
  flexDirection: 'column'
});

export const premiosIndividuaisInputs = style({
  width: 'fit-content'
});

export const premiosIndividuaisDropdown = style({
  width: 'fit-content'
});