export const tabelasPadrao: Record<string, string> = {
  "04": `participantes = 4
rodadas = 3
jogos = 2
rodada 1
A
C
B
D
rodada 2
D
A
B
C
rodada 3
C
D
A
B`,

  "05": `participantes = 5
rodadas = 5
jogos = 2
rodada 1
B
C
D
E
rodada 2
E
A
D
B
rodada 3
E
C
A
D
rodada 4
C
A
B
E
rodada 5
C
D
A
B`,

  "06": `participantes = 6
rodadas = 5
jogos = 3
rodada 1
E
C
B
F
A
D
rodada 2
C
A
F
D
E
B
rodada 3
A
F
B
C
D
E
rodada 4
B
D
E
A
C
F
rodada 5
F
E
D
C
A
B`,

  "07": `participantes = 7
rodadas = 7
jogos = 3
rodada 1
F
G
C
A
E
D
rodada 2
B
G
E
C
F
D
rodada 3
A
E
D
G
C
B
rodada 4
G
C
D
A
B
F
rodada 5
D
B
A
F
G
E
rodada 6
B
E
G
A
F
C
rodada 7
E
F
C
D
A
B`,

  "08": `participantes = 8
rodadas = 7
jogos = 4
rodada 1
C
F
B
G
E
A
D
H
rodada 2
H
B
E
C
D
G
A
F
rodada 3
C
A
F
H
G
E
B
D
rodada 4
E
D
A
H
G
C
B
F
rodada 5
F
G
C
B
H
E
D
A
rodada 6
B
E
A
G
F
D
H
C
rodada 7
G
H
E
F
C
D
A
B`,
};

export function getTabelaPadrao(codigo: string): {
  participantes: number;
  rodadas: number;
  jogos: number;
  rodadasDetalhes: string[][];
} {
  const texto = tabelasPadrao[codigo];
  // Fallback for unsupported participant counts
  if (!texto) {
    const numParts = parseInt(codigo);
    const jogos = Math.floor(numParts / 2);
    const rodadas = numParts % 2 === 0 ? numParts - 1 : numParts;
    const rodadasDetalhes: string[][] = [];
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Generate a simple round-robin-like structure
    for (let r = 0; r < rodadas; r++) {
      const rodada: string[] = [];
      for (let j = 0; j < jogos; j++) {
        const idx1 = (r + j) % numParts;
        const idx2 = (numParts - 1 - j + r) % numParts;
        rodada.push(letras[idx1], letras[idx2]);
      }
      rodadasDetalhes.push(rodada);
    }

    return {
      participantes: numParts,
      rodadas,
      jogos,
      rodadasDetalhes,
    };
  }

  const linhas = texto
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");

  let participantes = 0;
  let rodadas = 0;
  let jogos = 0;
  const rodadasDetalhes: string[][] = [];

  let i = 0;
  while (i < linhas.length) {
    const linha = linhas[i];
    if (linha.startsWith("participantes")) {
      participantes = parseInt(linha.split("=")[1].trim());
    } else if (linha.startsWith("rodadas")) {
      rodadas = parseInt(linha.split("=")[1].trim());
    } else if (linha.startsWith("jogos")) {
      jogos = parseInt(linha.split("=")[1].trim());
    } else if (linha.startsWith("rodada")) {
      const rodadaAtual: string[] = [];
      i++;
      while (i < linhas.length && !linhas[i].startsWith("rodada")) {
        rodadaAtual.push(linhas[i]);
        i++;
      }
      rodadasDetalhes.push(rodadaAtual);
      continue;
    }
    i++;
  }

  return {
    participantes,
    rodadas,
    jogos,
    rodadasDetalhes,
  };
}
