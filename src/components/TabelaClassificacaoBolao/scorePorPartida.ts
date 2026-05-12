//import { Placar } from "../../models/generateCopa2026";
import { TipoCriterioPontuacaoBolao } from "../../models/TipoCriterioBolao";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
import { Palpite } from "../../stores/palpitesStore";
import { Partida } from "../../stores/partidasStore";
// import { calcularPontosTipoExtra1 } from "./scoreTipoExtra1";
import { calcularPontosTipoPorJogo } from "./scoreTipoPorJogo";

export type PontuacaoParticipantePorPartida = {
  ptsPlacarCravado: number;
  ptsResultado: number;
  ptsDiferencaGols: number;
  ptsGols: number;
  ptsPenaltis: number;
  ptsTotalPartida: number;
}

export function calcularPontuacaoPorPartida(
  partida: Partida,
  palpite: Palpite,
  pontuacaoCriterios: PontuacaoCriterio[]
): PontuacaoParticipantePorPartida {
  if (partida.placarCasa == null || partida.placarFora == null || palpite.placarCasa == null || palpite.placarFora == null) {
    return {
      ptsPlacarCravado: 0,
      ptsResultado: 0,
      ptsGols: 0,
      ptsDiferencaGols: 0,
      ptsPenaltis: 0,
      ptsTotalPartida: 0
    };
  }

  let ptsPlacarCravado = 0;
  let ptsResultado = 0;
  let ptsGols = 0;
  let ptsDiferencaGols = 0;
  let ptsPenaltis = 0;
  let ptsTotalPartida = 0;

  const pontosPorJogo = calcularPontosTipoPorJogo(
    {
      placarCasa: partida.placarCasa,
      placarFora: partida.placarFora,
      placarPenaltisCasa: partida.placarPenaltisCasa || partida.placarPenaltisCasa !== null ? partida.placarPenaltisCasa : undefined,
      placarPenaltisFora: partida.placarPenaltisFora || partida.placarPenaltisFora !== null ? partida.placarPenaltisFora : undefined,
      grupo: partida.grupo
    }, 
    {
      placarCasa: palpite.placarCasa,
      placarFora: palpite.placarFora,
      placarPenaltisCasa: palpite.placarPenaltisCasa ? palpite.placarPenaltisCasa : undefined,
      placarPenaltisFora: palpite.placarPenaltisFora ? palpite.placarPenaltisFora : undefined,
    }, 
    pontuacaoCriterios.filter(pc => pc.tipo === TipoCriterioPontuacaoBolao.POR_JOGO)
  );

  ptsPlacarCravado += pontosPorJogo.ptsPlacarCravado;
  ptsResultado += pontosPorJogo.ptsResultado;
  ptsGols += pontosPorJogo.ptsGols;
  ptsDiferencaGols += pontosPorJogo.ptsDiferencaGols;
  ptsPenaltis += pontosPorJogo.ptsClassificacaoPenaltis + pontosPorJogo.ptsPlacarCravadoPenaltis;

  // const pontosExtra1 = calcularPontosTipoExtra1(
  //   {
  //     placarPenaltisCasa: partida.placarPenaltisCasa,
  //     placarPenaltisFora: partida.placarPenaltisFora,
  //   }, 
  //   {
  //     placarPenaltisCasa: palpite.placarPenaltisCasa,
  //     placarPenaltisFora: palpite.placarPenaltisFora,
  //   }, 
  //   pontuacaoCriterios.filter(pc => pc.tipo === TipoCriterioPontuacaoBolao.EXTRA_1)
  // );

  // ptsClassificacaoPenaltis += pontosExtra1.ptsClassificacaoPenaltis;
  // ptsPlacarCravadoPenaltis += pontosExtra1.ptsPlacarCravadoPenaltis;

  ptsTotalPartida = pontosPorJogo.ptsDiferencaGols + pontosPorJogo.ptsGols + pontosPorJogo.ptsPlacarCravado + pontosPorJogo.ptsResultado +
                    pontosPorJogo.ptsClassificacaoPenaltis + pontosPorJogo.ptsPlacarCravadoPenaltis

  return {
    ptsPlacarCravado,
    ptsResultado,
    ptsGols,
    ptsDiferencaGols,
    ptsPenaltis,
    ptsTotalPartida
  };
}
