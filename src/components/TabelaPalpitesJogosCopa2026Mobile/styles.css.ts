import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '20px 16px',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',

  '@media': {
    '(max-width: 768px)': {
      padding: '12px 0px'
    }
  }
});

export const premiosSection = style({
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '24px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',

  '@media': {
    '(max-width: 768px)': {
      padding: '16px',
      marginBottom: '20px',
    }
  }
});

export const buttonsGrid = style({
  display: 'grid',
  gap: '12px',

  '@media': {
    '(min-width: 769px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  }
});

export const sectionTitle = style({
  fontSize: '22px',
  marginBottom: '12px',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '12px'
    }
  }
});

export const faseTitleContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '16px 0',

  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'center'
    }
  }
});

export const saveButton = style({
  '@media': {
    '(max-width: 768px)': {
      width: '150px'
    }
  }
});

export const faseContainer = style({
  marginBottom: '32px',

  '@media': {
    '(max-width: 768px)': {
      marginBottom: '24px',
    }
  }
});

export const partidaContainer = style({
  marginBottom: '12px',
  width: "100%",
  minWidth: 0,

  '@media': {
    '(max-width: 768px)': {
      width: '100%'
    }
  }
});