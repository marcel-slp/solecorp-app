import { PontuacaoParticipante } from "../../pages/BolaoPage/BolaoClassificacao";
import { ParticipanteBolao } from "../../stores/bolaoStore";
import { PontuacaoCriterio } from "../../stores/criteriosPontuacaoStore";
import { Palpite } from "../../stores/palpitesStore";
import { Partida } from "../../stores/partidasStore";
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
  pontuacaoCriterios: PontuacaoCriterio[]
): PontuacaoParticipante | PontuacaoParticipante[] {
  
  // const criteriosPorJogo = criterios.filter(c => c.tipo === "porJogo");
  // const criteriosExtra1 = criterios.filter(c => c.tipo === "extra1");

  const calcularUm = (participante: ParticipanteBolao) => {
    const palpitesDoUsuario = palpitesBolao[participante.userId] || [];

    let ptsPlacarCravado = 0;
    let ptsResultado = 0;
    let ptsGols = 0;
    let ptsDiferencaGols = 0;
    let ptsClassificacaoPenaltis = 0;
    let ptsPlacarCravadoPenaltis = 0;
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

      ptsTotalParticipante += pontosDaPartida.ptsTotalPartida;
    });

    return {
      userId: participante.userId,
      nome: participante.nome,
      ptsPlacarCravado,
      ptsResultado,
      ptsGols,
      ptsDiferencaGols,
      ptsClassificacaoPenaltis,
      ptsPlacarCravadoPenaltis,
      ptsTotalParticipante
    };
  };

  if (!Array.isArray(participantes)) {
    return calcularUm(participantes);
  }

  return participantes.map(calcularUm);
}