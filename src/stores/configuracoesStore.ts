import { create } from "zustand";
import { buscarConfiguracoes, editarConfiguracoes } from "../api";

export interface Configuracao {
  id: string;
  nome: string;
  valor: number;
}

export interface BuscarConfiguracoesResponse {
  success: boolean;
  configuracoes: Configuracao[];
}

export interface Configuracao {
  id: string;
  nome: string;
  valor: number;
}

interface ConfiguracoesStore {
  configuracoes: Configuracao[];
  loading: boolean;

  carregarConfiguracoes: () => Promise<void>;
  atualizarConfiguracao: (id: string, nome: string, valor: number) => Promise<boolean>;

  getValor: (nome: string) => number | undefined;
  getConfig: (nome: string) => Configuracao | undefined;
  isAtivo: (nome: string) => boolean;
}

export const configuracoesStore = create<ConfiguracoesStore>((set, get) => ({
  configuracoes: [],
  loading: false,

  carregarConfiguracoes: async () => {
    set({ loading: true });

    try {
      const response = await buscarConfiguracoes();

      if (response.success && Array.isArray(response.configuracoes)) {
        set({ configuracoes: response.configuracoes });
      }
    } catch (err) {
      console.error("Erro ao carregar configurações:", err);
    } finally {
      set({ loading: false });
    }
  },

  atualizarConfiguracao: async (id: string, nome: string, valor: number) => {
    try {
      const res = await editarConfiguracoes([{ id, nome, valor }]);

      if (res.success) {
        set((state) => ({
          configuracoes: state.configuracoes.map((c) =>
            c.id === id ? { ...c, valor } : c
          ),
        }));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Erro ao atualizar configuração:", err);
      return false;
    }
  },

  getValor: (nome: string) => {
    const config = get().configuracoes.find((c) => c.nome === nome);
    return config?.valor;
  },

  getConfig: (nome: string) => {
    return get().configuracoes.find((c) => c.nome === nome);
  },

  isAtivo: (nome: string) => {
    return get().getValor(nome) === 1;
  },
}));