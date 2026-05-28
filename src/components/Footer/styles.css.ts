import { style } from '@vanilla-extract/css';

export const footer = style({
  width: '100%',
  backgroundColor: 'rgb(19, 150, 67)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '10px 16px',
  boxSizing: 'border-box',
  borderTop: '2px solid white',
  gap: '10px',
  minHeight: '48px',

  '@media': {
    '(max-width: 480px)': {
      padding: '7px 12px',
      minHeight: '42px',
      gap: '8px',
    }
  }
});

export const footerText = style({
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  gap: '1px',
  lineHeight: '1.1',

  '@media': {
    '(min-width: 481px)': {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: '40px',
    }
  }
});

export const footerTitle = style({
  fontSize: '14.5px',
  fontWeight: 'bold',

  '@media': {
    '(max-width: 480px)': {
      fontSize: '12.5px',
    }
  }
});

export const footerSubtitle = style({
  fontSize: '9.5px',
  opacity: 0.9,

  '@media': {
    '(max-width: 480px)': {
      fontSize: '8.8px',
    }
  }
});
