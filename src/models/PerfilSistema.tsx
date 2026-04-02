export enum PerfilSistema {
    ADMIN = 'admin',
    USER_SIMPLES = 'user_simples',
    USER_PAGO = 'user_pago'
}

export const perfilNomeIdMapping: Record<string, string> = {
    'admin': 'a1b2c',
    'user_simples': 'a2b1c',
    'user_pago': '81e63'
};

export const perfilIdNomeMapping: Record<string, string> = Object.fromEntries(
  Object.entries(perfilNomeIdMapping).map(([nome, id]) => [id, nome])
);