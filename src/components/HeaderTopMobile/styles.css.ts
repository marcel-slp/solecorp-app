import { style } from '@vanilla-extract/css';

export const headerTop = style({
  height: '55px',
  width: '100%',
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 12px',
  boxSizing: 'border-box',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid #333',

  '@media': {
    '(max-width: 768px)': {
      height: '52px',
      padding: '0 10px',
    }
  }
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flex: 1,
});

export const menuIcon = style({
  fontSize: '22px',
  color: 'white',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '6px',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '20px',
    }
  }
});

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  fontSize: '15px',
  color: 'white',

  '@media': {
    '(max-width: 768px)': {
      gap: '8px',
      fontSize: '14px',
    }
  }
});

export const rightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginLeft: '10px',
  color: 'white',
  marginBottom: '3px',

  '@media': {
    '(max-width: 768px)': {
      gap: '10px',
    }
  }
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
