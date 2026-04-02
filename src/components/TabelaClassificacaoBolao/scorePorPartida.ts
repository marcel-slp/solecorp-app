//import { Placar } from "../../models/generateCopa2026";
import { TipoCriterioPontuacaoBolao } from "../../models/TipoCriterioBolao";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
import { Palpite } from "../../stores/palpitesStore";
import { Partida } from "../../stores/partidasStore";
import { calcularPontosTipoExtra1 } from "./scoreTipoExtra1";
import { calcularPontosTipoPorJogo } from "./scoreTipoPorJogo";

export type PontuacaoParticipantePorPartida = {
  ptsPlacarCravado: number;
  ptsResultado: number;
  ptsDiferencaGols: number;
  ptsGols: number;
  ptsClassificacaoPenaltis: number;
  ptsPlacarCravadoPenaltis: number;
  ptsTotalPartida: number;
  //partidaId: string;
}

export function calcularPontuacaoPorPartida(
  partida: Partida,
  palpite: Palpite,
  pontuacaoCriterios: PontuacaoCriterio[]
): PontuacaoParticipantePorPartida {
  if (partida.placarCasa == null || partida.placarFora == null || palpite.placarCasa == null || palpite.placarFora == null) {
    return {
      //partidaId: partida.id,
      ptsPlacarCravado: 0,
      ptsResultado: 0,
      ptsGols: 0,
      ptsDiferencaGols: 0,
      ptsClassificacaoPenaltis: 0,
      ptsPlacarCravadoPenaltis: 0,
      ptsTotalPartida: 0
    };
  }

  let ptsPlacarCravado = 0;
  let ptsResultado = 0;
  let ptsGols = 0;
  let ptsDiferencaGols = 0;
  let ptsClassificacaoPenaltis = 0;
  let ptsPlacarCravadoPenaltis = 0;
  let ptsTotalPartida = 0;

  const pontosPorJogo = calcularPontosTipoPorJogo(
    {
      placarCasa: partida.placarCasa,
      placarFora: partida.placarFora,
      grupo: partida.grupo
    }, 
    {
      placarCasa: palpite.placarCasa,
      placarFora: palpite.placarFora,
    }, 
    pontuacaoCriterios.filter(pc => pc.tipo === TipoCriterioPontuacaoBolao.POR_JOGO)
  );

  ptsPlacarCravado += pontosPorJogo.ptsPlacarCravado;
  ptsResultado += pontosPorJogo.ptsResultado;
  ptsGols += pontosPorJogo.ptsGols;
  ptsDiferencaGols += pontosPorJogo.ptsDiferencaGols;

  const pontosExtra1 = calcularPontosTipoExtra1(
    {
      placarPenaltisCasa: partida.placarPenaltisCasa,
      placarPenaltisFora: partida.placarPenaltisFora,
    }, 
    {
      placarPenaltisCasa: palpite.placarPenaltisCasa,
      placarPenaltisFora: palpite.placarPenaltisFora,
    }, 
    pontuacaoCriterios.filter(pc => pc.tipo === TipoCriterioPontuacaoBolao.EXTRA_1)
  );

  ptsClassificacaoPenaltis += pontosExtra1.ptsClassificacaoPenaltis;
  ptsPlacarCravadoPenaltis += pontosExtra1.ptsPlacarCravadoPenaltis;

  ptsTotalPartida = pontosPorJogo.ptsDiferencaGols + pontosPorJogo.ptsGols + pontosPorJogo.ptsPlacarCravado + pontosPorJogo.ptsResultado +
                    pontosExtra1.ptsClassificacaoPenaltis + pontosExtra1.ptsPlacarCravadoPenaltis

  return {
    //partidaId: partida.id,
    ptsPlacarCravado,
    ptsResultado,
    ptsGols,
    ptsDiferencaGols,
    ptsClassificacaoPenaltis,
    ptsPlacarCravadoPenaltis,
    ptsTotalPartida
  };
}

// export function calcularPontosPorPartida(
//   partida: Partida,
//   palpite: PlacarPalpitePontuacao,
//   criteriosPorJogo: Criterio[]
// ): PontuacaoParticipantePorJogo {
  
//   const pontos = {
//     ptsPlacarCravado: 0,
//     ptsResultado: 0,
//     ptsDiferencaGols: 0,
//     ptsGols: 0
//   };

//   if (
//     partida.placarCasa === null ||
//     partida.placarFora === null ||
//     palpite.placarCasa === null ||
//     palpite.placarFora === null
//   ) {
//     return pontos;
//   }

//   const isPrimeiraFase = partida.grupo !== null && partida.grupo !== undefined;

//   criteriosPorJogo.forEach((criterio) => {
//     const valorPontos = isPrimeiraFase
//       ? criterio.pontosPrimeiraFase ?? 0
//       : criterio.pontosSegundaFase ?? 0;

//     if (valorPontos === 0) return;

//     let pontosGanhos = 0;

//     switch (criterio.situacao) {
//       case "Placar Cravado":
//         if (
//           partida.placarCasa === palpite.placarCasa &&
//           partida.placarFora === palpite.placarFora
//         ) {
//           pontosGanhos = valorPontos;
//         }
//         pontos.ptsPlacarCravado += pontosGanhos;
//         break;

//       case "Resultado":        
//         const resultadoReal =
//           partida.placarCasa > partida.placarFora ? "C" :
//           partida.placarCasa < partida.placarFora ? "F" : "E";

//           const resultadoPalpite = 
//             palpite.placarCasa != null && palpite.placarFora != null && palpite.placarCasa > palpite.placarFora ? "C" :
//             palpite.placarCasa != null && palpite.placarFora != null && palpite.placarCasa < palpite.placarFora ? "F" : "E";

//         // let resultadoPalpite;
//         // if(palpite.placarCasa != undefined && palpite.placarFora != undefined) {
//         //   resultadoPalpite =
//         //     palpite.placarCasa > palpite.placarFora ? "C" :
//         //     palpite.placarCasa < palpite.placarFora ? "F" : "E";
//         // }

//         if (resultadoReal === resultadoPalpite) {
//           pontosGanhos = valorPontos;
//         }
//         pontos.ptsResultado += pontosGanhos;
//         break;

//       case "Diferença":
//         const diffReal = Math.abs(partida.placarCasa - partida.placarFora);
//         let diffPalpite;
//         if(palpite.placarCasa != undefined && palpite.placarFora != undefined) {
//           diffPalpite = Math.abs(palpite.placarCasa - palpite.placarFora);
//         }

//         if (diffReal === diffPalpite) {
//           pontosGanhos = valorPontos;
//         }
//         pontos.ptsDiferencaGols += pontosGanhos;
//         break;

//       case "Gols":
//         if (partida.placarCasa === palpite.placarCasa) {
//           pontosGanhos += valorPontos;
//         }
//         if (partida.placarFora === palpite.placarFora) {
//           pontosGanhos += valorPontos;
//         }
//         pontos.ptsGols += pontosGanhos;
//         break;
//     }
//   });

//   return pontos;
// }

