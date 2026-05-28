import { create } from 'zustand';
import { deletarRateio, editarRateio, buscarRateioPorBolaoId, salvarRateio } from '../api';

export type Rateio = {
  id: string;
  bolaoId: string;
  cota: number;
  qtdParticipantes: number;
  taxaAdm: number;
  pct1LugarGeral?: number;
  pct2LugarGeral?: number;
  pct3LugarGeral?: number;
  pct4LugarGeral?: number;
  pct5LugarGeral?: number;
  pct610LugarGeral?: number;
  pctVencedorRankDiferencaGols?: number;
  pctVencedorRankGols?: number;
  pctVencedorRankResultado?: number;
  pctVencedorRankPlacar?: number;
  pctVencedorRankPenaltis?: number;
  pctVencedorRankExtra?: number;
  pctVencedor1Fase?: number;
  pctVencedor2Fase?: number;
  pct1LugarPlayoff?: number;
  pct2LugarPlayoff?: number;
  pct3LugarPlayoff?: number;
  pct1LugarGrupos?: number;
};

export type NovoRateio = Omit<Rateio, 'id'>
export type RateioDTO = Partial<Rateio> & { bolaoId: string };

interface RateiosStore {
  rateio: Rateio | null;
  carregarRateio: (bolaoId: string) => Promise<void>;
  atualizarRateio: (dados: Partial<Rateio>) => void;
  salvarRateio: (novoRateio: NovoRateio) => Promise<boolean>;
  editarRateio: (dados: Partial<Rateio> & { id?: string }) => Promise<boolean>;
  removerRateio: (id: string) => Promise<boolean>;
  limparRateio: () => void;
}

export const rateiosStore = create<RateiosStore>((set) => ({
  rateio: null,

  carregarRateio: async (bolaoId: string) => {
    try {
      const response = await buscarRateioPorBolaoId(bolaoId);

      if (response.data) {
        set({ rateio: response.data });
      } else {
        console.warn("Nenhum rateio encontrado para este bolão");
        set({ rateio: null });
      }
    } catch (err) {
      console.error('Erro ao carregar rateio:', err);
      set({ rateio: null });
    }
  },

  atualizarRateio: (dadosParciais) => {
    set((state) => ({
      rateio: {
        ...(state.rateio || {}),
        ...dadosParciais,
      } as Rateio,
    }));
  },

  salvarRateio: async (dadosNovoRateio: NovoRateio) => {
    try {
      const novoRateio: Rateio = {
        ...dadosNovoRateio,
        id: crypto.randomUUID().slice(0,5),
      };
    
      const res = await salvarRateio(novoRateio);

      if (!res.success) {
        console.error("Erro ao salvar rateio:", res.message);
        return false;
      }

      set((state) => ({
      rateio: {
          ...(state.rateio || {}),
          ...novoRateio,
        } as Rateio,
      }));
      return true;
    } catch (err) {
      console.error("Erro ao salvar rateio:", err);
      return false;
    }
  },

  editarRateio: async (dados: Partial<Rateio> & { id?: string }) => {
    try {
      const res = await editarRateio(dados);

      if (res.success) {
        set((state) => ({
          rateio: {
            ...(state.rateio || {}),
            ...dados,
          } as Rateio,
        }));
        return true;
      } else {
        console.error("Erro ao editar rateio:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao editar rateio:", err);
      return false;
    }
  },

  removerRateio: async (id: string) => {
    try {
      const res = await deletarRateio(id);

      if (res.success) {
        set({ rateio: null });
        return true;
      } else {
        console.error("Erro ao remover rateio:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover rateio:", err);
      return false;
    }
  },

  limparRateio: () => set({ rateio: null }),
}));