import { style } from '@vanilla-extract/css';

export const classificacaoContainer = style({
  width: '100%',
  minHeight: '800px',
  display: 'flex',
  flexDirection: 'column',
});

export const tituloImagem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px',

  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }
});

export const folha = style({
  width: '100%',
  backgroundColor: 'rgba(226, 226, 226, 0.336)',
  borderRadius: '10px',
  padding: '15px',
  boxSizing: 'border-box',

  '@media': {
    'screen and (min-width: 768px)': {
      padding: '20px',
    }
  }
});

export const imageExportContainer = style({
  position: 'absolute',
  left: '-99999px',
  top: '-99999px',
  visibility: 'hidden',
  padding: '30px',
  backgroundColor: 'white',
  width: '2200px',
});

export const imageExportTitulo = style({
  textAlign: 'center',
  fontSize: '28px',
  marginBottom: '30px',
  fontWeight: 'bold',
});

export const imageExportAbas = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
});

export const imageExportAbaUnica = style({
  width: '380px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
});

export const imageExportAbaLabel = style({
  textAlign: 'center',
  padding: '10px',
  fontSize: '15px',
  fontWeight: 'bold',
  backgroundColor: "#1e3a8a",
  color: "white"
});