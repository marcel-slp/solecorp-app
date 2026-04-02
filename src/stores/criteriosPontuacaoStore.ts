import { create } from 'zustand';
import { buscarCriterios, editarPontuacaoCriterio, salvarPontuacaoCriterio, deletarPontuacaoCriterio, buscarPontuacaoCriteriosPorBolaoId } from '../api';

// export type ConfiguracaoExtraCriterio = {
//   convocacao?: string, // FEATURE PARA HABITAR Criterio PARA CONVOCAÇÃO DE SELEÇÕES
//   pontuacaoPremiosIndividuais?: string, // FEATURE PARA HABITAR PONTUAÇÃO PARA MELHOR JOGADOR, ARTILHEIRO, ETC
//   pontuacaoMelhoresPorRanking?: string, // FEATURE PARA HABITAR PONTUAÇÃO PARA MELHOR DE CADA RANKING (POR FASE)
//   pontuacaoBonus?: string,
//   ranking?: string, // FEATURE PARA HABITAR VARIOS TIPOS DE RANKING (ORDENAÇÃO) POR FASE DA COPA
//   faseExtraPlayoff?: string, // FEATURE PARA HABITAR COMPETIÇÃO PLAYOFF ENTRE OS PALPITES, POR FASE
// }

export type Criterio = {
  id: string,
  tipo: string,
  situacao: string,
  descricao?: string,
  // pontos?: number,
  // pontosPrimeiraFase?: number,
  // pontosSegundaFase?: number,
  condicao?: string;
}

export type PontuacaoCriterio = {
  id: string,
  bolaoId: string,
  criterioId: string,
  tipo?: string,
  situacao?: string,
  pontos?: number,
  pontosPrimeiraFase?: number,
  pontosSegundaFase?: number
}

export type NovoCriterio = Omit<Criterio, 'id'>
export type NovoPontuacaoCriterio = Omit<PontuacaoCriterio, 'id'>

interface CriteriosPontuacaoStore {
  criterios: Criterio[]
  pontuacaoCriterios: PontuacaoCriterio[]
  carregarCriterios: () => Promise<void>
  carregarPontuacaoCriterios: (bolaoId: string) => Promise<void>
  adicionarPontuacaoCriterio: (pontuacaoCriterio: NovoPontuacaoCriterio) => Promise<boolean>
  editarPontuacaoCriterio: (pontuacaoId: string, dadosPontuacaoCriterio: NovoPontuacaoCriterio) => Promise<boolean>
  removerPontuacaoCriterio: (id: string) => Promise<boolean>
  //adicionarCriterio: (criterio: NovoCriterio) => Promise<boolean>
  //editarCriterio: (id: string, dadosCriterio: NovoCriterio) => Promise<boolean>
  //removerCriterio: (id: string) => Promise<boolean>
  limparCriterios: () => void //TODO: limpar os registros no banco de dados
  limparPontuacaoCriterios: () => void //TODO: limpar os registros no banco de dados
}

export const criteriosPontuacaoStore = create<CriteriosPontuacaoStore>((set) => ({
  criterios: [],
  pontuacaoCriterios: [],

  // adicionarCriterio: async (criterio) => {
  //   const novoCriterio = {
  //     id: crypto.randomUUID().slice(0,5),
  //     ...criterio,
  //   }

  //   try {
  //     const response = await salvarCriterio(novoCriterio);

  //     if(response.success) {
  //       set((state) => ({
  //         criterios: [
  //           ...state.criterios,
  //           novoCriterio,
  //         ],
  //       }));
  //       return true;
  //     } else {
  //       console.error("Erro ao salvar criterio:", response.message);
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error("Falha ao salvar criterio:", err);
  //     return false;
  //   }
  // },

  carregarCriterios: async () => {
    try {
      const response = await buscarCriterios();
      if (response.data) {
        set({ criterios: response.data });
      } else {
        console.error("Erro ao carregar criterios:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar criterios:', err);
    }
  },

  // editarCriterio: async (id, dadosCriterio) => {
  //   try {
  //     const res = await editarCriterio({
  //       id: id,
  //       ...dadosCriterio
  //     });

  //     if(res.success) {
  //       set((state) => ({
  //         criterios: state.criterios.map((p) =>
  //           p.id === id ? { ...p, ...dadosCriterio } : p
  //         ),
  //       }));
  //       return true;
  //     } else {
  //       console.error("Erro ao editar criterio:", res.message);
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error("Falha ao editar criterio:", err);
  //     return false;
  //   }
  // },

  // removerCriterio: async (id: string) => {
  //   try {
  //     const res = await deletarCriterio(id);

  //     if(res.success) {
  //       set((state) => ({
  //         criterios: state.criterios.filter((p) => p.id !== id),
  //       }));
  //       return true;
  //     } else {
  //       console.error("Erro ao remover criterio:", res.message);
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error("Falha ao remover criterio:", err);
  //     return false;
  //   }
  // },

  carregarPontuacaoCriterios: async (bolaoId: string) => {
    try {
      const response = await buscarPontuacaoCriteriosPorBolaoId(bolaoId);
      if (response.data) {
        set({ pontuacaoCriterios: response.data });
      } else {
        console.error("Erro ao carregar pontuação de critérios:", response.error);
      }
    } catch (err) {
      console.error('Erro ao carregar pontuação de critérios:', err);
    }
  },

  adicionarPontuacaoCriterio: async (pontuacaoCriterio) => {
    const novoPontuacaoCriterio = {
      id: crypto.randomUUID().slice(0,5),
      ...pontuacaoCriterio,
    }

    try {
      const response = await salvarPontuacaoCriterio(novoPontuacaoCriterio);

      if(response.success) {
        set((state) => ({
          pontuacaoCriterios: [
            ...state.pontuacaoCriterios,
            novoPontuacaoCriterio,
          ],
        }));
        return true;
      } else {
        console.error("Erro ao salvar pontuação do critério:", response.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao salvar pontuação do critério:", err);
      return false;
    }
  },

  editarPontuacaoCriterio: async (pontuacaoId, dadosPontuacaoCriterio) => {
    try {
      const res = await editarPontuacaoCriterio({
        id: pontuacaoId,
        ...dadosPontuacaoCriterio
      });

      if(res.success) {
        set((state) => ({
          pontuacaoCriterios: state.pontuacaoCriterios.map((p) =>
            p.id === pontuacaoId ? { ...p, ...dadosPontuacaoCriterio } : p
          ),
        }));
        return true;
      } else {
        console.error("Erro ao editar pontuação do critério:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao editar pontuação do critério:", err);
      return false;
    }
  },

  removerPontuacaoCriterio: async (id: string) => {
    try {
      const res = await deletarPontuacaoCriterio(id);

      if(res.success) {
        set((state) => ({
          pontuacaoCriterios: state.pontuacaoCriterios.filter((p) => p.id !== id),
        }));
        return true;
      } else {
        console.error("Erro ao remover pontuação do critério:", res.message);
        return false;
      }
    } catch (err) {
      console.error("Falha ao remover pontuação do critério:", err);
      return false;
    }
  },

  limparCriterios: () => set({ criterios: [] }),
  limparPontuacaoCriterios: () => set({ pontuacaoCriterios: [] })
}))
