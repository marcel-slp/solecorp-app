// import { calcularPontosPorJogo } from "./scoreTipoPorJogo";
// import { Criterio } from "../../stores/criteriosPontuacaoStore";
// import { Partida } from "../../stores/partidasStore";
// import { Palpite } from "../../stores/palpitesStore";
// import { ParticipanteBolao } from "../../stores/bolaoStore";
// import { PontuacaoParticipante } from "../../pages/BolaoPage/BolaoClassificacao";
// import { calcularPontosExtra1 } from "./scoreTipoExtra1";

// export function calcularPontuacoesParticipantes(
//   participantes: ParticipanteBolao | ParticipanteBolao[],
//   palpitesBolao: Record<number, Palpite[]>,
//   partidas: Record<string, Partida>,
//   criterios: Criterio[]
// ): PontuacaoParticipante | PontuacaoParticipante[] {

//   const criterioPorJogo = criterios.filter(c => c.tipo === "porJogo");
//   const criterioExtra1 = criterios.filter(c => c.tipo === "extra1");

//   const calcularUm = (participante: ParticipanteBolao): PontuacaoParticipante => {
//     const palpitesDoUsuario = palpitesBolao[participante.userId] || [];

//     let ptsPlacarCravado = 0;
//     let ptsResultado = 0;
//     let ptsGols = 0;
//     let ptsDiferencaGols = 0;
//     let ptsClassificacaoPenaltis = 0;
//     let ptsPlacarCravadoPenaltis = 0;

//     palpitesDoUsuario.forEach((palpite) => {
//       const partida = partidas[palpite.partidaId];
//       if (!partida) return;

//       const pontosPorJogo = calcularPontosPorJogo(partida, {
//         placarCasa: palpite.placarCasa,
//         placarFora: palpite.placarFora,
//       }, criterioPorJogo);

//       ptsPlacarCravado += pontosPorJogo.ptsPlacarCravado;
//       ptsResultado += pontosPorJogo.ptsResultado;
//       ptsGols += pontosPorJogo.ptsGols;
//       ptsDiferencaGols += pontosPorJogo.ptsDiferencaGols;

//       const pontosExtra1 = calcularPontosExtra1(
//                 partida, 
//                 {
//                   placarPenaltisCasa: palpite.placarPenaltisCasa,
//                   placarPenaltisFora: palpite.placarPenaltisFora,
//                 },
//                 criterioExtra1
//               );
      
//         ptsClassificacaoPenaltis += pontosExtra1.ptsClassificacaoPenaltis;
//         ptsPlacarCravadoPenaltis += pontosExtra1.ptsPlacarCravadoPenaltis;
//     });

//     return {
//       userId: participante.userId,
//       nome: participante.nome,
//       ptsPlacarCravado,
//       ptsResultado,
//       ptsGols,
//       ptsDiferencaGols,
//       ptsClassificacaoPenaltis,
//       ptsPlacarCravadoPenaltis,
//       ptsTotal: ptsPlacarCravado + ptsResultado + ptsGols + ptsDiferencaGols + ptsClassificacaoPenaltis + ptsPlacarCravadoPenaltis
//     };
//   };

//   // Se recebeu apenas 1 participante → retorna objeto único
//   if (!Array.isArray(participantes)) {
//     return calcularUm(participantes);
//   }

//   // Se recebeu array → calcula para todos
//   return participantes.map(calcularUm);
// }