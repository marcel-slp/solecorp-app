import axios from 'axios';
import { Participante } from '../stores/participantesStore';
import { Evento } from '../stores/eventosStore';
import { Entidade } from '../stores/entidadesStore';
import { Bolao, Convite, ParticipanteBolao, ParticipanteBolaoDTO } from '../stores/bolaoStore';
import { Partida, PartidaDTO } from '../stores/partidasStore';
import { Palpite } from '../stores/palpitesStore';
import { Criterio, PontuacaoCriterio } from '../stores/criteriosPontuacaoStore';
import { Perfil } from '../stores/perfisStore';
import { NovoUsuario, Usuario } from '../stores/usuariosStore';
import { Rateio, RateioDTO } from '../stores/rateiosStore';

const API_URL = 'https://solecorp.com.br/ambiente/api';

const buildParticipanteFormData = (participante: Participante): FormData => {
  const formData = new FormData();
  formData.append("id", participante.id);
  formData.append("nome", participante.nome);
  formData.append("tipo", participante.tipo);
  formData.append("grupo", String(participante.grupo));

  if (participante.atletas) {
    formData.append("atletas", JSON.stringify(participante.atletas));
  }

  if (participante.imagemParticipante) {
    formData.append("imagemParticipante", participante.imagemParticipante);
  }

  if (participante.imagemAtletas) {
    formData.append("imagemAtletas", participante.imagemAtletas);
  }

  return formData;
};

const buildFormData = (evento: Evento | Entidade | Bolao): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(evento)) {
    if (value === undefined || value === null) continue;    
    
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value) || typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
};

export const salvarParticipante = async (
  participante: Participante
): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = buildParticipanteFormData(participante);

    await axios.post(`${API_URL}/salvar_participante.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarParticipante = async (
  participante: Participante
): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = buildParticipanteFormData(participante);

    await axios.post(`${API_URL}/editar_participante.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarParticipantes = async (): Promise<{
  data: Participante[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Participante[]>(`${API_URL}/buscar_participantes.php`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const deletarParticipante = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_participante.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarEventos = async (): Promise<{
  data: Evento[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Evento[]>(`${API_URL}/buscar_eventos.php`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const buscarEventoPorId = async (id: string): Promise<{
  data: Evento | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Evento>(`${API_URL}/buscar_evento.php?id=${id}`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro ao buscar evento",
    };
  }
};

export const salvarEvento = async (evento: Evento): Promise<{ success: boolean, message?: string }> => {
  try {
    const formData = buildFormData(evento);
    
    await axios.post(`${API_URL}/salvar_evento.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarEvento = async (evento: Evento) => {
  try {
    const formData = buildFormData(evento);
    
    await axios.post(`${API_URL}/editar_evento.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarEvento = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_evento.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarEntidadesPorUserId = async (userId: number): Promise<{
  data: Entidade[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Entidade[]>(`${API_URL}/buscar_entidades_por_userid.php?userId=${userId}`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const buscarEntidadePorId = async (id: string): Promise<{
  data: Entidade | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Entidade>(`${API_URL}/buscar_entidade.php?id=${id}`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro ao buscar evento",
    };
  }
};

export const salvarEntidade = async (entidade: Entidade): Promise<{ success: boolean, message?: string }> => {
  try {
    const formData = buildFormData(entidade);
    
    await axios.post(`${API_URL}/salvar_entidade.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarEntidade = async (entidade: Entidade) => {
  try {
    const formData = buildFormData(entidade);
    
    await axios.post(`${API_URL}/editar_entidade.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarEntidade = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_entidade.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const registrarUsuario = async (nome: string, email: string, password: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const res = await axios.post<{ message: string }>(`${API_URL}/registrar_usuario.php`, { nome, email, password });
    return { success: true, message: res.data.message };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.error ?? 'Erro desconhecido no servidor';
      return { success: false, message: errorMessage };
    }
    return { success: false, message: 'Erro inesperado' };
  }
};

export const loginUsuario = async (email: string, password: string): 
  Promise<{ success: boolean, message: string, userId?: string, email?: string, nome?: string, perfilId?: string }> => 
{
  try {
    const res = await axios.post<{
      userId: string | undefined; 
      email: string | undefined, 
      nome: string | undefined; 
      perfilId: string | undefined;
      message: string
    }>(`${API_URL}/login.php`, { email, password });
    
    return { success: true, message: res.data.message, userId: res.data.userId, email: res.data.email, nome: res.data.nome, perfilId: res.data.perfilId };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.error ?? 'Erro desconhecido no servidor';
      return { success: false, message: errorMessage };
    }
    return { success: false, message: 'Erro inesperado' };
  }
};

export const verificarEmailUsuario = async (email: string) => {
  try {
    const res = await axios.post(`${API_URL}/verificar_email.php`, { email });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.error ?? 'Erro desconhecido no servidor';
      return { success: false, message: errorMessage };
    }
    return { success: false, message: 'Erro inesperado' };
  }
};

export const alterarSenhaUsuario = async (email: string, senha: string) => {
  try {
    const res = await axios.post(`${API_URL}/alterar_senha.php`, {
    email,
    senha,
  });    
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.error ?? 'Erro desconhecido no servidor';
      return { success: false, message: errorMessage };
    }
    return { success: false, message: 'Erro inesperado' };
  }
};

export const buscarBolaoPorIdUserId = async (id: string, userId: number): Promise<{
  data: Bolao | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Bolao>(`${API_URL}/buscar_bolao.php?id=${id}&userId=${userId}`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro ao buscar evento",
    };
  }
};

export const salvarBolao = async (bolao: Bolao): Promise<{ success: boolean, message?: string }> => {
  try {
    const formData = buildFormData(bolao);
    
    await axios.post(`${API_URL}/salvar_bolao.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarBolao = async (bolao: Bolao) => {
  try {
    const formData = buildFormData(bolao);
    
    await axios.post(`${API_URL}/editar_bolao.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarBolao = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_bolao.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarBoloesPorUserId = async (userId: number): Promise<{
  data: Bolao[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Bolao[]>(`${API_URL}/buscar_boloes_por_userid.php?userId=${userId}`);    
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const editarParticipanteBolao = async (participanteBolao: ParticipanteBolaoDTO) => {
  try {
    await axios.post(`${API_URL}/editar_participante_bolao.php`, participanteBolao, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarParticipanteBolao = async (userId: number) => {
  try {
    await axios.delete(`${API_URL}/deletar_participante_bolao.php?userId=${userId}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarParticipanteBolaoLogado = async (bolaoId: string, userId: number): Promise<{
  data: ParticipanteBolao | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<ParticipanteBolao>(`${API_URL}/buscar_participante_bolao_por_bolaoid_userid.php?bolaoId=${bolaoId}&userId=${userId}`);
    
    return { data: res.data, error: null };
  } catch (err: unknown) {
    const errorMessage = axios.isAxiosError(err)
      ? err.response?.data?.error || err.message
      : 'Erro desconhecido ao buscar participantes';
    return { data: null, error: errorMessage };
  }
};

export const buscarParticipantesBolaoPorBolaoId = async (bolaoId: string, userId: number): Promise<{
  data: ParticipanteBolao[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<ParticipanteBolao[]>(`${API_URL}/buscar_participantes_bolao_por_bolaoid.php?bolaoId=${bolaoId}&userId=${userId}`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    const errorMessage = axios.isAxiosError(err)
      ? err.response?.data?.error || err.message
      : 'Erro desconhecido ao buscar participantes';
    return { data: null, error: errorMessage };
  }
};

export const editarPartida = async (partida: PartidaDTO) => {
  try {
    await axios.post(`${API_URL}/editar_partida.php`, partida, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarPartidas = async (partidas: PartidaDTO[]) => {
  try {
    await axios.post(`${API_URL}/editar_partidas.php`, JSON.stringify(partidas), {
      headers: { "Content-Type": "application/json" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarPartidasPorCampeonatoId = async (campeonatoId: number): Promise<{
  data: Partida[] | null;
  success: boolean,
  error: string | null;
}> => {
  try {
    const res = await axios.get<Partida[]>(`${API_URL}/buscar_partidas_por_campeonatoid.php?campeonatoId=${campeonatoId}`);
    return { data: res.data, error: null, success: true };
  } catch (err: unknown) {
    return {
      data: null,
      success: false,
      error: axios.isAxiosError(err) ? err.message : "Erro ao buscar partida",
    };
  }
};

export const buscarPalpitesPorBolaoId = async (bolaoId: string): Promise<{
  data: Record<number, Palpite[]> | null;
  success: boolean,
  error: string | null;
}> => {
  try {
    const res = await axios.get<Record<number, Palpite[]>>(`${API_URL}/buscar_palpites_bolaoid.php?bolaoId=${bolaoId}`);
    return { data: res.data, error: null, success: true };
  } catch (err: unknown) {
    return {
      data: null,
      success: false,
      error: axios.isAxiosError(err) ? err.message : "Erro ao buscar palpite",
    };
  }
};

export const buscarPalpitesPorBolaoIdUserId = async (bolaoId: string, userId: number): Promise<{
  data: Palpite[] | null;
  success: boolean,
  error: string | null;
}> => {
  try {
    const res = await axios.get<Palpite[]>(`${API_URL}/buscar_palpites_bolaoid_userid.php?bolaoId=${bolaoId}&userId=${userId}`);
    return { data: res.data, error: null, success: true };
  } catch (err: unknown) {
    return {
      data: null,
      success: false,
      error: axios.isAxiosError(err) ? err.message : "Erro ao buscar palpite",
    };
  }
};

export const salvarPalpites = async (palpites: Palpite[]): Promise<{success: true;} | {
  success: false;
  error: string;
}> => {
  try {
    await axios.post(`${API_URL}/salvar_palpites.php`, JSON.stringify(palpites),
      { headers: { "Content-Type": "application/json" } }
    );

    return {success: true};
  } catch (err: unknown) {
    return {
      success: false,
      error: axios.isAxiosError(err) ? err.message : "Erro ao salvar palpite",
    };
  }
};

export const salvarCriterio = async (criterio: Criterio): Promise<{ success: boolean, message?: string }> => {
  try {
    await axios.post(`${API_URL}/salvar_criterio.php`, criterio, 
      {headers: { "Content-Type": "multipart/form-data" }}
    );
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarCriterio = async (criterio: Criterio) => {
  try {
    await axios.post(`${API_URL}/editar_criterio.php`, criterio, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarCriterio = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_criterio.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarCriterios = async (): Promise<{
  data: Criterio[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Criterio[]>(`${API_URL}/buscar_criterios.php`);

    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const salvarPontuacaoCriterio = async (pontuacaoCriterio: PontuacaoCriterio): Promise<{ success: boolean, message?: string }> => {
  try {
    await axios.post(`${API_URL}/salvar_pontuacao_criterio.php`, pontuacaoCriterio, 
      {headers: { "Content-Type": "multipart/form-data" }}
    );
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarPontuacaoCriterio = async (pontuacaoCriterio: PontuacaoCriterio) => {
  try {
    await axios.post(`${API_URL}/editar_pontuacao_criterio.php`, pontuacaoCriterio, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarPontuacaoCriterio = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_pontuacao_criterio.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarPontuacaoCriteriosPorBolaoId = async (bolaoId: string): Promise<{
  data: PontuacaoCriterio[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<PontuacaoCriterio[]>(`${API_URL}/buscar_pontuacao_criterios_bolaoid.php?bolaoId=${bolaoId}`);

    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const aceitarConvite = async (dadosConvite: Convite) => {
  try {
    await axios.post(`${API_URL}/aceitar_convite.php`, dadosConvite, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const salvarPerfil = async (perfil: Perfil): Promise<{ success: boolean; message?: string }> => {
  try {
    await axios.post(`${API_URL}/salvar_perfil.php`, perfil, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarPerfil = async (perfil: Perfil): Promise<{ success: boolean; message?: string }> => {
  try {
    await axios.post(`${API_URL}/editar_perfil.php`, perfil, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarPerfis = async (): Promise<{
  data: Perfil[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Perfil[]>(`${API_URL}/buscar_perfis.php`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const deletarPerfil = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_perfil.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const salvarUsuario = async (usuario: NovoUsuario): Promise<{ 
  success : boolean;
  data?: Usuario; 
  error?: string | null; 
}> => {
  try {
    const res = await axios.post<Usuario>(`${API_URL}/salvar_usuario.php`, usuario, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: axios.isAxiosError(err) ? err.message : "Erro desconhecido", };
  }
};

export const editarUsuario = async (usuario: Usuario): Promise<{ success: boolean; message?: string }> => {
  try {
    await axios.post(`${API_URL}/editar_usuario.php`, usuario, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarUsuarios = async (): Promise<{
  data: Usuario[] | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Usuario[]>(`${API_URL}/buscar_usuarios.php`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const deletarUsuario = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/deletar_usuario.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const salvarRateio = async (rateio: Rateio): Promise<{ success: boolean, message?: string }> => {
  try {
    await axios.post(`${API_URL}/salvar_rateio.php`, rateio, 
      {headers: { "Content-Type": "multipart/form-data" }}
    );
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const editarRateio = async (rateio: Partial<RateioDTO>) => {
  try {
    await axios.post(`${API_URL}/editar_rateio.php`, rateio, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const deletarRateio = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/deletar_rateio.php?id=${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};

export const buscarRateioPorBolaoId = async (bolaoId: string): Promise<{
  data: Rateio | null;
  error: string | null;
}> => {
  try {
    const res = await axios.get<Rateio>(`${API_URL}/buscar_rateio_bolaoid.php?bolaoId=${bolaoId}`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido",
    };
  }
};

export const buscarFeedNoticias = async () => {
  try {
    const res = await axios.get(`${API_URL}/buscar_feed_noticias.php`);
    return { data: res.data, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: axios.isAxiosError(err) ? err.message : "Erro desconhecido ao coletar feed de notícias",
    };
  }
};
