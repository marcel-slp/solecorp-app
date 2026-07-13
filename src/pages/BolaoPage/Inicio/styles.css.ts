import { style } from '@vanilla-extract/css'

export const folhaContainer = style({
  margin: "0 auto",
  padding: "20px",
  width: "100%",
  border: "2px solid silver",
  borderRadius: "7px",
  display: "flex",
  gap: "1%",
  boxSizing: "border-box",
  maxWidth: '100vw',
  height: 'auto',
  minHeight: '100vh',
});

export const quadroInicial = style({
  flex: 1
});

export const simboloTorneioContainer = style({
  display: "flex",
});

export const jogosDoDiaContainer = style({
  display: "flex",
});

export const simboloTorneio = style({
  borderRadius: "10px",
});

export const infoTorneioContainer = style({
  marginLeft: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "300px",
  overflow: "hidden",
});

export const qtdParticipantesContainer = style({
  fontWeight: "bold",
});

export const patrocinadoresContainer = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  gap: "10px",
});

export const patrocinadoresItem = style({
  width: "150px",
  height: "100px",
  objectFit: "contain",
  borderRadius: "5px",
});

export const tituloConfigEventoContainer = style({
  border: "1px solid silver",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "20px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16px",
});

export const botaoLinkConviteContainer = style({
  padding: "10px",
  height: 'auto'
});

export const areaFasesContainer = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
});

export const areaFasesItem = style({
  width: "150px",
  padding: "5px",
  boxSizing: "border-box",
  minHeight: "180px",
});

export const areaFasesTitulo = style({
  fontWeight: "bold",
  marginBottom: "5px",
  fontSize: 14,
});

export const areaFasesContainerVazio = style({
  display: "flex", 
  gap: "10px", 
  fontSize: 12
});

export const quadroDireitaContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  backgroundColor: "#f0f0f0",
  padding: "5px",
  boxSizing: "border-box",
});

export const quadroDireitaBoxSuperior = style({
  flex: 1,
  border: "1px solid silver",
  padding: "10px",
  backgroundColor: "#f0f0f0",
  minHeight: "50px",
  borderRadius: "6px",
});

export const quadroDireitaBoxes = style({
  display: "flex", 
  gap: "10px"
});

export const quadroDireitaContentItem = style({
  marginBottom: "4px",
  paddingBottom: "4px",
  borderBottom: "1px solid silver",
});

export const quadroDireitaBoxInferior = style({
  marginTop: "10px",
  width: "100%",
  height: "100px",
  border: "1px solid silver",
  backgroundColor: "#f0f0f0",
  borderRadius: "6px",
});

export const buttonOpçõesExtras = style({
  width: "60%",
});
