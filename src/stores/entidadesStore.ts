import { create } from 'zustand';
import { getImagemURL } from '../utils/Utils';
import { buscarEntidadePorId, deletarEntidade, editarEntidade, buscarEntidadesPorUserId, salvarEntidade } from '../api';

export type Entidade = {
  id: string
  nome: string,
  imagemEntidade: File | null | string,
  sigla: string,
  site: string,
  email: string,
  userId: number
}

export type NovaEntidade = Omit<Entidade, 'id'>

interface EntidadesStore {
  entidades: Entidade[]
  adicionarEntidade: (entidade: NovaEntidade) => Promise<boolean>
  buscarEntidade: (id: string) => Promise<Entidade|null>
  carregarEntidades: (userId: number) => Promise<void>
  editarEntidade: (id: string, dadosentidade: NovaEntidade) => Promise<boolean>
  removerEntidade: (id: string) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const entidadesStore = create<EntidadesStore>((set) => ({
  entidades: [],

  adicionarEntidade: async (entidade) => {
    const novaEntidade = {
      id: crypto.randomUUID().slice(0,5),
      ...entidade,
    };
    
    try {
      const response = await salvarEntidade(novaEntidade);

      if(response.success) {
        set((state) => ({
          entidades: [
            ...state.entidades,
            novaEntidade,
          ],
        }));
        return true;
      } else {
        alert("Erro ao salvar entidade. Alterações não foram salvas");
        console.error("Erro ao salvar entidade:", response.message);
        return false;
      }
    } catch (err) {
      alert("Falha ao salvar entidade. Alterações não foram salvas");
      console.error("Falha ao salvar entidade:", err);
      return false;
    }
  },

  buscarEntidade: async (id) => {
    try {
      const response = await buscarEntidadePorId(id);
      if (response.data) {
        return {
          ...response.data,
          imagemEntidade: getImagemURL(String(response.data.imagemEntidade))
        };
      } else {
        alert("Erro ao carregar entidades");
        console.error("Erro ao carregar entidades:", response.error);
        return null;
      }
    } catch (err) {
      alert("Falha ao carregar entidades");
      console.error('Falha ao carregar entidades:', err);
      return null;
    }
  },

  carregarEntidades: async (userId: number) => {
    const response = await buscarEntidadesPorUserId(userId);
    if (response.data) {
      set({ entidades: response.data });
    } else {
      alert("Erro ao carregar entidades");
      console.error("Erro ao carregar entidades:", response.error);
    }
  },

  editarEntidade: async (id, dadosEntidade) => {
    try {
      const res = await editarEntidade({
        id: id,
        ...dadosEntidade
      });

      if(res.success) {
        set((state) => ({
          entidades: state.entidades.map((p) =>
            p.id === id ? { ...p, ...dadosEntidade } : p
          ),
        }));
        return true;
      } else {
        alert("Erro ao editar entidade. Alterações não foram salvas");
        console.error("Erro ao editar entidade:", res.message);
        return false;
      }
    } catch (err) {
      alert("Falha na edição. Alterações não foram salvas");
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerEntidade: async (id: string) => {
      try {
        const res = await deletarEntidade(id);
  
        if(res.success) {
          set((state) => ({
            entidades: state.entidades.filter((e) => e.id !== id),
          }));
          return true;
        } else {
          alert("Erro ao remover entidade");
          console.error("Erro ao remover entidade:", res.message);
          return false;
        }
      } catch (err) {
        alert("Falha ao remover entidade");
        console.error("Falha ao remover entidade:", err);
        return false;
      }
    },

  limparTodos: () => set({ entidades: [] })
}))
