import { style } from '@vanilla-extract/css';

export const registroContainer = style({
  padding: '2rem 1.5rem',
  maxWidth: '420px',
  width: '100%',
  margin: '4rem auto',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#e2e8f0',
  borderRadius: '12px',
  backgroundColor: 'white',

  '@media': {
    '(max-width: 480px)': {
      margin: '2rem 1rem',
      padding: '1.8rem 1.2rem',
      maxWidth: '100%',
    },
    '(max-width: 768px)': {
      margin: '3rem auto',
    }
  }
});

export const tituloRegistro = style({
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '24px',
  color: '#1e40af',

  '@media': {
    '(max-width: 480px)': {
      fontSize: '24px',
    }
  }
});

export const item = style({
  marginBottom: '1.4rem',

  '@media': {
    '(max-width: 480px)': {
      marginBottom: '1.2rem',
    }
  }
});