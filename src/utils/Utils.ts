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
  return auth.nomePerfil;
};

export const retornaUserHabilitarPalpite = (): string => {
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
  return auth.habilitarPalpite;
};

export const recordToArray = <T>(obj?: Record<string, T>): T[] =>
  Object.values(obj ?? {});

export const formatarDataHoraBrasil = (dataString: string | null | undefined): string => {
  if (!dataString) return '—';
  return new Date(dataString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function getDataHoraPartida(dataJogo: string, horaJogo?: string) {
  if (!dataJogo) return null;

  const [ano, mes, dia] = dataJogo.split("-").map(Number);

  let hora = 0;
  let minuto = 0;

  if (horaJogo) {
    const [h, m] = horaJogo.split(":").map(Number);
    hora = h;
    minuto = m;
  }

  return new Date(ano, mes - 1, dia, hora, minuto);
}
