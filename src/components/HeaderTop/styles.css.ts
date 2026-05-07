import { style } from '@vanilla-extract/css';

export const headerTop = style({
  height: '50px',
  width: '100%',
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 5px',
  boxSizing: 'border-box',
  fontSize: '12px',
  color: 'white',
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const menuIcon = style({
  fontSize: '20px',
  color: 'white',
  cursor: 'pointer',
  marginBottom: '7px'
});

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5px',
});

export const titleRow = style({
  display: 'flex',
  gap: '20px',
  fontSize: '16px',
  fontWeight: 'normal',
});

export const iconSmall = style({
  marginTop: '10px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '18px',
  ':hover': {
    opacity: 0.8,
  },
});

export const iconAdmin = style({
  marginTop: '10px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '18px',
  ':hover': {
    opacity: 0.8,
    color: '#2B6CB0 !important'
  },
});

export const searchIcon = style([
  iconSmall,
  {
    marginLeft: '50px',
  },
]);

export const rightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginRight: '20px'
});

export const userPopover = style({
  width: 'fit-content'
});
