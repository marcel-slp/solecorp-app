//import { Placar } from "../../models/generateCopa2026";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
//import { Palpite } from "../../stores/palpitesStore";
//import { Partida } from "../../stores/partidasStore";

export interface PontuacaoParticipanteConvocacaoBonus {
  //ptsConvocacao: number;
  ptsBonus1: number;
  ptsBonus2: number;
  ptsBonus3: number;
}

export function calcularPontosConvocacaoBonus(
  // partida: Partida,
  // palpite: Placar,
  criteriosConvocacaoBonus: PontuacaoCriterio[]
): PontuacaoParticipanteConvocacaoBonus {
  
  const pontos = {
    //ptsConvocacao: number;
    ptsBonus1: 0,
    ptsBonus2: 0,
    ptsBonus3: 0
  };

  // if (
  //   partida.placarCasa == null ||
  //   partida.placarFora == null ||
  //   palpite.placarCasa == null ||
  //   palpite.placarFora == null
  // ) {
  //   return pontos;
  // }

  criteriosConvocacaoBonus.forEach((criterio) => {
    const valorPontos = criterio.pontos ?? 0;

    if (valorPontos === 0) return;

    //let pontosGanhos = 0;

    switch (criterio.situacao) {
      case "Bônus 1":
        //TODO: FAZER LÓGICA QUANDO TIVER PLACAR DOS PENALTIS
        break;

      case "Bônus 2":
        //TODO: FAZER LÓGICA QUANDO TIVER PLACAR DOS PENALTIS
        break;

      case "Bônus 3":
        //TODO: FAZER LÓGICA QUANDO TIVER LÓGICA DOS GRUPOS
        break;

      // case "Convocação":
      //   //TODO: FAZER LÓGICA QUANDO TIVER LÓGICA DA CONVOCAÇÃO
      //   break;
    }

  });

  return pontos;
}