//import { getTabelaPadrao } from "./components/ProcessamentoTabelas/ProcTab";
import * as caminho from "./components/ProcessamentoTabelas/Caminho";
import { getGabarito, getModelo } from "./components/ProcessamentoTabelas/Controle";

function safe<T>(value: T | undefined, fallback: T): T {
  return value !== undefined && value !== null ? value : fallback;
}

export const nometorneio = safe(caminho.nomeEvento, "Evento Padrão");
export const simboloEventoPath = safe(caminho.imagemEvento, "/images/SimbEventoPadrao.jpg");
// export const tipotorneio =
//   safe(caminho.modalidadeEsportiva, 1) === 1 ? "campeonato" : "torneio";
export const fases = caminho.fases;
export const criterioDesempate = safe(caminho.desempate, "por pênaltis");

export const gruposfase1 = parseInt(safe(caminho.gruposFase1, "1"));
export const gruposfase2 = parseInt(safe(caminho.gruposFase2, "1"));
export const gruposfase3 = parseInt(safe(caminho.gruposFase3, "0"));
export const gruposfase4 = parseInt(safe(caminho.gruposFase4, "0"));

export const turnosfase1 = parseInt(safe(caminho.turnosFase1, "1"));
export const turnosfase2 = parseInt(safe(caminho.turnosFase2, "1"));
export const turnosfase3 = parseInt(safe(caminho.turnosFase3, "0"));
export const turnosfase4 = parseInt(safe(caminho.turnosFase4, "0"));

export const classificamfase1 = parseInt(safe(caminho.classGrupoFase1, "1"));
export const classificamfase2 = parseInt(safe(caminho.classGrupoFase2, "1"));
export const classificamfase3 = parseInt(safe(caminho.classGrupoFase3, "0"));
export const classificamfase4 = parseInt(safe(caminho.classGrupoFase4, "0"));

export const gabaritoFase1 = getGabarito(1);
export const gabaritoFase2 = getGabarito(2);
export const gabaritoFase3 = getGabarito(3);
export const gabaritoFase4 = getGabarito(4);

export const modeloFase1 = getModelo(1);
export const modeloFase2 = getModelo(2);
export const modeloFase3 = getModelo(3);
export const modeloFase4 = getModelo(4);

// Mapa de participantes, tabelas, índices de jogos e placeholders por fase e grupo
export const letraParaNome: Record<number, Record<string, string>> = {};
export const letraParaSimbolo: Record<number, Record<string, string>> = {};
export const letraParaNomeEhPlaceholder: Record<
  number,
  Record<string, boolean>
> = {};
export const caminhoTabelaPorGrupo: Record<
  number,
  Record<
    string,
    {
      participantes: number;
      rodadas: number;
      jogos: number;
      rodadasDetalhes: string[][];
    }
  >
> = {};
export const jogoIndicesPorGrupo: Record<
  number,
  Record<string, number[][]>
> = {};

// const participantesPorFase = [
//   parseInt(safe(caminho.partsFase1, "0")),
//   parseInt(safe(caminho.partsFase2, "0")),
//   parseInt(safe(caminho.partsFase3, "0")),
//   parseInt(safe(caminho.partsFase4, "0")),
// ];
// const gruposPorFase = [gruposfase1, gruposfase2, gruposfase3, gruposfase4];

// const listaParticipantes = safe(caminho.participantesCopa, []);
// let participanteIdx = 0;
// let globalJogoIndex = 1;

// for (let fase = 1; fase <= fases; fase++) {
//   letraParaNome[fase] = {};
//   letraParaSimbolo[fase] = {};
//   letraParaNomeEhPlaceholder[fase] = {};
//   caminhoTabelaPorGrupo[fase] = {};
//   jogoIndicesPorGrupo[fase] = {};

//   const numParticipantes = participantesPorFase[fase - 1];
//   const numGrupos = gruposPorFase[fase - 1];
//   if (numGrupos === 0) continue;

//   // Calcular participantes por grupo
//   const basePartsPorGrupo = Math.floor(numParticipantes / numGrupos);
//   const extraParts = numParticipantes % numGrupos;
//   const partsPorGrupo: number[] = Array(numGrupos).fill(basePartsPorGrupo);
//   for (let i = 0; i < extraParts; i++) {
//     partsPorGrupo[i]++;
//   }

//   const letrasGrupo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   const maxRodadas = Math.max(
//     ...partsPorGrupo.map((numParts) => {
//       const codigoTabela = numParts.toString().padStart(2, "0");
//       const tabela = getTabelaPadrao(codigoTabela);
//       return tabela.rodadas;
//     })
//   );

//   // Initialize structures and assign participants
//   for (let g = 0; g < numGrupos; g++) {
//     const letraGrupo = letrasGrupo[g];
//     const numPartsGrupo = partsPorGrupo[g];
//     const codigoTabela = numPartsGrupo.toString().padStart(2, "0");
//     const tabelaPadrao = getTabelaPadrao(codigoTabela);

//     caminhoTabelaPorGrupo[fase][letraGrupo] = {
//       participantes: numPartsGrupo,
//       rodadas: tabelaPadrao.rodadas,
//       jogos: tabelaPadrao.jogos,
//       rodadasDetalhes: tabelaPadrao.rodadasDetalhes,
//     };

//     jogoIndicesPorGrupo[fase][letraGrupo] = Array(tabelaPadrao.rodadas)
//       .fill(0)
//       .map(() => Array(tabelaPadrao.jogos).fill(0));

//     for (let i = 0; i < numPartsGrupo; i++) {
//       const letra = String.fromCharCode(65 + i);
//       const key = letraGrupo + letra;
//       const participante = listaParticipantes[participanteIdx];
//       letraParaNome[fase][key] =
//         participante?.nome ||
//         `Participante ${i + 1} Fase ${fase} Grupo ${letraGrupo}`;
//       letraParaNomeEhPlaceholder[fase][key] = !participante?.nome;
//       letraParaSimbolo[fase][key] = participante?.simbolo
//         ? "/images/" + participante.simbolo + ".jpg"
//         : "/images/SimbPartPadrao.jpg";
//       if (participante) participanteIdx++;
//     }
//   }

//   // Assign game numbers by round across all groups
//   for (let rodada = 0; rodada < maxRodadas; rodada++) {
//     for (let g = 0; g < numGrupos; g++) {
//       const letraGrupo = letrasGrupo[g];
//       const tabela = caminhoTabelaPorGrupo[fase][letraGrupo];
//       if (rodada < tabela.rodadas) {
//         for (let jogo = 0; jogo < tabela.jogos; jogo++) {
//           jogoIndicesPorGrupo[fase][letraGrupo][rodada][jogo] =
//             globalJogoIndex++;
//         }
//       }
//     }
//   }
// }
