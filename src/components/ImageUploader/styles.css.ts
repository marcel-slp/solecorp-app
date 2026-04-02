import { style } from '@vanilla-extract/css';

export const uploaderWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
});

export const uploaderContainer = style({
  width: '150px',
  height: '150px',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '8px',
  border: '2px dashed #ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const uploaderImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

export const uploaderInput = style({
  display: 'none',
});

export const uploaderResetButton = style({
  cursor: 'pointer',
  top: '60px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  ':hover': {
    backgroundColor: '#ddd',
  },
});

