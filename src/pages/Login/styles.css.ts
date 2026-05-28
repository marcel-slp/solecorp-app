import { style } from '@vanilla-extract/css';

export const registroContainer = style({
  padding: '2rem 1.5rem',
  maxWidth: '420px',
  width: '100%',
  margin: '5rem auto',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#e2e8f0',
  borderRadius: '12px',
  backgroundColor: 'white',

  '@media': {
    '(max-width: 480px)': {
      margin: '2rem 1rem',
      padding: '1.8rem 1.2rem',
      maxWidth: 'fit-content',
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

export const linkAlterarSenha = style({
  marginTop: '16px',
  textAlign: 'right',
  fontSize: '14px',
  width: '100%',
  paddingRight: '4px',

  '@media': {
    '(max-width: 480px)': {
      textAlign: 'right',
      paddingRight: '6px',
      marginTop: '12px',
      fontSize: '13.5px',
    }
  }
});