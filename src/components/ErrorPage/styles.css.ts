import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  padding: '2rem 1rem',
  textAlign: 'center',

  '@media': {
    '(min-width: 769px)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
      textAlign: 'left',
      padding: '4rem 2rem',
    }
  }
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1rem',

  '@media': {
    '(min-width: 769px)': {
      marginTop: '6rem',
      marginLeft: '2rem',
    }
  }
});

export const textBody = style({
  margin: '1rem 0 2.5rem',
  lineHeight: '1.5',
  fontSize: '1.1rem',

  '@media': {
    '(max-width: 480px)': {
      fontSize: '1rem',
      marginBottom: '2rem',
    }
  }
});

export const button = style({
  margin: '0.8rem 0',
  width: '100%',
  maxWidth: '280px',

  '@media': {
    '(min-width: 769px)': {
      width: 'auto',
      maxWidth: 'none',
      margin: '1rem 0.5rem 1rem 0',
    }
  }
});

export const iconError = style({
  fontSize: '140px',

  '@media': {
    '(max-width: 480px)': {
      fontSize: '110px',
    },
    '(min-width: 769px)': {
      fontSize: '200px',
    }
  }
});