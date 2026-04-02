import { create } from 'zustand';
import { deletarUsuario, editarUsuario, buscarUsuarios } from '../api';
import { perfilNomeIdMapping } from '../models/PerfilSistema';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  password?: string;
  nomePerfil: string;
  perfilId?: string;
  criadoEm?: Date;
}

export type NovoUsuario = Omit<Usuario, 'id'>;

interface UsuarioStore {
  usuarios: Usuario[]
  carregarUsuarios: () => Promise<void>
  editarUsuario: (dadosUsuario: Usuario, id: number) => Promise<boolean>
  removerUsuario: (id: number) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const usuariosStore = create<UsuarioStore>((set) => ({
  usuarios: [],

  carregarUsuarios: async () => {
    try {
      const response = await buscarUsuarios();
      if (response.data) {
        set({ usuarios: response.data });
      } else {
        console.error("Erro ao carregar usuarios:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar usuarios:', err);
    }
  },

  editarUsuario: async (dadosUsuario, id) => {
    try {
      const res = await editarUsuario({
        ...dadosUsuario,
        perfilId: perfilNomeIdMapping[dadosUsuario.nomePerfil]
      });

      if(res.success) {
        set((state) => ({
          usuarios: state.usuarios.map((p) =>
            p.id === id ? { ...p, ...dadosUsuario } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar usuario:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerUsuario: async (id) => {
    try {
      const res = await deletarUsuario(id);

      if(res.success) {
        set((state) => ({
          usuarios: state.usuarios.filter((p) => p.id !== id),
        }));
        return true;
      } else {
        console.error("Erro ao remover Usuario:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover Usuario:", err);
      return false;
    }
  },

  limparTodos: () => set({ usuarios: [] })
}))
