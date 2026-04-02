import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
})

export const main = style({
  flex: 1,
  overflow: 'auto',
  width: '100vw'
})
