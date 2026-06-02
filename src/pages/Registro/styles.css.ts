import { style } from '@vanilla-extract/css';

export const registroContainer = style({
  padding: '2rem 1.5rem',
  maxWidth: '440px',
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
      margin: '20px',
      maxWidth: 'fit-content',
      padding: '0.5rem 1.2rem',
    }
  }
});

export const tituloRegistro = style({
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '28px',
  color: '#1e40af',

  '@media': {
    '(max-width: 480px)': {
      fontSize: '24px',
      marginBottom: '20px',
    }
  }
});

export const item = style({
  marginBottom: '1.4rem',
  marginRight: '1rem',

  '@media': {
    '(max-width: 480px)': {
      marginBottom: '1.2rem'
    }
  }
});

export const linkTermosCondicoes = style({
  marginTop: '12px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  '@media': {
    '(max-width: 480px)': {
      marginTop: '10px',
      marginBottom: '16px',
      gap: '6px',
    }
  }
});

export const linkLogin = style({
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'end',
  color: '#000000',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  transition: 'all 0.2s ease',

  ':hover': {
    color: '#1a73e8',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});