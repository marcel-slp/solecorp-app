import { style } from '@vanilla-extract/css';

export const navigationContainer = style({
  backgroundColor: 'rgb(19, 150, 67)',
  padding: '5px 12px 5px',
  flexDirection: 'column',
  gap: '10px',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
});

export const nomeEvento = style({
  fontWeight: 'bold',
  color: 'white',
  marginLeft: '5px',
  paddingTop: '5px',
  fontSize: '0.9rem'
});

export const navLinks = style({
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: '5px',
    }
  }
});

export const itemLink = style({
  color: 'white',
  padding: '8px 14px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '500',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '7px 11px',
      fontSize: '0.9rem',
    }
  }
});