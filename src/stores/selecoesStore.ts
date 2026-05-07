import { create } from 'zustand';
import { buscarSelecoes, deletarSelecao, editarSelecao, salvarSelecao } from '../api';

export type Selecao = {
  id: string;
  nome: string;
  imagemSelecao: File | null | string,
  campeao: boolean,
  viceCampeao: boolean,
  terceiroLugar: boolean,
  dataCriacao?: string
}

function mapSelecaoFromApi(data: Selecao) {
  return {
    ...data,
    campeao: Boolean(data.campeao),
    viceCampeao: Boolean(data.viceCampeao),
    terceiroLugar: Boolean(data.terceiroLugar)
  };
}

export type NovaSelecao = Omit<Selecao, 'id'>

interface selecoesStore {
  selecoes: Selecao[]
  carregarSelecoes: () => Promise<void>
  adicionarSelecao: (dadosNovaSelecao: NovaSelecao) => Promise<boolean>
  editarSelecao: (id: string, dadosSelecao: NovaSelecao) => Promise<boolean>
  removerSelecao: (id: string) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const selecoesStore = create<selecoesStore>((set) => ({
  selecoes: [],

  carregarSelecoes: async () => {
    try {
      const response = await buscarSelecoes();

      if (response.data) {
        set({ selecoes: response.data.map((selecao) => mapSelecaoFromApi(selecao)) });
      } else {
        console.error("Erro ao carregar selecoes:", response.error);
      }
    } catch (err) {
      console.error("Erro ao carregar selecoes:", err);
    }
  },

  adicionarSelecao: async (dadosNovaSelecao) => {
    const novaSelecao = {
      id: crypto.randomUUID().slice(0,5),
      ...dadosNovaSelecao
    }

    try {
      const response = await salvarSelecao(novaSelecao);

      if(response.success) {
        set((state) => ({
          selecoes: [
            ...state.selecoes,
            novaSelecao,
          ],
        }));
        return true;
      } else {
        alert("Erro ao salvar selecao");
        console.error("Erro ao salvar selecao:", response.message);
        return false;
      }
    } catch (err) {
      alert("Erro ao salvar selecao");
      console.error("Erro ao salvar selecao:", err);
      return false;
    }
  },

  editarSelecao: async (id, dadosSelecao) => {
    try {
      const res = await editarSelecao({
        id: id,
        ...dadosSelecao
      });

      if(res.success) {
        set((state) => ({
          selecoes: state.selecoes.map((p) =>
            p.id === id ? { ...p, ...dadosSelecao } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar selecao:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerSelecao: async (id: string) => {
    try {
      const res = await deletarSelecao(id);

      if(res.success) {
        set((state) => ({
          selecoes: state.selecoes.filter((p) => p.id !== id),
        }));
        return true;
      } else {
        console.error("Erro ao remover selecao:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover selecao:", err);
      return false;
    }
  },

  limparTodos: () => set({ selecoes: [] })
}))
