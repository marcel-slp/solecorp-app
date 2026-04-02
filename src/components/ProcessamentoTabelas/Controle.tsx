import * as caminho from "./Caminho";

type ChaveCaminho = keyof typeof caminho;

export function getGabarito(faseAtual: number): string {
  const faseAnterior = faseAtual - 1;
  if (faseAnterior < 1 || faseAtual > 4) return "00000000";

  const chaveGruposAnt = `gruposFase${faseAnterior}` as ChaveCaminho;
  const chaveClassGrupoAnt = `classGrupoFase${faseAnterior}` as ChaveCaminho;
  const chaveClassIndiceAnt = `classIndiceTecnicoFase${faseAnterior}` as ChaveCaminho;
  const chaveGruposAtual = `gruposFase${faseAtual}` as ChaveCaminho;

  const gruposAnt = caminho[chaveGruposAnt] || "00";
  const classGrupoAnt = caminho[chaveClassGrupoAnt] || "00";
  const classIndiceAnt = caminho[chaveClassIndiceAnt] || "00";
  const gruposAtual = caminho[chaveGruposAtual] || "00";

  return (
    String(gruposAnt).padStart(2, "0") +
    String(classGrupoAnt).padStart(2, "0") +
    String(classIndiceAnt).padStart(2, "0") +
    String(gruposAtual).padStart(2, "0")
  );
}

export function getModelo(faseAtual: number): string {
  const faseAnterior = faseAtual - 1;
  if (faseAnterior < 1 || faseAtual > 4) return "0000000000";

  const chaveGruposAnt = `gruposFase${faseAnterior}` as ChaveCaminho;
  const chaveClassGrupoAnt = `classGrupoFase${faseAnterior}` as ChaveCaminho;
  const chaveClassIndiceAnt = `classIndiceTecnicoFase${faseAnterior}` as ChaveCaminho;
  const chaveEtapa1 = `confrontosEtapa1POff` as ChaveCaminho;
  const chaveEtapa2 = `confrontosEtapa2POff` as ChaveCaminho;

  const gruposAnt = caminho[chaveGruposAnt] || "00";
  const classGrupoAnt = caminho[chaveClassGrupoAnt] || "00";
  const classIndiceAnt = caminho[chaveClassIndiceAnt] || "00";
  const etapa1 = caminho[chaveEtapa1] || "00";
  const etapa2 = caminho[chaveEtapa2] || "00";

  return (
    String(gruposAnt).padStart(2, "0") +
    String(classGrupoAnt).padStart(2, "0") +
    String(classIndiceAnt).padStart(2, "0") +
    String(etapa1).padStart(2, "0") +
    String(etapa2).padStart(2, "0")
  );
}