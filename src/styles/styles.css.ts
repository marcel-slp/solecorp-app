import { style } from '@vanilla-extract/css'

export const layout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)', // fallback para mobile
  gridTemplateRows: '60px 1fr',
  gridTemplateAreas: `
    "header"
    "content"
  `,
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '200px 1fr 200px',
      gridTemplateAreas: `
        "header header header"
        "left content right"
      `,
    },
  },
})

export const header = style({
  gridArea: 'header',
  height: '60px',
})

export const leftSidebar = style({
  gridArea: 'left',
  overflow: 'hidden',
})

export const rightSidebar = style({
  gridArea: 'right',
  overflow: 'hidden',
})

export const content = style({
  gridArea: 'content',
  height: '100%', // para herdar o espaço restante
  overflow: 'hidden', // evita scroll interno
})