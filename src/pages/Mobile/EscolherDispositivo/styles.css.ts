import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      marginBottom: '20px'
    }
  }
});

export const title = style({
  textAlign: 'center',
  color: 'green',
  fontSize: 'medium'
});

export const deviceButton = style({
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',

  ':hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      height: '140px !important',
      fontSize: '1.4rem !important',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }
  }
});
