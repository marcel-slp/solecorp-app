export enum Formacao {
    PADRAO = 'padrao',
    CAMPANHA_GERAL = 'campanha',
    PERSONALIZADA = 'personalizada'
}

export enum Eliminacao {
    SIMPLES = 'simples',
    DUPLA = 'dupla',
    MISTA = 'mista',
    COMPLEXA = 'complexa'
}

export enum FormatoFase {
    GRUPOS = 'grupos',
    PLAYOFF = 'playoff'
}

export function mapToFormatoFaseValue(
    raw: string
): FormatoFase | undefined {
    const enumKeyValue: [string, FormatoFase] | undefined = Object.entries(
        FormatoFase
    ).find(([, value]) => raw === value);

    if (enumKeyValue) {
        return enumKeyValue[1];
    }
}

export enum FormatoTabela {
    NORMAL = 'normal',
    ESPELHADA = 'espelhada'
}

export enum ConfiguracaoPlayoff {
    FIXO = 'fixo',
    SORTEIO = 'sorteio'
}

export enum TipoPlayoff {
    NORMAL = 'normal',
    EUROPEU = 'europeu'
}

export enum DesempatePlayoff {
    POR_SCORE = 'score',
    POR_VANTAGEM = 'vantagem',
    PERSONALIZADA = 'personalizada'
}

export enum ClassificacaoFinal {
    POR_ETAPA = 'etapa',
    CAMPANHA_GERAL = 'campanha'
}

export enum FormaSistema {
    COPA = 'copa',
    LIGA = 'liga',
    TORNEIO = 'torneio'
}
