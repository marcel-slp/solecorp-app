import { create } from 'zustand';
import { deletarParticipante, editarParticipante, buscarParticipantes, salvarParticipante } from '../api';
import { Continentes, Paises } from '../models/GruposParticipantesDefault';

export type Atleta = {
  id: string,
  nome: string,
  camisa: number | null,
  nacionalidade: string,
  dataID: string
}

export type Participante = {
  id: string,
  nome: string,
  imagemParticipante: File | null | string;
  grupo: Paises | Continentes | null,
  tipo: string,
  atletas?: Atleta[],
  imagemAtletas: File | null,
  nomePlayer?: string
}

export type NovoParticipante = Omit<Participante, 'id'>

interface ParticipanteStore {
  participantes: Participante[]
  adicionarParticipante: (participante: NovoParticipante) => Promise<boolean>
  carregarParticipantes: () => Promise<void>
  editarParticipante: (id: string, dadosParticipante: NovoParticipante) => Promise<boolean>
  removerParticipante: (id: string) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const participantesStore = create<ParticipanteStore>((set) => ({
  participantes: [],

  adicionarParticipante: async (participante) => {
    const novoParticipante = {
      id: crypto.randomUUID().slice(0,5),
      ...participante,
    }

    try {
      const response = await salvarParticipante(novoParticipante);

      if(response.success) {
        set((state) => ({
          participantes: [
            ...state.participantes,
            novoParticipante,
          ],
        }));
        return true;
      } else {
        alert("Erro ao salvar participante");
        console.error("Erro ao salvar participante:", response.message);
        return false;
      }
    } catch (err) {
      console.error("Erro ao salvar participante:", err);
      return false;
    }
  },

  carregarParticipantes: async () => {
    try {
      const response = await buscarParticipantes();
      if (response.data) {
        set({ participantes: response.data });
      } else {
        console.error("Erro ao carregar participantes:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar participantes:', err);
    }
  },

  editarParticipante: async (id, dadosParticipante) => {
    try {
      const res = await editarParticipante({
        id: id,
        ...dadosParticipante
      });

      if(res.success) {
        set((state) => ({
          participantes: state.participantes.map((p) =>
            p.id === id ? { ...p, ...dadosParticipante } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar participante:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerParticipante: async (id: string) => {
    try {
      const res = await deletarParticipante(id);

      if(res.success) {
        set((state) => ({
          participantes: state.participantes.filter((p) => p.id !== id),
        }));
        return true;
      } else {
        console.error("Erro ao remover participante:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover participante:", err);
      return false;
    }
  },

  limparTodos: () => set({ participantes: [] })
}))
