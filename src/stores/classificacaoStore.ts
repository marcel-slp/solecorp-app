import { create } from 'zustand';
import { PontuacaoParticipante } from '../pages/BolaoPage/BolaoClassificacao';
import { calcularPontuacoesParticipantes } from '../components/TabelaClassificacaoBolao/scoreParticipantes';
import { bolaoStore } from './bolaoStore';
import { palpitesStore } from './palpitesStore';
import { partidasStore } from './partidasStore';
import { criteriosPontuacaoStore } from './criteriosPontuacaoStore';
import { retornaUserId } from '../utils/Utils';
import { premiosIndividuaisStore } from './premiosIndividuaisStore';

export type PontuacaoParticipanteComPosicao = {
  posicao: number,
  participante: string,
  pts: number,
  userId: number,
}

function aplicarRankingComEmpate<T>(
  lista: T[],
  getPontos: (item: T) => number
) {
  let posicaoAtual = 1;
  let ultimaPontuacao: number | null = null;

  return lista.map((item, index) => {
    const pontos = getPontos(item);

    if (ultimaPontuacao !== null && pontos < ultimaPontuacao) {
      posicaoAtual = index + 1;
    }

    ultimaPontuacao = pontos;

    return {
      ...item,
      posicao: posicaoAtual,
    };
  });
}

interface ClassificacaoStore {
  pontuacoes: PontuacaoParticipante[];
  rankingGeral: PontuacaoParticipante[];
  loading: boolean;
  error: string | null;

  carregarClassificacao: (bolaoId: string) => Promise<void>;
  getClassificacaoPorCriterio: (criterioFiltro: string) => PontuacaoParticipanteComPosicao[];
  getRankingAoRedorUsuario: (userId: number, range: number) => PontuacaoParticipante[];
  getTopN: (n: number) => PontuacaoParticipante[];
}

export const classificacaoStore = create<ClassificacaoStore>((set, get) => ({
  pontuacoes: [],
  rankingGeral: [],
  loading: false,
  error: null,

  carregarClassificacao: async (bolaoId: string) => {
    set({ loading: true, error: null });

    try {
      const { carregarParticipantesBolao } = bolaoStore.getState();
      const { carregarPalpitesPorBolao } = palpitesStore.getState();
      const { carregarPartidas } = partidasStore.getState();
      const { carregarPontuacaoCriterios } = criteriosPontuacaoStore.getState();
      const { carregarPremiosIndividuaisOriginal } = premiosIndividuaisStore.getState();

      await Promise.all([
        carregarParticipantesBolao(bolaoId, retornaUserId()),
        carregarPalpitesPorBolao(bolaoId),
        carregarPartidas(1),
        carregarPontuacaoCriterios(bolaoId),
        carregarPremiosIndividuaisOriginal(1)
      ]);

      const { participantesBolao } = bolaoStore.getState();
      const { palpitesBolao } = palpitesStore.getState();
      const { partidas } = partidasStore.getState();
      const { pontuacaoCriterios } = criteriosPontuacaoStore.getState();
      const { premiosIndividuaisOriginal } = premiosIndividuaisStore.getState();

      if (participantesBolao.length === 0) {
        set({ pontuacoes: [], rankingGeral: [], loading: false });
        return;
      }

      if(premiosIndividuaisOriginal === null) {
        return;
      } 

      const pontuacoesCalculadas = calcularPontuacoesParticipantes(
        participantesBolao,
        palpitesBolao,
        partidas,
        premiosIndividuaisOriginal,
        pontuacaoCriterios
      ) as PontuacaoParticipante[];

      const ordenado = [...pontuacoesCalculadas].sort((a, b) =>
          b.ptsTotalParticipante - a.ptsTotalParticipante ||
          a.nome.localeCompare(b.nome)
      );

      const rankingOrdenado = aplicarRankingComEmpate(ordenado,(item) => item.ptsTotalParticipante);

      set({
        pontuacoes: pontuacoesCalculadas,
        rankingGeral: rankingOrdenado,
        loading: false,
      });

    } catch (err) {
      console.error("Erro ao carregar classificação:", err);
      set({ 
        loading: false, 
        error: "Não foi possível carregar a classificação." 
      });
    }
  },

  getClassificacaoPorCriterio: (criterioFiltro: string) => {
    const { pontuacoes } = get();
    if (!pontuacoes.length) return [];

    const lista = pontuacoes.map((p) => {
      let pts = 0;

      if (criterioFiltro === "Geral") {
        pts = p.ptsTotalParticipante;
      } else {
        switch (criterioFiltro) {
          case "Placar Cravado":
            pts = p.ptsPlacarCravado;
            break;
          case "Resultado":
            pts = p.ptsResultado;
            break;
          case "Diferença":
            pts = p.ptsDiferencaGols;
            break;
          case "Gols":
            pts = p.ptsGols;
            break;
          case "Classificação Pênaltis":
            pts = p.ptsPenaltis;
            break;
          case "Extra":
            pts = p.ptsTotalExtra2;
            break;
          case "Classificação Fase Grupos":
            pts = p.ptsClassificacaoFaseGrupos;
            break;
          case "Classificação Playoff":
            pts = p.ptsClassificacaoPlayoff;
            break;
          default:
            pts = 0;
        }
      }

      return {
        posicao: 0,
        participante: p.nome,
        pts,
        userId: p.userId,
      };
    });

    lista.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return a.participante.localeCompare(b.participante);
    });

    return aplicarRankingComEmpate(lista, (item) => item.pts);
  },

  getRankingAoRedorUsuario: (userId: number, range: number = 5) => {
    const { rankingGeral } = get();
    const posicao = rankingGeral.findIndex(r => r.userId === userId);
    
    if (posicao === -1) return rankingGeral.slice(0, 11);

    const inicio = Math.max(0, posicao - range);
    const fim = Math.min(rankingGeral.length, posicao + range + 1);

    return rankingGeral.slice(inicio, fim);
  },

  getTopN: (n: number = 10) => {
    const { rankingGeral } = get();

    if (!rankingGeral.length) return [];

    const posicoes = [...new Set(rankingGeral.map(r => r.posicao))];

    const posicaoLimite = posicoes.find(p => p && p >= n);

    if (!posicaoLimite) return rankingGeral;

    return rankingGeral.filter(r => r.posicao && r.posicao <= posicaoLimite);
  }
}));