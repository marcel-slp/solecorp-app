/* eslint-disable no-case-declarations */
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";

export interface PontuacaoParticipanteExtra1 {
  //ptsClassificacaoGrupos: number;
  //ptsClassificacao2Fase: number;
  ptsClassificacaoPenaltis: number;
  ptsPlacarCravadoPenaltis: number;
}

interface PlacarPontosExtra1 {
  placarPenaltisCasa?: number | null;
  placarPenaltisFora?: number | null;
}

export function calcularPontosTipoExtra1(
  partida: PlacarPontosExtra1,
  palpite: PlacarPontosExtra1,
  pontuacaoCriteriosExtra1: PontuacaoCriterio[]
): PontuacaoParticipanteExtra1 {
  
  const pontos = {
    ptsClassificacaoPenaltis: 0,
    ptsPlacarCravadoPenaltis: 0,
    //ptsClassificacaoGrupos: 0,
    //ptsClassificacao2Fase: 0
  };

  if (
    partida.placarPenaltisCasa == null ||
    partida.placarPenaltisFora == null ||
    palpite.placarPenaltisCasa == null ||
    palpite.placarPenaltisFora == null
  ) {
    return pontos;
  }

  pontuacaoCriteriosExtra1.forEach((pontuacaoCriterio) => {
    const valorPontos = pontuacaoCriterio.pontos ?? 0;

    if (valorPontos === 0) return;

    let pontosGanhos = 0;

    switch (pontuacaoCriterio.situacao) {
      case "Placar Cravado Pênaltis":
        if (
          partida.placarPenaltisCasa === palpite.placarPenaltisCasa &&
          partida.placarPenaltisFora === palpite.placarPenaltisFora
        ) {
          pontosGanhos = valorPontos;
        }
        pontos.ptsPlacarCravadoPenaltis += pontosGanhos;
        break;

      case "Classificação Pênaltis":
        const resultadoReal =
          partida.placarPenaltisCasa != null && partida.placarPenaltisFora != null && partida.placarPenaltisCasa > partida.placarPenaltisFora ? "C" : "F";

          const resultadoPalpite = 
            palpite.placarPenaltisCasa != null && palpite.placarPenaltisFora != null && palpite.placarPenaltisCasa > palpite.placarPenaltisFora ? "C" : "F";

        if (resultadoReal === resultadoPalpite) {
          pontosGanhos = valorPontos;
        }
        pontos.ptsClassificacaoPenaltis += pontosGanhos;
        break;

      // case "Classificação Grupos":
      //   //TODO: FAZER LÓGICA QUANDO TIVER LÓGICA DOS GRUPOS
      //   break;

      // case "Classificação para 2ª Fase":
      //   //TODO: FAZER LÓGICA QUANDO TIVER LÓGICA DOS GRUPOS
      //   break;
    }
  });

  return pontos;
}