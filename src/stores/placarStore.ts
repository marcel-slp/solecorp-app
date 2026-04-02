import { create } from "zustand";

export interface PlacarJogo {
  participante1: string;
  participante2: string;
  placarCasa: number|null;
  placarFora: number|null;
}

interface PlacarStore {
  placares: Record<
    string,
    Record<
      number,
      Record<
        string,
        Record<number, PlacarJogo>
      >
    >
  >;

  getPlacar: (eventoId: string, fase: number, grupo: string, jogo: number) => PlacarJogo | null;
  setPlacar: (eventoId: string, fase: number, grupo: string, jogo: number, dados: PlacarJogo) => void;

  resetEvento: (eventoId: string) => void;
}

export const placarStore = create<PlacarStore>((set, get) => ({
  placares: {},

  getPlacar: (eventoId, fase, grupo, jogo) => {
    return get().placares[eventoId]?.[fase]?.[grupo]?.[jogo] || null;
  },

  setPlacar: (eventoId, fase, grupo, jogo, dados) => {
    set((state) => ({
      placares: {
        ...state.placares,
        [eventoId]: {
          ...state.placares[eventoId],
          [fase]: {
            ...state.placares[eventoId]?.[fase],
            [grupo]: {
              ...state.placares[eventoId]?.[fase]?.[grupo],
              [jogo]: dados
            }
          }
        }
      }
    }));
  },

  resetEvento: (eventoId) =>
    set((state) => {
      const novo = { ...state.placares };
      delete novo[eventoId];
      return { placares: novo };
    }),
}));
