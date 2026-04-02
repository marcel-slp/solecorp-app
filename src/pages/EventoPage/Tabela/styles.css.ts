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

export const tituloImagemImg = style({
  width: '100%',
  height: 'auto',
  borderRadius: 0,
});

export const folha = style({
  width: '90%',
  backgroundColor: 'rgba(226, 226, 226, 0.336)',
  borderRadius: '10px',
  padding: '20px',
  boxSizing: 'border-box',
});

export const rodadaBloco = style({
  marginBottom: '30px',
});

export const rodadaTitulo = style({
  marginBottom: '12px',
  fontWeight: 'bold',
  fontSize: '12px',
  textTransform: 'uppercase',
  color: '#333',
});

const componenteBase = style({
  backgroundColor: 'white',
  color: 'black',
  padding: '2px 6px',
  height: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  border: '1px solid #f1f0f0',
  borderRadius: '5px',
  boxSizing: 'border-box',
});

export const jogo = style([componenteBase, { width: '30px' }]);
export const letras = style([componenteBase, { width: '50px', height: '18px' }]);
export const largo = style([componenteBase, { width: '220px' }]);
export const detalhes = style([componenteBase, { width: '30px' }]);

export const grupoColado = style({
  display: 'flex',
  gap: 0,
});

/* Participante 1 */
export const part1 = style([
  componenteBase,
  largo,
  {
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },
]);

export const parti1simb = style([
  componenteBase,
  {
    width: '25px',
    padding: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    overflow: 'hidden',
  },
]);

export const part1placar = style([
  componenteBase,
  { width: '15px', padding: 0, textAlign: 'center' },
]);

/* Participante 2 */
export const part2 = style([
  componenteBase,
  largo,
  {
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
  },
]);

export const part2simb = style([
  componenteBase,
  {
    width: '25px',
    padding: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
    overflow: 'hidden',
  },
]);

export const part2placar = style([
  componenteBase,
  { width: '15px', padding: 0, textAlign: 'center' },
]);

export const vs = style([
  componenteBase,
  {
    width: '10px',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '10px',
  },
]);

export const data = style([
  componenteBase,
  {
    width: '80px',
    height: '22px',
    padding: '0 4px',
    textTransform: 'uppercase',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
]);

export const hora = style([
  componenteBase,
  {
    width: '50px',
    height: '22px',
    padding: '0 4px',
    textTransform: 'uppercase',
    borderRadius: 0,
  },
]);

export const local = style([
  componenteBase,
  {
    width: '80px',
    height: '22px',
    padding: '0 4px',
    textTransform: 'uppercase',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
]);

export const simboloImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});