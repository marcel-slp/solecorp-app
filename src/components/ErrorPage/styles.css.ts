import { style } from '@vanilla-extract/css';

export const wrapper = style({
    display: 'flex',
    gap: '2rem'
});

export const text = style({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '6rem'
});

export const textBody = style({
    margin: '1rem 0 4rem',
    lineHeight: '1.4'
});

export const button = style({
    margin: '2rem 0 1rem'
});

export const divider = style({
    width: '66.66666%',
    marginLeft: 0,
    display: 'block',
    border: '0',
    height: '1px',
    marginBottom: '0',
    backgroundImage:
        'linear-gradient(to left,transparent 0,transparent 100px,#d6d8db 200px)'
});
