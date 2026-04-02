import { style } from '@vanilla-extract/css';

export const footer = style({
  width: "100%",
  backgroundColor: "#0e5bebff",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "5px",
  boxSizing: "border-box",
  borderTop: "3px solid rgb(192, 0, 0)"
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
