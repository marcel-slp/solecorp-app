import simbolo_canada from "@/assets/images/selecoes/SEL_CAN.bmp";
import simbolo_estados_unidos from "@/assets/images/selecoes/SEL_EUA.bmp";
import simbolo_mexico from "@/assets/images/selecoes/SEL_MEX.bmp";
import simbolo_australia from "@/assets/images/selecoes/SEL_AUS.bmp";
import simbolo_arabia_saudita from "@/assets/images/selecoes/SEL_ARA.bmp";
import simbolo_catar from "@/assets/images/selecoes/SEL_QAT.bmp";
import simbolo_coreia_do_sul from "@/assets/images/selecoes/SEL_CORS.bmp";
import simbolo_ira from "@/assets/images/selecoes/SEL_IRA.bmp";
import simbolo_japao from "@/assets/images/selecoes/SEL_JAP.bmp";
import simbolo_jordania from "@/assets/images/selecoes/SEL_JOR.bmp";
import simbolo_uzbequistao from "@/assets/images/selecoes/SEL_UZB.bmp";
import simbolo_africa_do_sul from "@/assets/images/selecoes/SEL_AFR.bmp";
import simbolo_argelia from "@/assets/images/selecoes/SEL_AGE.bmp";
import simbolo_cabo_verde from "@/assets/images/selecoes/SEL_CAB.bmp";
import simbolo_costa_do_marfim from "@/assets/images/selecoes/SEL_CMA.bmp";
import simbolo_egito from "@/assets/images/selecoes/SEL_EGIT.bmp";
import simbolo_gana from "@/assets/images/selecoes/SEL_GAN.bmp";
import simbolo_marrocos from "@/assets/images/selecoes/SEL_MAR.bmp";
import simbolo_senegal from "@/assets/images/selecoes/SEL_SEN.bmp";
import simbolo_tunisia from "@/assets/images/selecoes/SEL_TUN.bmp";
import simbolo_argentina from "@/assets/images/selecoes/SEL_ARG.bmp";
import simbolo_brasil from "@/assets/images/selecoes/SEL_BRA.bmp";  
import simbolo_colombia from "@/assets/images/selecoes/SEL_COL.bmp";
import simbolo_equador from "@/assets/images/selecoes/SEL_EQU.bmp";
import simbolo_paraguai from "@/assets/images/selecoes/SEL_PAR.bmp";
import simbolo_uruguai from "@/assets/images/selecoes/SEL_URU.bmp";
import simbolo_nova_zelandia from "@/assets/images/selecoes/SEL_NOV.bmp";
import simbolo_alemanha from "@/assets/images/selecoes/SEL_ALE.bmp";
import simbolo_austria from "@/assets/images/selecoes/SEL_AUT.bmp";
import simbolo_belgica from "@/assets/images/selecoes/SEL_BEL.bmp";
import simbolo_croacia from "@/assets/images/selecoes/SEL_CRO.bmp";
import simbolo_escocia from "@/assets/images/selecoes/SEL_ESC.bmp";
import simbolo_espanha from "@/assets/images/selecoes/SEL_ESP.bmp";
import simbolo_franca from "@/assets/images/selecoes/SEL_FRA.bmp";
import simbolo_holanda from "@/assets/images/selecoes/SEL_HOL.bmp";
import simbolo_inglaterra from "@/assets/images/selecoes/SEL_ING.bmp";
import simbolo_noruega from "@/assets/images/selecoes/SEL_NOR.bmp";
import simbolo_portugal from "@/assets/images/selecoes/SEL_POR.bmp";
import simbolo_suica from "@/assets/images/selecoes/SEL_SUI.bmp";
import simbolo_curacau from "@/assets/images/selecoes/SEL_CUR.bmp";
import simbolo_haiti from "@/assets/images/selecoes/SEL_HAI.bmp";
import simbolo_panama from "@/assets/images/selecoes/SEL_PAN.bmp";
import simbolo_repescagem from "@/assets/images/selecoes/simbolo_repescagem.jpg";
  
export interface Selecao {
  id: string;
  nome: string;
  imagem: string;
  grupo?: string;
  isPlaceholder?: boolean;
}

type Round32Match = {
    home: string;
    away: string;
};

export enum EventoBase {
    COPA_2026 = 'Copa do Mundo 2026'
};

export const ORDEM_FASES = [
    "32 Avos",
    "Oitavas de Final",
    "Quartas de Final",
    "Semifinais",
    "Disputa pelo 3º Lugar",
    "Final"
  ];

export const selecoes: Selecao[] = [
  {
    id: "mexico",
    nome: "México",
    imagem: simbolo_mexico,
    grupo: "A",
  },
  {
    id: "africa_do_sul",
    nome: "África do Sul",
    imagem: simbolo_africa_do_sul,
    grupo: "A",
  },
  {
    id: "coreia_do_sul",
    nome: "Coreia do Sul",
    imagem: simbolo_coreia_do_sul,
    grupo: "A",
  },
  {
    id: "rep_europa_d",
    nome: "Repescagem Europa D",
    imagem: simbolo_repescagem,
    grupo: "A",
    isPlaceholder: false,
  },
  {
    id: "canada",
    nome: "Canadá",
    imagem: simbolo_canada,
    grupo: "B",
  },
  {
    id: "rep_europa_a",
    nome: "Repescagem Europa A",
    imagem: simbolo_repescagem,
    grupo: "B",
    isPlaceholder: false,
  },
  {
    id: "catar",
    nome: "Catar",
    imagem: simbolo_catar,
    grupo: "B",
  },
  {
    id: "suica",
    nome: "Suíça",
    imagem: simbolo_suica,
    grupo: "B",
  },
  {
    id: "brasil",
    nome: "Brasil",
    imagem: simbolo_brasil,
    grupo: "C",
  },
  {
    id: "marrocos",
    nome: "Marrocos",
    imagem: simbolo_marrocos,
    grupo: "C",
  },
  {
    id: "haiti",
    nome: "Haiti",
    imagem: simbolo_haiti,
    grupo: "C",
  },
  {
    id: "escocia",
    nome: "Escócia",
    imagem: simbolo_escocia,
    grupo: "C",
  },
  {
    id: "estados_unidos",
    nome: "Estados Unidos",
    imagem: simbolo_estados_unidos,
    grupo: "D",
  },
  {
    id: "paraguai",
    nome: "Paraguai",
    imagem: simbolo_paraguai,
    grupo: "D",
  },
  {
    id: "australia",
    nome: "Austrália",
    imagem: simbolo_australia,
    grupo: "D",
  },
  {
    id: "rep_europa_c",
    nome: "Repescagem Europa C",
    imagem: simbolo_repescagem,
    grupo: "D",
    isPlaceholder: false,
  },
  {
    id: "alemanha",
    nome: "Alemanha",
    imagem: simbolo_alemanha,
    grupo: "E",
  },
  {
    id: "curacau",
    nome: "Curaçau",
    imagem: simbolo_curacau,
    grupo: "E",
  },
  {
    id: "costa_do_marfim",
    nome: "Costa do Marfim",
    imagem: simbolo_costa_do_marfim,
    grupo: "E",
  },
  {
    id: "equador",
    nome: "Equador",
    imagem: simbolo_equador,
    grupo: "E",
  },
  {
    id: "holanda",
    nome: "Holanda",
    imagem: simbolo_holanda,
    grupo: "F",
  },
  {
    id: "japao",
    nome: "Japão",
    imagem: simbolo_japao,
    grupo: "F",
  },
  {
    id: "rep_europa_b",
    nome: "Repescagem Europa B",
    imagem: simbolo_repescagem,
    grupo: "F",
    isPlaceholder: false,
  },
  {
    id: "tunisia",
    nome: "Tunísia",
    imagem: simbolo_tunisia,
    grupo: "F",
  },
  {
    id: "belgica",
    nome: "Bélgica",
    imagem: simbolo_belgica,
    grupo: "G",
  },
  {
    id: "egito",
    nome: "Egito",
    imagem: simbolo_egito,
    grupo: "G",
  },
  {
    id: "ira",
    nome: "Irã",
    imagem: simbolo_ira,
    grupo: "G",
  },
  {
    id: "nova_zelandia",
    nome: "Nova Zelândia",
    imagem: simbolo_nova_zelandia,
    grupo: "G",
  },
  {
    id: "espanha",
    nome: "Espanha",
    imagem: simbolo_espanha,
    grupo: "H",
  },
  {
    id: "cabo_verde",
    nome: "Cabo Verde",
    imagem: simbolo_cabo_verde,
    grupo: "H",
  },
  {
    id: "arabia_saudita",
    nome: "Arábia Saudita",
    imagem: simbolo_arabia_saudita,
    grupo: "H",
  },
  {
    id: "uruguai",
    nome: "Uruguai",
    imagem: simbolo_uruguai,
    grupo: "H",
  },
  {
    id: "franca",
    nome: "França",
    imagem: simbolo_franca,
    grupo: "I",
  },
  {
    id: "senegal",
    nome: "Senegal",
    imagem: simbolo_senegal,
    grupo: "I",
  },
  {
    id: "rep_intercontinental_2",
    nome: "Repescagem Intercontinental 2",
    imagem: simbolo_repescagem,
    grupo: "I",
    isPlaceholder: false,
  },
  {
    id: "noruega",
    nome: "Noruega",
    imagem: simbolo_noruega,
    grupo: "I",
  },
  {
    id: "argentina",
    nome: "Argentina",
    imagem: simbolo_argentina,
    grupo: "J",
  },
  {
    id: "argelia",
    nome: "Argélia",
    imagem: simbolo_argelia,
    grupo: "J",
  },
  {
    id: "austria",
    nome: "Áustria",
    imagem: simbolo_austria,
    grupo: "J",
  },
  {
    id: "jordania",
    nome: "Jordânia",
    imagem: simbolo_jordania,
    grupo: "J",
  },
  {
    id: "portugal",
    nome: "Portugal",
    imagem: simbolo_portugal,
    grupo: "K",
  },
  {
    id: "rep_intercontinental_1",
    nome: "Repescagem Intercontinental 1",
    imagem: simbolo_repescagem,
    grupo: "K",
    isPlaceholder: false,
  },
  {
    id: "uzbequistao",
    nome: "Uzbequistão",
    imagem: simbolo_uzbequistao,
    grupo: "K",
  },
  {
    id: "colombia",
    nome: "Colômbia",
    imagem: simbolo_colombia,
    grupo: "K",
  },
  {
    id: "inglaterra",
    nome: "Inglaterra",
    imagem: simbolo_inglaterra,
    grupo: "L",
  },
  {
    id: "croacia",
    nome: "Croácia",
    imagem: simbolo_croacia,
    grupo: "L",
  },
  {
    id: "gana",
    nome: "Gana",
    imagem: simbolo_gana,
    grupo: "L",
  },
  {
    id: "panama",
    nome: "Panamá",
    imagem: simbolo_panama,
    grupo: "L",
  },
];

export const gruposSelecoes = {
    A: ["México", "África do Sul", "Coreia do Sul", "Repescagem Europa D"],
    B: ["Canadá", "Repescagem Europa A", "Catar", "Suíça"],
    C: ["Brasil", "Marrocos", "Haiti", "Escócia"],
    D: ["Estados Unidos", "Paraguai", "Austrália", "Repescagem Europa C"],
    E: ["Alemanha", "Curaçau", "Costa do Marfim", "Equador"],
    F: ["Holanda", "Japão", "Repescagem Europa B", "Tunísia"],
    G: ["Bélgica", "Egito", "Irã", "Nova Zelândia"],
    H: ["Espanha", "Cabo Verde", "Arábia Saudita", "Uruguai"],
    I: ["França", "Senegal", "Repescagem Intercontinental 2", "Noruega"],
    J: ["Argentina", "Argélia", "Áustria", "Jordânia"],
    K: ["Portugal", "Repescagem Intercontinental 1", "Uzbequistão", "Colômbia"],
    L: ["Inglaterra", "Croácia", "Gana", "Panamá"],
};

export const ROUND_OF_32_MATCHUPS: Round32Match[] = [
    { home: "1º Grupo A", away: "2º Grupo B" },
    { home: "1º Grupo C", away: "Melhor 3º (A/B/F)" },
    { home: "1º Grupo E", away: "2º Grupo D" },
    { home: "1º Grupo G", away: "Melhor 3º (C/D/E)" },
    { home: "1º Grupo I", away: "2º Grupo H" },
    { home: "1º Grupo K", away: "Melhor 3º (G/H/I)" },

    { home: "2º Grupo A", away: "2º Grupo C" },
    { home: "1º Grupo B", away: "Melhor 3º (D/E/F)" },
    { home: "2º Grupo E", away: "2º Grupo F" },
    { home: "1º Grupo D", away: "Melhor 3º (A/C/I)" },
    { home: "2º Grupo G", away: "2º Grupo H" },
    { home: "1º Grupo F", away: "Melhor 3º (B/G/K)" },

    { home: "2º Grupo I", away: "2º Grupo J" },
    { home: "1º Grupo H", away: "Melhor 3º (E/F/J)" },
    { home: "2º Grupo K", away: "2º Grupo L" },
    { home: "1º Grupo J", away: "Melhor 3º (H/I/L)" },
];

export enum BolaoRoles {
    CRIADOR = 'criador',
    JOGADOR = 'jogador',
    GERENTE = 'gerente'
}
