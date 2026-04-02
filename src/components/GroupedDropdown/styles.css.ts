import { style } from '@vanilla-extract/css';

export const popoverContent = style({
  width: '320px',
  zIndex: 50,
});

export const accordionPanel = style({
  padding: '8px',
  maxHeight: '200px',
  overflowY: 'auto',
});

export const groupButton = style({
  justifyContent: 'flex-start',
  textAlign: 'left',
  padding: '6px 10px',
  width: '100%',
  cursor: 'pointer',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  border: 'none',
  ':hover': {
    backgroundColor: '#f7f7f7'
  },
});

export const popoverTriggerButton = style({
  minWidth: '220px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  fontWeight: 'normal',
  borderColor: '#ededed',
  ':hover': {
    backgroundColor: 'white'
  },
});
