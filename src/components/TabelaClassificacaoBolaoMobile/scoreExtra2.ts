import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
import { PremiosIndividuais } from "../../stores/premiosIndividuaisStore";
import { PremiosIndividuaisPalpiteEscolhas } from "./scoreParticipantes";

export interface PontuacaoParticipanteExtra2 {
  ptsMelhorJogador: number;
  ptsMelhorGoleiro: number;
  ptsArtilheiro: number;
  ptsCampeao: number;
  ptsViceCampeao: number;
  ptsTerceiroLugar: number;
  ptsMelhor1Fase: number;
}

export function calcularPontosExtra2(
  premiosIndividuaisPalpite: PremiosIndividuaisPalpiteEscolhas,
  premiosIndividuaisOriginal: PremiosIndividuais,
  criteriosExtra2: PontuacaoCriterio[]
): PontuacaoParticipanteExtra2 {

  const pontos: PontuacaoParticipanteExtra2 = {
    ptsMelhorJogador: 0,
    ptsMelhorGoleiro: 0,
    ptsArtilheiro: 0,
    ptsCampeao: 0,
    ptsViceCampeao: 0,
    ptsTerceiroLugar: 0,
    ptsMelhor1Fase: 0,
  };

  const acertou = (palpite?: string | null, original?: string | null): boolean =>
    !!(palpite && original && palpite === original);

  criteriosExtra2.forEach((criterio) => {
    const valor = criterio.pontos ?? 0;
    if (valor === 0) return;

    switch (criterio.situacao) {
      case "Melhor Jogador":
        if (acertou(premiosIndividuaisPalpite.melhorJogador, premiosIndividuaisOriginal.melhorJogador)) {
          pontos.ptsMelhorJogador += valor;
        }
        break;

      case "Melhor Goleiro":
        if (acertou(premiosIndividuaisPalpite.melhorGoleiro, premiosIndividuaisOriginal.melhorGoleiro)) {
          pontos.ptsMelhorGoleiro += valor;
        }
        break;

      case "Artilheiro":
        if (acertou(premiosIndividuaisPalpite.artilheiro, premiosIndividuaisOriginal.artilheiro)) {
          pontos.ptsArtilheiro += valor;
        }
        break;

      case "Campeão":
        if (acertou(premiosIndividuaisPalpite.campeao, premiosIndividuaisOriginal.campeao)) {
          pontos.ptsCampeao += valor;
        }
        break;

      case "Vice Campeão":
        if (acertou(premiosIndividuaisPalpite.viceCampeao, premiosIndividuaisOriginal.viceCampeao)) {
          pontos.ptsViceCampeao += valor;
        }
        break;

      case "Terceiro Lugar":
        if (acertou(premiosIndividuaisPalpite.terceiroLugar, premiosIndividuaisOriginal.terceiroLugar)) {
          pontos.ptsTerceiroLugar += valor;
        }
        break;

      case "Melhor time 1ª Fase":
        if (acertou(premiosIndividuaisPalpite.melhor1Fase, premiosIndividuaisOriginal.melhor1Fase)) {
          pontos.ptsMelhor1Fase += valor;
        }
        break;
    }
  });

  return pontos;
}
