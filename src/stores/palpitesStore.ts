import { create } from "zustand";
import { buscarPalpitesPorBolaoId, buscarPalpitesPorBolaoIdUserId, 
  salvarPalpites as salvarPalpitesAPI 
} from "../api";

export interface Palpite {
  id: string;
  campeonatoId: number;
  partidaId: string;
  bolaoId: string;
  placarCasa: number | null;
  placarFora: number | null;
  placarPenaltisCasa?: number | null;
  placarPenaltisFora?: number | null;
  userId: number;
}

interface PalpitesStore {
  palpitesUsuario: Record<string, Palpite>;
  palpitesBolao: Record<number, Palpite[]>;
  carregarPalpitesPorUsuario: (bolaoId: string, userId: number) => Promise<void>;
  carregarPalpitesPorBolao: (bolaoId: string) => Promise<void>;
  salvarPalpite: (novoPalpite: Palpite) => boolean;
  salvarPalpites: (novosPalpites: Palpite[]) => Promise<boolean>;
  limparTodos: () => void;
}

export const palpitesStore = create<PalpitesStore>((set) => ({
  palpitesUsuario: {},
  palpitesBolao: {},

  carregarPalpitesPorBolao: async (bolaoId: string) => {
    try {
      const response = await buscarPalpitesPorBolaoId(bolaoId);

      if (response.success && Array.isArray(response.data)) {
        const mapa = response.data.reduce((acc, palpite) => {
          const userId = palpite.userId;
          if (!acc[userId]) acc[userId] = [];
          acc[userId].push(palpite);
          return acc;
        }, {} as Record<number, Palpite[]>);

        set({ palpitesBolao: mapa });
      } else {
        console.error("Erro ao carregar palpites do bolão:", response.error);
        set({ palpitesBolao: {} });
      }
    } catch (err) {
      console.error("Falha ao carregar palpites do bolão:", err);
      set({ palpitesBolao: {} });
    }
  },

  carregarPalpitesPorUsuario: async (bolaoId, userId) => {
    try {
      const response = await buscarPalpitesPorBolaoIdUserId(bolaoId, userId);

      if (response.success && Array.isArray(response.data)) {
        const mapa = Object.fromEntries(
          response.data.map((p) => [p.id, p])
        );

        set({ palpitesUsuario: mapa });
      } else {
        set({ palpitesUsuario: {} });
        console.error("Erro ao carregar palpites:", response.error);
      }
    } catch (err) {
      console.error("Falha ao carregar palpites:", err);
      set({ palpitesUsuario: {} });
    }
  },

  salvarPalpite: (novoPalpite: Palpite): boolean => {
    try {
      set((state) => ({
        palpitesUsuario: {
          ...state.palpitesUsuario,
          [novoPalpite.id]: { ...novoPalpite }
        },
      }));

      return true;
    } catch (err) {
      console.error("Erro ao salvar palpite:", err);
      return false;
    }
  },

  salvarPalpites: async (novosPalpites: Palpite[]) => {
    try {
      const res = await salvarPalpitesAPI(novosPalpites);

      if (!res.success) {
        console.error("Erro ao salvar palpites:", res.error);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Erro ao salvar palpites:", err);
      return false;
    }
  },

  limparTodos: () => set({ palpitesUsuario: {} }),
}));
