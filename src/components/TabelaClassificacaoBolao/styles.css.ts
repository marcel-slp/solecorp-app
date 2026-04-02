import { style } from '@vanilla-extract/css';

export const trHeadContainer = style({
  backgroundColor: "white",
  borderBottom: "2px solid silver"
});

export const thItem = style({
  textAlign: 'center',
  fontWeight: "bold"
});

export const tdItem = style({
  textAlign: 'center'
});

export const trBodyContainer = style({
  maxHeight: "45px",
  backgroundColor: "white",
  borderBottom: "1px solid silver",
  ':hover': {
    backgroundColor: "gray.50"
  }
});

export const imagemParticipante = style({
  width: "28px",
  height: "28px",
  borderRadius: "full",
  objectFit: "cover"
});