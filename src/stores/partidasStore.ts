import { create } from "zustand";
import { buscarPartidasPorCampeonatoId, editarPartidas } from "../api";

export interface Partida {
  id: string;
  campeonatoId: number;
  numeroPartida: number;
  dataJogo: string;
  horaJogo: string;
  localJogo: string;
  timeCasa: string;
  timeFora: string;
  simboloCasa: string;
  simboloFora: string;
  placarCasa: number;
  placarFora: number;
  placarPenaltisCasa?: number | null;
  placarPenaltisFora?: number | null;
  grupo?: string;
  fase?: string;
}

export interface PartidaDTO {
  id: string;
  numeroPartida: number;
  timeCasa: string | null;
  timeFora: string | null;
  placarCasa: number | null;
  placarFora: number | null;
  placarPenaltisCasa?: number | null;
  placarPenaltisFora?: number | null;
  dataJogo?: string;
  horaJogo?: string;
  localJogo?: string;
}

export interface PartidaCamposAtualizaveis {
  numeroPartida?: string;
  timeCasa?: string;
  timeFora?: string;
  dataJogo?: string | null;
  horaJogo?: string | null;
  localJogo?: string | null;
  placarCasa?: number | string | null;
  placarFora?: number | string | null;
  placarPenaltisCasa?: number | string | null;
  placarPenaltisFora?: number | string | null;
}

interface PartidasStore {
  partidas: Record<string, Partida>
  carregarPartidas: (campeonatoId: number) => void
  atualizarInfoPartida: (idPartidaAtual: string, dadosAtualizados: PartidaCamposAtualizaveis) => boolean
  editarPartidas: (novasPartidas: PartidaDTO[])  => Promise<boolean>
  limparTodos: () => void
}

export type NovaPatida = Omit<Partida, 'id'>

export const partidasStore = create<PartidasStore>((set) => ({
  partidas: {},

  carregarPartidas: async (campeonatoId) => {
    try {
      const response = await buscarPartidasPorCampeonatoId(campeonatoId);
      
      if (response.success && response.data) {
        const mapa = Object.fromEntries(response.data.map(p => [p.id, p]));
        set({ partidas: mapa });
      } else {
        console.error("Erro ao carregar partida:", response.error);
        return null;
      }
    } catch (err) {
      console.error('Falha ao carregar partida:', err);
      return null;
    }
  },

  atualizarInfoPartida: (idPartidaAtual, dadosAtualizados) => {
    try {
      set((state) => {
        const partidaAtual = state.partidas[idPartidaAtual];

        if (!partidaAtual) {
          console.error(`Partida ${idPartidaAtual} não encontrada`);
          return state;
        }

        const partidaAtualizada: Partida = {
          ...partidaAtual,
          ...(dadosAtualizados.numeroPartida !== undefined && {
            numeroPartida: Number(dadosAtualizados.numeroPartida),
          }),
          ...(dadosAtualizados.placarCasa !== undefined && {
            placarCasa:
              dadosAtualizados.placarCasa === "" ||
              dadosAtualizados.placarCasa === null
                ? undefined
                : Number(dadosAtualizados.placarCasa),
          }),
          ...(dadosAtualizados.placarFora !== undefined && {
            placarFora:
              dadosAtualizados.placarFora === "" ||
              dadosAtualizados.placarFora === null
                ? undefined
                : Number(dadosAtualizados.placarFora),
          }),
          ...(dadosAtualizados.placarPenaltisCasa !== undefined && {
            placarPenaltisCasa:
              dadosAtualizados.placarPenaltisCasa === "" ||
              dadosAtualizados.placarPenaltisCasa === null
                ? null
                : Number(dadosAtualizados.placarPenaltisCasa),
          }),
          ...(dadosAtualizados.placarPenaltisFora !== undefined && {
            placarPenaltisFora:
              dadosAtualizados.placarPenaltisFora === "" ||
              dadosAtualizados.placarPenaltisFora === null
                ? null
                : Number(dadosAtualizados.placarPenaltisFora),
          }),
          ...(dadosAtualizados.timeCasa !== undefined && {
            timeCasa: dadosAtualizados.timeCasa ?? "",
          }),
          ...(dadosAtualizados.timeFora !== undefined && {
            timeFora: dadosAtualizados.timeFora ?? "",
          }),
          ...(dadosAtualizados.dataJogo !== undefined && {
            dataJogo: dadosAtualizados.dataJogo ?? "",
          }),
          ...(dadosAtualizados.horaJogo !== undefined && {
            horaJogo: dadosAtualizados.horaJogo ?? "",
          }),
          ...(dadosAtualizados.localJogo !== undefined && {
            localJogo: dadosAtualizados.localJogo ?? "",
          }),
        };

        return {
          partidas: {
            ...state.partidas,
            [idPartidaAtual]: partidaAtualizada,
          },
        };
      });

      return true;
    } catch (err) {
      console.error("Falha na edição da partida:", err);
      return false;
    }
  },

  editarPartidas: async ( novasPartidas: PartidaDTO[]) => {
    try {
      const res = await editarPartidas(novasPartidas);

      if (!res.success) {
        console.error("Erro ao editar partidas:", res.message);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Falha na edição das partidas:", err);
      return false;
    }
  },

  limparTodos: () => set({ partidas: {} })
}));
