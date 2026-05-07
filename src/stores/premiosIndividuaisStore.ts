import { create } from 'zustand';
import { buscarPremiosIndividuaisOriginal, buscarPremiosIndividuaisPalpite, editarPremiosIndividuaisOriginal, editarPremiosIndividuaisPalpite, salvarPremiosIndividuaisOriginal } from '../api';


export interface PremiosIndividuais {
  id: string;
  campeonatoId: number;
  melhorJogador?: string;
  melhorGoleiro?: string;
  artilheiro?: string;
  campeao?: string;
  viceCampeao?: string;
  terceiroLugar?: string;
  melhor1Fase?: string;
}

export interface PremiosIndividuaisDTO {
  campeonatoId: number;
  melhorJogador?: string;
  melhorGoleiro?: string;
  artilheiro?: string;
  campeao?: string;
  viceCampeao?: string;
  terceiroLugar?: string;
}

export interface PremiosIndividuaisPalpite {
  id: string;
  campeonatoId: number;
  bolaoId: string;
  userId: number;
  melhorJogador?: string;
  melhorGoleiro?: string;
  artilheiro?: string;
  campeao?: string;
  viceCampeao?: string;
  terceiroLugar?: string;
  melhor1Fase?: string;
}

export interface PremiosIndividuaisPalpiteDTO {
  campeonatoId: number;
  bolaoId: string;
  userId: number;
  melhorJogador?: string;
  melhorGoleiro?: string;
  artilheiro?: string;
  campeao?: string;
  viceCampeao?: string;
  terceiroLugar?: string;
  melhor1Fase?: string;
}

export type NovoPremiosIndividuais = Omit<PremiosIndividuais, 'id'>

interface premiosIndividuaisStore {
  premiosIndividuaisPalpite: PremiosIndividuaisPalpite | null
  premiosIndividuaisOriginal: PremiosIndividuais | null
  carregarPremiosIndividuaisPalpite: (bolaoId: string, userId: number) => Promise<void>
  editarPremiosIndividuaisPalpite: (id: string, dadosPremiosIndividuaisPalpite: PremiosIndividuaisPalpiteDTO) => Promise<boolean>
  carregarPremiosIndividuaisOriginal: (campeonatoId: number) => Promise<void>
  adicionarPremiosIndividuaisOriginal: (dadosPremiosIndividuaisOriginal: NovoPremiosIndividuais) => Promise<boolean>
  editarPremiosIndividuaisOriginal: (id: string, dadosPremiosIndividuaisPalpite: PremiosIndividuaisDTO) => Promise<boolean>
  limparTodosOriginal: () => void //TODO: limpar os registros no banco de dados
  limparTodosPalpite: () => void //TODO: limpar os registros no banco de dados
}

export const premiosIndividuaisStore = create<premiosIndividuaisStore>((set) => ({
  premiosIndividuaisPalpite: null,
  premiosIndividuaisOriginal: null,

  carregarPremiosIndividuaisPalpite: async (bolaoId, userId) => {
    try {
      const response = await buscarPremiosIndividuaisPalpite(bolaoId, userId);

      if (response.data) {
        set({ premiosIndividuaisPalpite: response.data });
      } else {
        console.error("Erro ao carregar premios individuais:", response.error);
      }
    } catch (err) {
      console.error("Erro ao carregar premios individuais:", err);
    }
  },

  editarPremiosIndividuaisPalpite: async (id, dadosPremiosIndividuaisPalpite) => {
    try {
      const res = await editarPremiosIndividuaisPalpite({
        id,
        ...dadosPremiosIndividuaisPalpite
      });

      if(res.success) {
        set(() => ({
          premiosIndividuaisPalpite: { id, ...dadosPremiosIndividuaisPalpite } 
        }));
        return true;
      } else {
        console.error("Erro ao editar premios individuais palpite:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  carregarPremiosIndividuaisOriginal: async (campeonatoId) => {
    try {
      const response = await buscarPremiosIndividuaisOriginal(campeonatoId);

      if (response.data) {
        set({ premiosIndividuaisOriginal: response.data });
      } else {
        console.error("Erro ao carregar premios individuais:", response.error);
      }
    } catch (err) {
      console.error("Erro ao carregar premios individuais:", err);
    }
  },

  editarPremiosIndividuaisOriginal: async (id, dadosPremiosIndividuaisOriginal) => {
    try {
      const res = await editarPremiosIndividuaisOriginal({
        id,
        ...dadosPremiosIndividuaisOriginal
      });

      if(res.success) {
        set(() => ({
          premiosIndividuaisOriginal: { id, ...dadosPremiosIndividuaisOriginal } 
        }));
        return true;
      } else {
        console.error("Erro ao editar premios individuais original:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  adicionarPremiosIndividuaisOriginal: async (dadosPremiosIndividuaisOriginal) => {
    const novoPremiosIndividuaisOriginal = {
      id: crypto.randomUUID().slice(0,5),
      ...dadosPremiosIndividuaisOriginal
    }

    try {
      const response = await salvarPremiosIndividuaisOriginal(novoPremiosIndividuaisOriginal);

      if(response.success) {
        set(() => ({
          premiosIndividuaisOriginal: { ...novoPremiosIndividuaisOriginal }
        }));
        return true;
      } else {
        alert("Erro ao salvar premios individuais original");
        console.error("Erro ao salvar premios individuais original:", response.message);
        return false;
      }
    } catch (err) {
      alert("Erro ao salvar premios individuais original");
      console.error("Erro ao salvar premios individuais original:", err);
      return false;
    }
  },

  limparTodosOriginal: () => set({ premiosIndividuaisOriginal: null }),
  limparTodosPalpite: () => set({ premiosIndividuaisPalpite: null })
}))
