import { style } from '@vanilla-extract/css'

export const navigationContainer = style({
  height: "60px",
  width: "100%",
  backgroundColor: "rgb(19, 150, 67)",
  display: "flex",
  alignItems: "center",
  paddingLeft: "5px",
  gap: "10px",
  boxSizing: "border-box",
  position: "sticky",
  top: 0,
  zIndex: 100,
  borderTop: "3px solid white",
});

export const imageLink = style({
  width: "40px",
  height: "40px",
  backgroundColor: "white",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const imageLogo = style({
  width: "38px", 
  height: "38px", 
  objectFit: "cover", 
  borderRadius: "6px"
});

export const nomeEvento = style({
  color: "yellow", 
  fontSize: "14px", 
  fontWeight: "normal"
});

export const itemLink = style({
  height: "55px",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  textTransform: "uppercase",
  textDecoration: "none",
  borderRadius: '8px'
});

export const iconBar = style({
  marginLeft: 'auto',
  paddingRight: '50px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

export const headerIcon = style({
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'opacity 0.2s',

  ':hover': {
    opacity: 0.7,
  },
});

export const saveButton = style({
  '@media': {
    '(max-width: 768px)': {
      width: '150px'
    }
  }
});
