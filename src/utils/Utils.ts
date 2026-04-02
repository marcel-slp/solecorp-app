import { Evento } from "../stores/eventosStore";

export const getImagemURL = (caminho: string) => {
  if (!caminho) return 'uploads/imagens_padrao/default_participante.jpeg';
  return `https://solecorp.com.br/ambiente/api/${caminho}`;
};

export const getImagemSelecoesURL = (caminho: string) => {
  if (!caminho) return 'uploads/imagens_padrao/default_participante.jpeg';
  return `https://solecorp.com.br/ambiente/assets/${caminho}`;
};

export function existePlayerNoEvento(evento: Evento): boolean {
  if (!evento.participantes || evento.participantes.length === 0) {
    return false;
  }
  return evento.participantes.some(
    (p) => p.nomePlayer !== undefined && p.nomePlayer.trim() !== ""
  );
}

export const retornaUserId = (): number => {
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
  return auth.userId;
};

export const retornaUserPerfil = (): string => {
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
  return auth.perfilId;
};

export const retornaUserHabilitarPalpite = (): string => {
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
  return auth.habilitarPalpite;
};

export const recordToArray = <T>(obj?: Record<string, T>): T[] =>
  Object.values(obj ?? {});
