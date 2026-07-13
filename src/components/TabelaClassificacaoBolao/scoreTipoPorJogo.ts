/* eslint-disable no-case-declarations */
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";

interface PlacarPalpitePontosPorJogo {
  placarCasa: number | null;
  placarFora: number | null;
  placarPenaltisCasa?: number;
  placarPenaltisFora?: number;
}

interface PlacarPartidaPontosPorJogo {
  placarCasa: number | null;
  placarFora: number | null;
  placarPenaltisCasa?: number;
  placarPenaltisFora?: number;
  grupo?: string;
}

type PontuacaoParticipantePorJogo = {
  ptsPlacarCravado: number;
  ptsResultado: number;
  ptsDiferencaGols: number;
  ptsGols: number;
  ptsPlacarCravadoPenaltis: number;
  ptsClassificacaoPenaltis: number;
}

export function calcularPontosTipoPorJogo(
  partida: PlacarPartidaPontosPorJogo,
  palpite: PlacarPalpitePontosPorJogo,
  pontuacaoCriteriosPorJogo: PontuacaoCriterio[]
): PontuacaoParticipantePorJogo {
  
  const pontos = {
    ptsPlacarCravado: 0,
    ptsResultado: 0,
    ptsDiferencaGols: 0,
    ptsGols: 0,
    ptsPlacarCravadoPenaltis: 0,
    ptsClassificacaoPenaltis: 0
  };

  if (
    partida.placarCasa == null ||
    partida.placarFora == null ||
    palpite.placarCasa == null ||
    palpite.placarFora == null
  ) {
    return pontos;
  }

  const temPlacarPenaltisValido = (p: PlacarPalpitePontosPorJogo): boolean => 
    p.placarPenaltisCasa != null && 
    p.placarPenaltisFora != null && 
    p.placarPenaltisCasa !== p.placarPenaltisFora;

  const isPrimeiraFase = partida.grupo !== null && partida.grupo !== undefined;

  pontuacaoCriteriosPorJogo.forEach((pontuacaoCriterio) => {
    const valorPontos = isPrimeiraFase
      ? pontuacaoCriterio.pontosPrimeiraFase ?? 0
      : pontuacaoCriterio.pontosSegundaFase ?? 0;

    if (valorPontos === 0) return;

    let pontosGanhos = 0;

    switch (pontuacaoCriterio.situacao) {
      case "Placar Cravado":
        if (
          partida.placarCasa === palpite.placarCasa &&
          partida.placarFora === palpite.placarFora
        ) {
          pontosGanhos = valorPontos;
        }
        pontos.ptsPlacarCravado += pontosGanhos;
        break;

      case "Resultado":        
        const resultadoReal =
          partida.placarCasa != null && partida.placarFora != null && partida.placarCasa > partida.placarFora ? "C" :
          partida.placarCasa != null && partida.placarFora != null && partida.placarCasa < partida.placarFora ? "F" : "E";

          const resultadoPalpite = 
            palpite.placarCasa != null && palpite.placarFora != null && palpite.placarCasa > palpite.placarFora ? "C" :
            palpite.placarCasa != null && palpite.placarFora != null && palpite.placarCasa < palpite.placarFora ? "F" : "E";

        if (resultadoReal === resultadoPalpite) {
          pontosGanhos = valorPontos;
        }
        pontos.ptsResultado += pontosGanhos;
        break;

      case "Diferença":
        let diffReal;
        let diffPalpite;

        if(palpite.placarCasa != undefined && palpite.placarFora != undefined && partida.placarCasa != undefined && partida.placarFora != undefined) {
          diffReal = Math.abs(partida.placarCasa - partida.placarFora);
          diffPalpite = Math.abs(palpite.placarCasa - palpite.placarFora);

          if (diffReal === diffPalpite) {
            pontosGanhos = valorPontos;
          }

          pontos.ptsDiferencaGols += pontosGanhos;
        }
        break;

      case "Gols":
        if (partida.placarCasa === palpite.placarCasa) {
          pontosGanhos += valorPontos;
        }
        if (partida.placarFora === palpite.placarFora) {
          pontosGanhos += valorPontos;
        }
        pontos.ptsGols += pontosGanhos;
        break;

      case "Placar Cravado Pênaltis":
        if (temPlacarPenaltisValido(partida) && temPlacarPenaltisValido(palpite)) {
          if (
            partida.placarPenaltisCasa === palpite.placarPenaltisCasa &&
            partida.placarPenaltisFora === palpite.placarPenaltisFora
          ) {
            pontosGanhos = valorPontos;
          }
        }
        pontos.ptsPlacarCravadoPenaltis += pontosGanhos;
        break;

      case "Classificação Pênaltis":
        if (temPlacarPenaltisValido(partida) && temPlacarPenaltisValido(palpite)) {
          const resultadoRealPenaltis = 
            partida.placarPenaltisCasa! > partida.placarPenaltisFora! ? "C" : "F";

          const resultadoPalpitePenaltis = 
            palpite.placarPenaltisCasa! > palpite.placarPenaltisFora! ? "C" : "F";

          if (resultadoRealPenaltis === resultadoPalpitePenaltis) {
            pontosGanhos = valorPontos;
          }
        }
        pontos.ptsClassificacaoPenaltis += pontosGanhos;
        break;
    }
  });

  return pontos;
}