import { create } from 'zustand';
import { deletarBolao, editarBolao, buscarBoloesPorUserId, salvarBolao, aceitarConvite, deletarParticipanteBolao, editarParticipanteBolao, buscarParticipantesBolaoPorBolaoId, buscarParticipanteBolaoLogado } from '../api';
import { EventoBase } from '../models/BolaoCopaDefault';

export type Convite = {
  bolaoId: string,
  userId: number
}

export type ParticipanteBolao = {
  nome: string;
  email: string;
  habilitarPalpite: boolean,
  bolaoId: string,
  userId: number,
  roleBolao: string,
  joinedAt: Date
}

export type ParticipanteBolaoDTO = {
  habilitarPalpite?: boolean,
  bolaoId: string,
  userId: number,
  roleBolao?: string
}

export type Bolao = {
  id: string,
  userId: number;
  nome: string,
  compartilhamento: string,
  tipoConvite: string,
  pontuacao: string,
  imagemBolao: File | null | string;
  eventoBase: EventoBase.COPA_2026;
  convocacao: boolean, // FEATURE PARA HABITAR BOLAO PARA CONVOCAÇÃO DE SELEÇÕES
  premiosIndividuais: boolean, // FEATURE PARA HABITAR PONTUAÇÃO PARA MELHOR JOGADOR, ARTILHEIRO, ETC
  melhoresPorRanking: boolean, // FEATURE PARA HABITAR PONTUAÇÃO PARA MELHOR DE CADA RANKING (POR FASE)
  pontuacaoBonus: boolean,
  ranking?: boolean, // FEATURE PARA HABITAR VARIOS TIPOS DE RANKING (ORDENAÇÃO) POR FASE DA COPA
  faseExtraPlayoff: boolean, // FEATURE PARA HABITAR COMPETIÇÃO PLAYOFF ENTRE OS PALPITES, POR FASE
  roleBolao?: string
}

export type NovoBolao = Omit<Bolao, 'id'>
export type NovoParticipanteBolao = Omit<ParticipanteBolao, 'userId'>

interface BolaoStore {
  boloes: Bolao[]
  participantesBolao: ParticipanteBolao[]
  participanteBolaoLogado: ParticipanteBolao | null
  carregarParticipantesBolao: (bolaoId: string, userId: number) => Promise<void>
  carregarParticipanteBolaoLogado: (bolaoId: string, userId: number) => Promise<void>
  editarParticipanteBolao: (dadosParticipante: ParticipanteBolaoDTO) => Promise<boolean>
  removerParticipanteBolao: (userId: number) => Promise<boolean>
  adicionarBolao: (Bolao: NovoBolao) => Promise<boolean>
  carregarBolao: (userId: number) => Promise<void>
  editarBolao: (id: string, dadosBolao: NovoBolao) => Promise<boolean>
  removerBolao: (id: string) => Promise<boolean>
  aceitarConvite: (dadosConvite: Convite) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const bolaoStore = create<BolaoStore>((set) => ({
  boloes: [],
  participantesBolao: [],
  participanteBolaoLogado: null,

  adicionarBolao: async (Bolao) => {
    const novoBolao = {
      id: crypto.randomUUID().slice(0,5),
      ...Bolao,
    }

    try {
      const response = await salvarBolao(novoBolao);

      if(response.success) {
        set((state) => ({
          boloes: [
            ...state.boloes,
            novoBolao,
          ],
        }));
        return true;
      } else {
        alert("Erro ao salvar bolão");
        console.error("Erro ao salvar bolao:", response.message);
        return false;
      }
    } catch (err) {
      alert("Erro ao salvar bolão");
      console.error("Erro ao salvar bolao:", err);
      return false;
    }
  },

  carregarBolao: async (userId: number) => {
    try {
      const response = await buscarBoloesPorUserId(userId);
      if (response.data) {
        set({ boloes: response.data });
      } else {
        console.error("Erro ao carregar boloes:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar boloes:', err);
    }
  },

  editarBolao: async (id, dadosBolao) => {
    try {
      const res = await editarBolao({
        id: id,
        ...dadosBolao
      });

      if(res.success) {
        set((state) => ({
          boloes: state.boloes.map((p) =>
            p.id === id ? { ...p, ...dadosBolao } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar Bolao:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerBolao: async (id: string) => {
    try {
      const res = await deletarBolao(id);

      if(res.success) {
        set((state) => ({
          boloes: state.boloes.filter((p) => p.id !== id),
        }));
        return true;
      } else {
        console.error("Erro ao remover Bolao:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover Bolao:", err);
      return false;
    }
  },

  aceitarConvite: async (dadosConvite: Convite) => {
    try {
      const res = await aceitarConvite(dadosConvite);

      if(res.success) {
        return true;
      } else {
        console.error("Erro ao aceitar convite:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao aceitar convite:", err);
      return false;
    }
  },

  carregarParticipantesBolao: async (bolaoId, userId) => {
    try {
      const response = await buscarParticipantesBolaoPorBolaoId(bolaoId, userId);
      
      if (response.data) {
        set({ participantesBolao: response.data });
      } else {
        console.error("Erro ao carregar participantes do bolão:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar participantes do bolão:', err);
    }
  },

  carregarParticipanteBolaoLogado: async (bolaoId: string, userId: number) => {
    try {
      const response = await buscarParticipanteBolaoLogado(bolaoId, userId);

      if (response.data) {
        set({ participanteBolaoLogado: response.data });
      } else {
        console.error("Erro ao carregar participante do bolão logado:", response.error);
        set({ participanteBolaoLogado: null });
      }
    } catch (err) {
      console.error('Erro ao carregar participante do bolão logado:', err);
      set({ participanteBolaoLogado: null });
    }
  },

  editarParticipanteBolao: async (dadosParticipanteBolao: ParticipanteBolaoDTO) => {
    try {
      const res = await editarParticipanteBolao(dadosParticipanteBolao);

      if(res.success) {
        set((state) => ({
          participantesBolao: state.participantesBolao.map((p) =>
            p.userId === dadosParticipanteBolao.userId ? { ...p, ...dadosParticipanteBolao } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar participante do bolão:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerParticipanteBolao: async (userId: number) => {
    try {
      const res = await deletarParticipanteBolao(userId);

      if(res.success) {
        set((state) => ({
          participantesBolao: state.participantesBolao.filter((p) => p.userId !== userId),
        }));
        return true;
      } else {
        console.error("Erro ao remover participante do bolão:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover participante do bolão:", err);
      return false;
    }
  },

  limparTodos: () => set({ boloes: [] })
}))
