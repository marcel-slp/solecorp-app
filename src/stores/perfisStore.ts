import { create } from 'zustand';
import { deletarPerfil, editarPerfil, buscarPerfis, salvarPerfil } from '../api';

export type Perfil = {
  id: string,
  nome: string,
  descricao?: string;
}

export type NovoPerfil = Omit<Perfil, 'id'>

interface PerfilStore {
  perfis: Perfil[]
  adicionarPerfil: (perfil: NovoPerfil) => Promise<boolean>
  carregarPerfis: () => Promise<void>
  editarPerfil: (id: string, dadosPerfil: NovoPerfil) => Promise<boolean>
  removerPerfil: (id: string) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const perfisStore = create<PerfilStore>((set) => ({
  perfis: [],

  adicionarPerfil: async (novoPerfil) => {
    const novoPerfilPayload = {
      id: crypto.randomUUID().slice(0,5),
      ...novoPerfil,
    }

    try {
      const response = await salvarPerfil(novoPerfilPayload);

      if(response.success) {
        set((state) => ({
          perfis: [
            ...state.perfis,
            novoPerfilPayload,
          ]
        }));
        return true;
      } else {
        //alert("Erro ao salvar perfil");
        console.error("Erro ao salvar perfil:", response.message);
        return false;
      }
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      return false;
    }
  },

  carregarPerfis: async () => {
    try {
      const response = await buscarPerfis();
      if (response.data) {
        set({ perfis: response.data });
      } else {
        console.error("Erro ao carregar perfis:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar perfis:', err);
    }
  },

  editarPerfil: async (id, dadosPerfil) => {
    try {
      const res = await editarPerfil({
        id: id,
        ...dadosPerfil
      });

      if(res.success) {
        set((state) => ({
          perfis: state.perfis.map((p) =>
            p.id === id ? { ...p, ...dadosPerfil } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar perfil:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerPerfil: async (id) => {
    try {
      const res = await deletarPerfil(id);

      if(res.success) {
        set((state) => ({
          perfis: state.perfis.filter((p) => p.id !== id),
        }));
        return true;
      } else {
        console.error("Erro ao remover perfil:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover perfil:", err);
      return false;
    }
  },

  limparTodos: () => set({ perfis: [] })
}))
