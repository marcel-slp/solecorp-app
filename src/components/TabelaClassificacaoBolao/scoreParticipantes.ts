import { TipoCriterioPontuacaoBolao } from "../../models/TipoCriterioBolao";
import { PontuacaoParticipante } from "../../pages/BolaoPage/BolaoClassificacao";
import { ParticipanteBolao } from "../../stores/bolaoStore";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
import { Palpite } from "../../stores/palpitesStore";
import { Partida } from "../../stores/partidasStore";
import { PremiosIndividuais } from "../../stores/premiosIndividuaisStore";
import { calcularPontosExtra2 } from "./scoreExtra2";
import { calcularPontuacaoPorPartida } from "./scorePorPartida";

export interface PremiosIndividuaisPalpiteEscolhas {
  melhorJogador?: string | null;
  melhorGoleiro?: string | null;
  artilheiro?: string | null;
  campeao?: string | null;
  viceCampeao?: string | null;
  terceiroLugar?: string | null;
  melhor1Fase?: string | null;
}

export function calcularPontuacoesParticipantes(
  participantes: ParticipanteBolao | ParticipanteBolao[],
  palpitesBolao: Record<number, Palpite[]>,
  partidas: Record<string, Partida>,
  premiosIndividuaisOriginal: PremiosIndividuais,
  pontuacaoCriterios: PontuacaoCriterio[]
): PontuacaoParticipante | PontuacaoParticipante[] {

  const calcularUm = (participante: ParticipanteBolao): PontuacaoParticipante => {
    const palpitesDoUsuario = palpitesBolao[participante.userId] || [];

    const pontosDasPartidas = palpitesDoUsuario.reduce((acc, palpite) => {
      const partida = partidas[palpite.partidaId];
      if (!partida) return acc;

      const pts = calcularPontuacaoPorPartida(partida, palpite, pontuacaoCriterios);

      const isGrupo = partida.grupo !== null;

      return {
        ptsPlacarCravado: acc.ptsPlacarCravado + pts.ptsPlacarCravado,
        ptsResultado: acc.ptsResultado + pts.ptsResultado,
        ptsGols: acc.ptsGols + pts.ptsGols,
        ptsDiferencaGols: acc.ptsDiferencaGols + pts.ptsDiferencaGols,
        ptsClassificacaoPenaltis: acc.ptsClassificacaoPenaltis + pts.ptsClassificacaoPenaltis,
        ptsPlacarCravadoPenaltis: acc.ptsPlacarCravadoPenaltis + pts.ptsPlacarCravadoPenaltis,
        ptsClassificacaoFaseGrupos: acc.ptsClassificacaoFaseGrupos + (isGrupo ? pts.ptsTotalPartida : 0),
        ptsClassificacaoPlayoff: acc.ptsClassificacaoPlayoff + (!isGrupo ? pts.ptsTotalPartida : 0),
        ptsTotalPartidas: acc.ptsTotalPartidas + pts.ptsTotalPartida,
      };
    }, {
      ptsPlacarCravado: 0,
      ptsResultado: 0,
      ptsGols: 0,
      ptsDiferencaGols: 0,
      ptsClassificacaoPenaltis: 0,
      ptsPlacarCravadoPenaltis: 0,
      ptsClassificacaoFaseGrupos: 0,
      ptsClassificacaoPlayoff: 0,
      ptsTotalPartidas: 0,
    });

    const palpiteUsuarioPremiosIndividuais: PremiosIndividuaisPalpiteEscolhas = {
      melhorJogador: participante.melhorJogador,
      melhorGoleiro: participante.melhorGoleiro,
      artilheiro: participante.artilheiro,
      campeao: participante.campeao,
      viceCampeao: participante.viceCampeao,
      terceiroLugar: participante.terceiroLugar,
      melhor1Fase: participante.melhor1Fase,
    }

    const pontosExtra2 = calcularPontosExtra2(
      palpiteUsuarioPremiosIndividuais, 
      premiosIndividuaisOriginal, 
      pontuacaoCriterios.filter(pc => pc.tipo === TipoCriterioPontuacaoBolao.EXTRA_2)
    );

    const ptsTotalExtra2 = 
      pontosExtra2.ptsMelhorJogador +
      pontosExtra2.ptsMelhorGoleiro +
      pontosExtra2.ptsArtilheiro +
      pontosExtra2.ptsCampeao +
      pontosExtra2.ptsViceCampeao +
      pontosExtra2.ptsTerceiroLugar +
      pontosExtra2.ptsMelhor1Fase;

    const ptsTotalParticipante = pontosDasPartidas.ptsTotalPartidas + ptsTotalExtra2;

    return {
      userId: participante.userId,
      nome: participante.nome,
      ...pontosDasPartidas,
      ptsTotalExtra2,
      ptsTotalParticipante,
    };
  };

  return Array.isArray(participantes) 
    ? participantes.map(calcularUm) 
    : calcularUm(participantes);
}
