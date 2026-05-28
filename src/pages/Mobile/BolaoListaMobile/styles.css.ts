import { style } from '@vanilla-extract/css';

export const mobileContainer = style({
  padding: '16px',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
});

export const bolaoCard = style({
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0',
});

export const tableBolaoContainer = style({
  margin: '0 10px',
  color: 'black',
  justifyContent: 'start'
});
