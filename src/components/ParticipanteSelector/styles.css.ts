import { style } from '@vanilla-extract/css'

export const flexContainer = style({
  gap: 6,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: 4
});

export const boxContainer = style({
  flex: '1',
  minWidth: '280px',
  maxWidth: '320px',
});

export const innerBoxContainer = style({
  borderWidth: '1px',
  borderRadius: 'md',
  padding: 2,
  height: '280px',
  overflowY: 'auto',
});

export const innerFlexContainer = style({
    alignItems: 'center',
    justifyContent:'space-between',
    cursor: 'pointer',
    padding: 1,
    borderRadius: 'md'
});

export const addParticipantesContainer = style({
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