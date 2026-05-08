import defaultParticipante from "@/assets/images/default_participante.jpeg";
//import { ROUND_OF_32_MATCHUPS, Selecao } from "./BolaoCopaDefault";
import { Partida } from "../stores/partidasStore";
import { getImagemSelecoesURL } from "../utils/Utils";
import { Palpite } from "../stores/palpitesStore";

export interface Jogo {
  id: string;
  numeroPartida: number;
  grupo?: string;
  timeCasa: string;
  timeFora: string;
  simboloCasa: string;
  simboloFora: string;
  placarCasa?: number;
  placarFora?: number;
  dataJogo?: Date;
  horaJogo?: string;
  localJogo?: string;
  fase?: string;
}

export interface Placar {
  placarCasa?: number | null;
  placarFora?: number | null;
  placarPenaltisCasa?: number | null;
  placarPenaltisFora?: number | null;
  palpiteId?: string;
}

export type FontePlacar = {
  partidaKey: string;
  placarCasa?: number;
  placarFora?: number;
  placarPenaltisCasa?: number;
  placarPenaltisFora?: number;
  palpiteId?: string;
};

function sortByDataHoraJogo(
  a: { dataJogo?: string | null; horaJogo?: string | null },
  b: { dataJogo?: string | null; horaJogo?: string | null }
): number {
  const toTimestamp = (data?: string | null, hora?: string | null): number => {
    if (!data) return Infinity;

    const horaSafe = hora && hora.match(/^\d{2}:\d{2}$/) ? hora : "00:00";
    const fullStr = `${data}T${horaSafe}:00`;

    const dt = new Date(fullStr);
    return isNaN(dt.getTime()) ? Infinity : dt.getTime();
  };

  const timeA = toTimestamp(a.dataJogo, a.horaJogo);
  const timeB = toTimestamp(b.dataJogo, b.horaJogo);

  return timeA - timeB;
}

export function generateGroupGamesFromDB(
  partidas: Record<number, Partida> | Record<number, Palpite>
) {
  return Object.values(partidas)
    .reduce<Partida[]>((acc, p) => {
      if (p.grupo) {
        acc.push({
          id: p.id,
          campeonatoId: 1, // ID do evento Copa do Mundo 2026
          numeroPartida: p.numeroPartida,
          placarCasa: p.placarCasa,
          placarFora: p.placarFora,
          timeCasa: p.timeCasa,
          timeFora: p.timeFora,
          simboloCasa:
            getImagemSelecoesURL(p.simboloCasa) || defaultParticipante,
          simboloFora:
            getImagemSelecoesURL(p.simboloFora) || defaultParticipante,
          dataJogo: p.dataJogo ?? undefined,
          horaJogo: p.horaJogo ?? undefined,
          localJogo: p.localJogo ?? undefined,
          fase: p.fase ?? undefined
        });
      }
      return acc;
    }, [])
    .sort(sortByDataHoraJogo);
}

export function generateNextRoundFromDB(partidas: Record<number, Partida>) {
  const fases: Record<string, Partida[]> = {};

  Object.values(partidas).forEach((p) => {
    const fase = p.fase;
    if (!fase) return;

    if (!fases[fase]) {
      fases[fase] = [];
    }

    fases[fase].push({
      id: p.id,
      campeonatoId: 1, // ID do evento Copa do Mundo 2026
      numeroPartida: p.numeroPartida,
      timeCasa: p.timeCasa,
      timeFora: p.timeFora,
      placarCasa: p.placarCasa ?? undefined,
      placarFora: p.placarFora ?? undefined,
      placarPenaltisCasa: p.placarPenaltisCasa ?? undefined,
      placarPenaltisFora: p.placarPenaltisFora ?? undefined,
      simboloCasa: getImagemSelecoesURL(p.simboloCasa) || defaultParticipante,
      simboloFora: getImagemSelecoesURL(p.simboloFora) || defaultParticipante,
      dataJogo: p.dataJogo ?? null,
      horaJogo: p.horaJogo ?? null,
      localJogo: p.localJogo ?? null,
      fase: p.fase ?? undefined
    });
  });

  Object.keys(fases).forEach((fase) => {
    fases[fase].sort(sortByDataHoraJogo);
  });

  return fases;
}

function normalize(p: Partida | Palpite): FontePlacar {
  if ("partidaId" in p) {
    return {
      partidaKey: p.partidaId,
      placarCasa: p.placarCasa ?? undefined,
      placarFora: p.placarFora ?? undefined,
      placarPenaltisCasa: p.placarPenaltisCasa ?? undefined,
      placarPenaltisFora: p.placarPenaltisFora ?? undefined,
      palpiteId: p.id ?? undefined
    };
  }

  return {
    partidaKey: p.id,
    placarCasa: p.placarCasa,
    placarFora: p.placarFora
  };
}

export function generateScoresFromDB(
  input: Record<number, Partida> | Record<number, Palpite>
): Record<string, Placar> {
  const placares: Record<string, Placar> = {};

  Object.values(input).forEach((p) => {
    const n = normalize(p);
    placares[n.partidaKey] = {
      placarCasa: n.placarCasa,
      placarFora: n.placarFora,
      placarPenaltisCasa: n.placarPenaltisCasa,
      placarPenaltisFora: n.placarPenaltisFora,
      palpiteId: n.palpiteId ? n.palpiteId : undefined
    };
  });

  return placares;
}
