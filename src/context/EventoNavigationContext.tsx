/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useState } from "react";
import { Evento } from "../stores/eventosStore";
import { getTabelaPadrao } from "../components/ProcessamentoTabelas/ProcTab";

interface EventoNavigationContextType {
  faseAtiva: number;
  setFaseAtiva: (fase: number) => void;
  grupoAtivo: string;
  setGrupoAtivo: (grupo: string) => void;
  modoGeral: boolean;
  setModoGeral: (valor: boolean) => void;
  letraParaNome: Record<number, Record<string, string>>;
  letraParaPlayer: Record<number, Record<string, string>>;
  letraParaSimbolo: Record<number, Record<string, string>>;
  letraParaNomeEhPlaceholder: Record<number, Record<string, boolean>>;
  tabelaPorGrupo: Record<
    number,
    Record<
      string,
      {
        participantes: number;
        rodadas: number;
        jogos: number;
        rodadasDetalhes: string[][];
      }
    >
  >;
  jogoIndicesPorGrupo: Record<number, Record<string, number[][]>>;
}

const EventoNavigationContext = createContext<EventoNavigationContextType | undefined>(undefined);

type Props = {
  evento: Evento;
  children: React.ReactNode;
};

export const EventoNavigationProvider = ({ evento, children }: Props) => {
  const [faseAtiva, setFaseAtiva] = useState(1);
  const [grupoAtivo, setGrupoAtivo] = useState("A");
  const [modoGeral, setModoGeral] = useState(false);
  const dadosCalculados = useMemo(() => {
    const letraParaNome: Record<number, Record<string, string>> = {};
    const letraParaPlayer: Record<number, Record<string, string>> = {};
    const letraParaSimbolo: Record<number, Record<string, string>> = {};
    const letraParaNomeEhPlaceholder: Record<number, Record<string, boolean>> = {};
    const tabelaPorGrupo: Record<
      number,
      Record<
        string,
        {
          participantes: number;
          rodadas: number;
          jogos: number;
          rodadasDetalhes: string[][];
        }
      >
    > = {};
    const jogoIndicesPorGrupo: Record<
      number,
      Record<string, number[][]>
    > = {};
    let participanteIdx = 0;
    let globalJogoIndex = 1;

    for (let fase = 1; fase <= evento.numeroFases; fase++) {
      letraParaNome[fase] = {};
      letraParaPlayer[fase] = {};
      letraParaSimbolo[fase] = {};
      letraParaNomeEhPlaceholder[fase] = {};
      tabelaPorGrupo[fase] = {};
      jogoIndicesPorGrupo[fase] = {};

      const numGrupos = evento.configuracaoFases[fase - 1]?.grupos || 0;
      if (numGrupos === 0) continue;

      const basePartsPorGrupo = Math.floor(evento.numeroParticipantes / numGrupos);
      const extraParts = evento.numeroParticipantes % numGrupos;
      const partsPorGrupo = Array(numGrupos).fill(basePartsPorGrupo);
      for (let i = 0; i < extraParts; i++) partsPorGrupo[i]++;

      const letrasGrupo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

      for (let g = 0; g < numGrupos; g++) {
        const letraGrupo = letrasGrupo[g];
        const numPartsGrupo = partsPorGrupo[g];
        const codigoTabela = numPartsGrupo.toString().padStart(2, "0");
        const tabelaPadrao = getTabelaPadrao(codigoTabela);

        tabelaPorGrupo[fase][letraGrupo] = {
          participantes: numPartsGrupo,
          rodadas: tabelaPadrao.rodadas,
          jogos: tabelaPadrao.jogos,
          rodadasDetalhes: tabelaPadrao.rodadasDetalhes,
        };

        jogoIndicesPorGrupo[fase][letraGrupo] = Array(tabelaPadrao.rodadas)
          .fill(0)
          .map(() => Array(tabelaPadrao.jogos).fill(0));

        for (let i = 0; i < numPartsGrupo; i++) {
          const letra = String.fromCharCode(65 + i);
          const key = letraGrupo + letra;
          const participante = evento.participantes?.[participanteIdx];
          letraParaNome[fase][key] = participante?.nome || `Participante ${i + 1}`;
          letraParaPlayer[fase][key] = participante?.nomePlayer || "N/A";
          letraParaNomeEhPlaceholder[fase][key] = !participante?.nome;
          letraParaSimbolo[fase][key] = String(participante?.imagemParticipante) || "";
          if (participante) participanteIdx++;
        }
      }

      const maxRodadas = Math.max(...Object.values(tabelaPorGrupo[fase]).map(t => t.rodadas));
      for (let rodada = 0; rodada < maxRodadas; rodada++) {
        for (let g = 0; g < numGrupos; g++) {
          const letraGrupo = letrasGrupo[g];
          const tabela = tabelaPorGrupo[fase][letraGrupo];
          if (rodada < tabela.rodadas) {
            for (let jogo = 0; jogo < tabela.jogos; jogo++) {
              jogoIndicesPorGrupo[fase][letraGrupo][rodada][jogo] = globalJogoIndex++;
            }
          }
        }
      }
    }

    return {
      letraParaNome,
      letraParaPlayer,
      letraParaSimbolo,
      letraParaNomeEhPlaceholder,
      tabelaPorGrupo,
      jogoIndicesPorGrupo,
    }
  }, [evento]);

  const value = {
    faseAtiva,
    setFaseAtiva,
    grupoAtivo,
    setGrupoAtivo,
    modoGeral,
    setModoGeral,
    ...dadosCalculados,
  };

  return (
    <EventoNavigationContext.Provider value={value}>
      {children}
    </EventoNavigationContext.Provider>
  );
};

export const useEventoNavigation = () => {
  const context = useContext(EventoNavigationContext);
  if (!context) throw new Error("useEventoNavigation deve ser usado dentro de EventoNavigationProvider");
  return context;
};