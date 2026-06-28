import { create } from "zustand";
import { buscarConfiguracoes } from "../api";

export interface Configuracao {
  id: number;
  nome: string;
  valor: number;
}

export interface BuscarConfiguracoesResponse {
  success: boolean;
  configuracoes: Configuracao[];
}

interface ConfiguracoesStore {
  configuracoes: Record<string, number>;

  carregarConfiguracoes: () => Promise<void>;
}

export const configuracoesStore =
  create<ConfiguracoesStore>((set) => ({
    configuracoes: {},

    carregarConfiguracoes: async () => {
      const response = await buscarConfiguracoes();

      if (!response.success) return;

      const mapa = response.configuracoes.reduce(
        (acc, item) => {
          acc[item.nome] = item.valor;
          return acc;
        },
        {} as Record<string, number>
      );

      set({ configuracoes: mapa });
    },
  }));