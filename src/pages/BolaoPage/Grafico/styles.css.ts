import { style } from '@vanilla-extract/css';

export const folhaContainer = style({
  width: '100%',
  minHeight: '800px',
  display: 'flex',
  flexDirection: 'column'
});

export const tituloImagem = style({
  width: '90%',
  maxWidth: '527px',
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'flex-start',
});

export const folha = style({
  width: '90%',
  backgroundColor: 'rgba(226, 226, 226, 0.336)',
  borderRadius: '10px',
  padding: '20px',
  boxSizing: 'border-box',
});