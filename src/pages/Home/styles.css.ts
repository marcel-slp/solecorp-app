import backgroundBlack from "@/assets/images/backbolao.jpg";
import { style } from '@vanilla-extract/css';

export const homeContainer = style({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundBlack})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '20px 16px',

  '@media': {
    '(max-width: 480px)': {
      margin: '2rem 1rem',
      maxWidth: '100%',
    },
    '(max-width: 768px)': {
      margin: '0 auto',
    }
  }
});

export const mainGrid = style({
  display: 'grid',
  gap: '24px',

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

export const leftColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const topSection = style({
  display: 'grid',
  gap: '20px',

  '@media': {
    '(min-width: 769px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  }
});

export const buttonsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'normal',

  '@media': {
    '(max-width: 480px)': {
      margin: '2rem 1rem',
      maxWidth: '100%',
    },
    '(max-width: 768px)': {
      margin: '0 auto',
    }
  }
});

export const button = style({
  fontSize: '15px',
  padding: '10px 16px',
  height: 'auto',

  '@media': {
    '(max-width: 480px)': {
      fontSize: '13.5px',
      padding: '9px 12px',
      minHeight: '42px',
    }
  }
});

export const playerImageContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const card = style({
  backgroundColor: 'rgba(255,255,255,0.85)',
  borderRadius: '12px',
  padding: '20px',

  '@media': {
    '(max-width: 768px)': {
      padding: '16px',
    }
  }
});
