import { TipoCriterioPontuacaoBolao } from "../../models/TipoCriterioBolao";
import { PontuacaoParticipante } from "../../pages/BolaoPage/BolaoClassificacao";
import { ParticipanteBolao } from "../../stores/bolaoStore";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
import { Palpite } from "../../stores/palpitesStore";
import { Partida } from "../../stores/partidasStore";
import { PremiosIndividuais, PremiosIndividuaisPalpite } from "../../stores/premiosIndividuaisStore";
import { calcularPontosExtra2 } from "./scoreExtra2";
import { calcularPontuacaoPorPartida } from "./scorePorPartida";

export interface PlacarPalpitePontuacao {
  placarCasa: number | null;
  placarFora: number | null;
}

export type PontuacaoParticipantePorJogo = {
  ptsPlacarCravado: number;
  ptsResultado: number;
  ptsDiferencaGols: number;
  ptsGols: number;
}

export function calcularPontuacoesParticipantes(
  participantes: ParticipanteBolao | ParticipanteBolao[],
  palpitesBolao: Record<number, Palpite[]>,
  partidas: Record<string, Partida>,
  premiosIndividuaisPalpite: PremiosIndividuaisPalpite,
  premiosIndividuaisOriginal: PremiosIndividuais,
  pontuacaoCriterios: PontuacaoCriterio[]
): PontuacaoParticipante | PontuacaoParticipante[] {

  const calcularUm = (participante: ParticipanteBolao) => {
    const palpitesDoUsuario = palpitesBolao[participante.userId] || [];

    let ptsPlacarCravado = 0;
    let ptsResultado = 0;
    let ptsGols = 0;
    let ptsDiferencaGols = 0;
    let ptsClassificacaoPenaltis = 0;
    let ptsPlacarCravadoPenaltis = 0;
    let ptsTotalExtra2 = 0;
    let ptsTotalPartidas = 0;
    let ptsTotalParticipante = 0;

    palpitesDoUsuario.forEach((palpite) => {
      const partida = partidas[palpite.partidaId];
      if (!partida) return;

      const pontosDaPartida = calcularPontuacaoPorPartida(
        partida,
        palpite,
        pontuacaoCriterios
      );

      ptsPlacarCravado += pontosDaPartida.ptsPlacarCravado;
      ptsResultado += pontosDaPartida.ptsResultado;
      ptsGols += pontosDaPartida.ptsGols;
      ptsDiferencaGols += pontosDaPartida.ptsDiferencaGols;
      ptsClassificacaoPenaltis += pontosDaPartida.ptsClassificacaoPenaltis;
      ptsPlacarCravadoPenaltis += pontosDaPartida.ptsPlacarCravadoPenaltis;

      ptsTotalPartidas += pontosDaPartida.ptsTotalPartida;
    });

    const pontosExtra2 = calcularPontosExtra2(premiosIndividuaisPalpite,
      premiosIndividuaisOriginal,     
      pontuacaoCriterios.filter(pc => pc.tipo === TipoCriterioPontuacaoBolao.EXTRA_2)
    );

    ptsTotalExtra2 = pontosExtra2.ptsMelhorJogador + pontosExtra2.ptsMelhorGoleiro + pontosExtra2.ptsArtilheiro +
                       pontosExtra2.ptsCampeao + pontosExtra2.ptsViceCampeao + pontosExtra2.ptsTerceiroLugar + pontosExtra2.ptsMelhor1Fase

    ptsTotalParticipante = ptsTotalPartidas + ptsTotalExtra2;

    return {
      userId: participante.userId,
      nome: participante.nome,
      ptsPlacarCravado,
      ptsResultado,
      ptsGols,
      ptsDiferencaGols,
      ptsClassificacaoPenaltis,
      ptsPlacarCravadoPenaltis,
      ptsTotalExtra2,
      ptsTotalParticipante
    };
  };

  if (!Array.isArray(participantes)) {
    return calcularUm(participantes);
  }

  return participantes.map(calcularUm);
}