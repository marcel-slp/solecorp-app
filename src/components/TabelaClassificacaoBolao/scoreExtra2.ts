//import { Placar } from "../../models/generateCopa2026";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
//import { Palpite } from "../../stores/palpitesStore";
//import { Partida } from "../../stores/partidasStore";

export interface PontuacaoParticipanteExtra2 {
  ptsMelhorTime1Fase: number;
  ptsAtaqueArtilheiro: number;
  ptsMVPs: number;
  ptsPodio: number;
}

export function calcularPontosExtra2(
  // partida: Partida,
  // palpite: Placar,
  criteriosExtra2: PontuacaoCriterio[]
): PontuacaoParticipanteExtra2 {
  
  const pontos = {
    ptsMelhorTime1Fase: 0,
    ptsAtaqueArtilheiro: 0,
    ptsMVPs: 0,
    ptsPodio: 0
  };

  // if (
  //   partida.placarCasa == null ||
  //   partida.placarFora == null ||
  //   palpite.placarCasa == null ||
  //   palpite.placarFora == null
  // ) {
  //   return pontos;
  // }

  criteriosExtra2.forEach((criterio) => {
    const valorPontos = criterio.pontos ?? 0;

    if (valorPontos === 0) return;

    //let pontosGanhos = 0;

    switch (criterio.situacao) {
      case "Melhor time 1ª Fase":
        //TODO: FAZER LÓGICA QUANDO TIVER PLACAR DOS PENALTIS
        break;

      case "Ataque/Artilheiro":
        //TODO: FAZER LÓGICA QUANDO TIVER PLACAR DOS PENALTIS
        break;

      // case "MVPs":
      //   //TODO: FAZER LÓGICA QUANDO TIVER LÓGICA DOS GRUPOS
      //   break;

      // case "Pódio":
      //   //TODO: FAZER LÓGICA QUANDO TIVER LÓGICA DOS GRUPOS
      //   break;
    }

  });

  return pontos;
}