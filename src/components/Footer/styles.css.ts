import { style } from '@vanilla-extract/css';

export const footer = style({
  width: "100%",
  backgroundColor: "rgb(19, 150, 67)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "5px",
  boxSizing: "border-box",
  borderTop: "3px solid white"
});

export const footerText = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  marginLeft: "5px",
  color: "white",
  columnGap: '50px',
  alignItems: 'baseline'
});
