import { create } from 'zustand';
import { Participante } from './participantesStore';
import { buscarEventoPorId, deletarEvento, editarEvento, buscarEventos, salvarEvento } from '../api';
import { ClassificacaoFinal, ConfiguracaoPlayoff, DesempatePlayoff, Eliminacao, Formacao, FormaSistema, FormatoFase, FormatoTabela, TipoPlayoff } from '../models/ConfiguracaoEvento';
import { getImagemURL } from '../utils/Utils';

export type ConfiguracaoEvento = {
  formacao?: Formacao,
  eliminacao?: Eliminacao,
  formatoTabela?: FormatoTabela,
  configuracaoPlayoff?: ConfiguracaoPlayoff,
  tipoPlayoff?: TipoPlayoff,
  desempatePlayoff?: DesempatePlayoff,
  classificacaoFinal?: ClassificacaoFinal,
  definirTerceiroLugar?: string
}

export type ConfiguracaoFases = {
  formatoFase?: FormatoFase,
  grupos: number,
  turnos: number,
  classificadosPorGrupo: number,
  classificadosIndiceTecnico: number
}

export type Evento = {
  id: string
  nome: string,
  imagemEvento: File | null | string,
  imagemPatrocinador1: File | null,
  imagemPatrocinador2: File | null,
  imagemPatrocinador3: File | null,
  imagemPatrocinador4: File | null,
  modalidade: string,
  tabela: string,
  playoff: string,
  compartilhamento: string,
  numeroFases: number,
  formaSistema: FormaSistema,
  numeroParticipantes: number,
  configuracaoFases: ConfiguracaoFases[],
  configuracaoEvento?: ConfiguracaoEvento,
  participantes?: Participante[]
}

export type NovoEvento = Omit<Evento, 'id'>

interface EventoStore {
  eventos: Evento[]
  adicionarEvento: (evento: NovoEvento) => Promise<boolean>
  buscarEvento: (id: string) => Promise<Evento|null>
  carregarEventos: () => Promise<void>
  editarEvento: (id: string, dadosEvento: NovoEvento) => Promise<boolean>
  removerEvento: (id: string) => Promise<boolean>
  limparTodos: () => void //TODO: limpar os registros no banco de dados
}

export const eventosStore = create<EventoStore>((set) => ({
  eventos: [],

  adicionarEvento: async (evento) => {
      const novoEvento = {
        id: crypto.randomUUID().slice(0,5),
        ...evento,
      }
  
      try {
        const response = await salvarEvento(novoEvento);

        if(response.success) {
          set((state) => ({
            eventos: [
              ...state.eventos,
              novoEvento,
            ],
          }));
          return true;
        } else {
          alert("Erro ao salvar evento. Alterações não foram salvas");
          console.error("Erro ao salvar evento:", response.message);
          return false;
        }
      } catch (err) {
        alert("Falha ao salvar evento. Alterações não foram salvas");
        console.error("Falha ao salvar evento:", err);
        return false;
      }
    },

    buscarEvento: async (id) => {
      try {
        const response = await buscarEventoPorId(id);
        if (response.data) {
          return {
            ...response.data,
            imagemEvento: getImagemURL(String(response.data.imagemEvento))
          };
        } else {
          alert("Erro ao carregar eventos");
          console.error("Erro ao carregar eventos:", response.error);
          return null;
        }
      } catch (err) {
        alert("Falha ao carregar eventos");
        console.error('Falha ao carregar eventos:', err);
        return null;
      }
    },

  carregarEventos: async () => {
    const response = await buscarEventos();
    if (response.data) {
      set({ eventos: response.data });
    } else {
      alert("Erro ao carregar eventos");
      console.error("Erro ao carregar eventos:", response.error);
    }
  },

  editarEvento: async (id, dadosEvento) => {
    try {
      const res = await editarEvento({
        id: id,
        ...dadosEvento
      });

      if(res.success) {
        set((state) => ({
          eventos: state.eventos.map((p) =>
            p.id === id ? { ...p, ...dadosEvento } : p
          ),
        }));
        return true;
      } else {
        alert("Erro ao editar evento. Alterações não foram salvas");
        console.error("Erro ao editar evento:", res.message);
        return false;
      }
    } catch (err) {
      alert("Falha na edição. Alterações não foram salvas");
      console.error("Falha na edição:", err);
      return false;
    }
  },

  removerEvento: async (id: string) => {
      try {
        const res = await deletarEvento(id);
  
        if(res.success) {
          set((state) => ({
            eventos: state.eventos.filter((e) => e.id !== id),
          }));
          return true;
        } else {
          alert("Erro ao remover evento");
          console.error("Erro ao remover evento:", res.message);
          return false;
        }
      } catch (err) {
        alert("Falha ao remover evento");
        console.error("Falha ao remover evento:", err);
        return false;
      }
    },

  limparTodos: () => set({ eventos: [] })
}))
