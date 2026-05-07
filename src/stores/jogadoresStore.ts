import { create } from 'zustand';
import { buscarJogadores,  deletarJogador, editarJogador, salvarJogador } from '../api';
import { Posicao } from '../models/JogadoresDefault';

export type Jogador = {
  id: string,
  nome: string;
  posicao: Posicao,
  selecao: string,
  imagemJogador: File | null | string,
  dataCriacao?: string,
  listaMelhorJogador: boolean,
  listaMelhorGoleiro: boolean,
  listaArtilheiro: boolean,
  melhorJogador?: boolean,
  artilheiro?: boolean,
  melhorGoleiro?: boolean
}

export type JogadorDTO = {
  listaMelhorJogador: boolean,
  listaMelhorGoleiro: boolean,
  listaArtilheiro: boolean,
  melhorJogador?: boolean,
  artilheiro?: boolean,
  melhorGoleiro?: boolean
}

function mapJogadorFromApi(data: Jogador) {
  return {
    ...data,
    listaMelhorJogador: Boolean(data.listaMelhorJogador),
    listaMelhorGoleiro: Boolean(data.listaMelhorGoleiro),
    listaArtilheiro: Boolean(data.listaArtilheiro),
    melhorJogador: Boolean(data.melhorJogador),
    melhorGoleiro: Boolean(data.melhorGoleiro),
    artilheiro: Boolean(data.artilheiro)
  };
}

export type NovoJogador = Omit<Jogador, 'id'>

interface jogadoresStore {
  jogadores: Record<string, Jogador>
  carregarJogadores: () => Promise<void>
  adicionarJogador: (dadosNovoJogadores: NovoJogador) => Promise<boolean>
  editarJogador: (id: string, dadosJogadores: NovoJogador) => Promise<boolean>
  removerJogador: (id: string) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const jogadoresStore = create<jogadoresStore>((set) => ({
  jogadores: {},

  carregarJogadores: async () => {
    try {
      const response = await buscarJogadores();
      if (response.data) {
        const mapa = Object.fromEntries(response.data.map(j => [j.id, mapJogadorFromApi(j)]));
        set({ jogadores: mapa });
      } else {
        console.error("Erro ao carregar jogadores:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar jogadores:', err);
    }
  },

  adicionarJogador: async (dadosNovoJogadores) => {
    const novoJogador = {
      id: crypto.randomUUID().slice(0,5),
      ...dadosNovoJogadores
    }

    try {
      const response = await salvarJogador(novoJogador);

      if(response.success) {
        set((state) => ({
          jogadores: {
            ...state.jogadores,
            [novoJogador.id]: { ...novoJogador }
          },
        }));
        return true;
      } else {
        alert("Erro ao salvar jogador");
        console.error("Erro ao salvar Jogador:", response.message);
        return false;
      }
    } catch (err) {
      alert("Erro ao salvar jogador");
      console.error("Erro ao salvar jogador:", err);
      return false;
    }
  },

  editarJogador: async (id: string, dadosJogador: NovoJogador) => {
    try {
      const res = await editarJogador({
        id: id,
        ...dadosJogador
      });

      if (res.success) {
        set((state) => ({
          jogadores: {
            ...state.jogadores,
            [id]: {
              ...state.jogadores[id],
              ...dadosJogador,
            },
          },
        }));
        return true;
      } else {
        console.error("Erro ao editar Jogador:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição do jogador:", err);
      return false;
    }
  },

  removerJogador: async (id: string) => {
    try {
      const res = await deletarJogador(id);

      if (res.success) {
        set((state) => {
          const novoJogadores = { ...state.jogadores };
          delete novoJogadores[id];

          return {
            jogadores: novoJogadores,
          };
        });
        return true;
      } else {
        console.error("Erro ao remover Jogador:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover Jogador:", err);
      return false;
    }
  },

  limparTodos: () => set({ jogadores: {} })
}))
