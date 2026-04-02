//TODO: deletar este arquivo e fazer pegar do cadastro de Eventos

export const nomeEvento = "Evento Teste 2025";
//export const version = 2;
//export const dataCriacao = "23/09/2025";
export const imagemEvento = "/images/SimbEventoPadrao.jpg";
export const modalidadeEsportiva = 1;
export const tipoEvento = "Copa de várias fases";
export const Atribuicao = "Sim";
export const sigla = "SIGLA";
//export const regulamento = "";
//export const versionTables = "";
//export const nrParticipantes = 1000;
//export const tabela = "padrao";
//export const nomeTabelaPersonalizada = "";
//export const tabgrupo = "padrao";
//export const nomeTabGrupoPersonalizada = "";
export const fases = 2;
//export const territorialidade = "não";
export const tipoEsporte = 1;
export const modoClassificacao = "padrão";
export const indiceTecnico = 0;
export const tipoEliminatoria = "simples";
export const formaSistema = "normal";
export const definirTerceiroLugar = "não";
export const europeanPlayoffSystem = "não";
export const desempate = "por pênaltis";
export const espelharRodadas = "não";
export const rebaixadosGeral = "1";
export const rebaixadosGrupo = "1";
export const patrocinador1 = "";
export const patrocinador2 = "";
export const patrocinador3 = "";
export const patrocinador4 = "";
export const modoDisputaFase1 = "grupo";
export const modoDisputaFase2 = "grupo";
export const modoDisputaFase3 = "grupo";
export const modoDisputaFase4 = "grupo";
export const partsFase1 = "16";
export const partsFase2 = "4";
export const partsFase3 = "0";
export const partsFase4 = "0";
export const turnosFase1 = "1";
export const turnosFase2 = "1";
export const turnosFase3 = "1";
export const turnosFase4 = "1";
export const gruposFase1 = "2";
export const gruposFase2 = "1";
export const gruposFase3 = "0";
export const gruposFase4 = "0";
//export const partsGruposFase1 = "4";
//export const partsGruposFase2 = "4";
//export const partsGruposFase3 = "0";
//export const partsGruposFase4 = "0";
export const classGrupoFase1 = "2";
export const classGrupoFase2 = "0";
export const classGrupoFase3 = "0";
export const classGrupoFase4 = "0";
export const classIndiceTecnicoFase1 = "0";
export const classIndiceTecnicoFase2 = "0";
export const classIndiceTecnicoFase3 = "0";
export const classIndiceTecnicoFase4 = "0";
export const confrontosEtapa1POff = "2";
export const confrontosEtapa2POff = "1";
export const finalSomaFases = "não";
export const finalFutebol = "não";

export const participantesCopa = [
  { nome: "Aaaa", simbolo: "Simbolo do Participante 1" },
  { nome: "Bbbbbbb", simbolo: "Simbolo do Participante 2" },
  { nome: "Cccccc", simbolo: "Simbolo do Participante 3" },
  { nome: "Ddd", simbolo: "Simbolo do Participante 4" },
  { nome: "Eeeeeeeeeeeee", simbolo: "Simbolo do Participante 5" },
  { nome: "F Fffff", simbolo: "Simbolo do Participante 6" },
  { nome: "Ggg", simbolo: "Simbolo do Participante 7" },
  { nome: "Hhhhhhhhh", simbolo: "Simbolo do Participante 8" },
  { nome: "Iii", simbolo: "Simbolo do Participante 9" },
  { nome: "Jjjjjjjjjjjjj", simbolo: "Simbolo do Participante 10" },
  { nome: "Kkk Kkk Kkk", simbolo: "Simbolo do Participante 11" },
  { nome: "Llllllll", simbolo: "Simbolo do Participante 12" },
  { nome: "MMm", simbolo: "Simbolo do Participante 13" },
  { nome: "NnN", simbolo: "Simbolo do Participante 14" },
  { nome: "Oooooooo ooo", simbolo: "Simbolo do Participante 15" },
  { nome: "PPPPPPppppppppppp", simbolo: "Simbolo do Participante 16" },
];

export const placaresPorFaseGrupo: Record<
  number,
  Record<
    string,
    Record<
      number,
      {
        participante1: string;
        participante2: string;
        placarCasa: number;
        placarFora: number;
      }
    >
  >
> = {};
