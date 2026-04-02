import { useEffect, useState } from "react";
import {
  PontosPorVitoria,
  PontosPorEmpate,
  PontosPorDerrota,
  Criterio1DesempateGrupo,
  Criterio2DesempateGrupo,
  Criterio3DesempateGrupo,
  Criterio4DesempateGrupo,
  Criterio5DesempateGrupo,
} from "../ProcessamentoTabelas/Config";
import * as styles from "./styles.css.ts";
import { placarStore } from "../../stores/placarStore.ts";
import { useOutletContext } from "react-router-dom";
import { Evento } from "../../stores/eventosStore.ts";
import { Box, Flex, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { existePlayerNoEvento, getImagemURL } from "../../utils/Utils.ts";
import defaultParticipante from "@/assets/images/default_participante.jpeg";

interface Props {
  fase: number;
  grupo: string;
  modoGeral: boolean;
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
}

interface ClassificacaoData {
  posicao: number;
  sinal: string;
  participante: string;
  simbolo: string;
  isPlaceholder: boolean;
  pts: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
  performance: string[];
  jogosrestantes: number;
  player?: string;
}

function TabelaClassificacao ({ 
  fase, 
  grupo,
  modoGeral,
  letraParaNome, 
  letraParaPlayer, 
  letraParaSimbolo, 
  letraParaNomeEhPlaceholder,
  tabelaPorGrupo
}: Props) {
  const [classificacao, setClassificacao] = useState<ClassificacaoData[]>([]);
  const imagemPadrao = "@/assets/images/default_participante.jpeg";
  const { placares, getPlacar } = placarStore();
  const { evento } = useOutletContext<{ evento: Evento }>();
  const incluirPlayer = existePlayerNoEvento(evento);

  useEffect(() => {
    const criterios = [
      Criterio1DesempateGrupo,
      Criterio2DesempateGrupo,
      Criterio3DesempateGrupo,
      Criterio4DesempateGrupo,
      Criterio5DesempateGrupo,
    ];

    const placaresPorFaseGrupo: Record<
      number,
      Record<
        string,
        Record<
          number,
          {
            participante1: string;
            participante2: string;
            placarCasa: number;
            placarFora: number;
          }
        >
      >
    > = {};

    const confrontoDireto = (a: string, b: string): number => {
      const jogos = placaresPorFaseGrupo[fase]?.[grupo] || {};
      for (const jogo of Object.values(jogos)) {
        if (
          (jogo.participante1 === a && jogo.participante2 === b) ||
          (jogo.participante1 === b && jogo.participante2 === a)
        ) {
          if (jogo.placarCasa === jogo.placarFora) return 0;
          if (jogo.participante1 === a && jogo.placarCasa > jogo.placarFora) return -1;
          if (jogo.participante2 === a && jogo.placarFora > jogo.placarCasa) return -1;
          return 1;
        }
      }
      return 0;
    };
    const desempatar = (a: ClassificacaoData, b: ClassificacaoData): number => {
      for (const criterio of criterios) {
        switch (criterio) {
          case "V":
            if (a.vitorias !== b.vitorias) return b.vitorias - a.vitorias;
            break;
          case "SG":
            if (a.saldoGols !== b.saldoGols) return b.saldoGols - a.saldoGols;
            break;
          case "GP":
            if (a.golsPro !== b.golsPro) return b.golsPro - a.golsPro;
            break;
          case "ConfrontoDireto":
            { const resultado = confrontoDireto(a.participante, b.participante);
            if (resultado !== 0) return resultado;
            break; }
          case "Ordem Alfabética":
            return a.participante.localeCompare(b.participante);
        }
      }
      return 0;
    };

    const gerarClassificacao = () => {
      const participantesMap: Record<string, ClassificacaoData> = {};
      const grupos = modoGeral
        ? Object.keys(tabelaPorGrupo[fase] || {})
        : [grupo];   
      
      grupos.forEach((grp) => {
        const numParticipantes =
          tabelaPorGrupo[fase]?.[grp]?.participantes || 0;

        for (let i = 0; i < numParticipantes; i++) {
          const letra = String.fromCharCode(65 + i);
          const key = grp + letra;
          const nome = letraParaNome[fase]?.[key] || `Participante ${letra}`;
          const simbolo = letraParaSimbolo[fase]?.[key] || imagemPadrao;
          const isPlaceholder = letraParaNomeEhPlaceholder[fase]?.[key] || false;
          const player = letraParaPlayer[fase]?.[key];
          participantesMap[key] = {
            posicao: 0,
            sinal: "",
            participante: nome,
            simbolo,
            isPlaceholder,
            pts: 0,
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0,
            saldoGols: 0,
            performance: [],
            jogosrestantes: 0,
            player: incluirPlayer ? player : undefined,
          };
        }
   
        const jogos = placares[evento.id]?.[fase]?.[grp] || {};
        const historico: Record<string, string[]> = {};

        Object.values(jogos).forEach((jogo) => {
          const keys = Object.entries(letraParaNome[fase] || {})
            .filter(
              ([, v]) => v === jogo.participante1 || v === jogo.participante2
            )
            .map(([k]) => k);
          const key1 = keys.find(
            (k) => letraParaNome[fase][k] === jogo.participante1
          );
          const key2 = keys.find(
            (k) => letraParaNome[fase][k] === jogo.participante2
          );
          if (!key1 || !key2) return;

          const p1 = participantesMap[key1];
          const p2 = participantesMap[key2];
          const g1 = jogo.placarCasa || 0;
          const g2 = jogo.placarFora || 0;

          if (isNaN(g1) || isNaN(g2)) return;

          p1.jogos += 1;
          p2.jogos += 1;
          p1.golsPro += g1;
          p1.golsContra += g2;
          p2.golsPro += g2;
          p2.golsContra += g1;

          if (g1 > g2) {
            p1.vitorias += 1;
            p2.derrotas += 1;
            p1.pts += parseInt(PontosPorVitoria);
            p2.pts += parseInt(PontosPorDerrota);
            historico[key1] = [...(historico[key1] || []), "V"];
            historico[key2] = [...(historico[key2] || []), "D"];
          } else if (g1 < g2) {
            p2.vitorias += 1;
            p1.derrotas += 1;
            p2.pts += parseInt(PontosPorVitoria);
            p1.pts += parseInt(PontosPorDerrota);
            historico[key2] = [...(historico[key2] || []), "V"];
            historico[key1] = [...(historico[key1] || []), "D"];
          } else {
            p1.empates += 1;
            p2.empates += 1;
            p1.pts += parseInt(PontosPorEmpate);
            p2.pts += parseInt(PontosPorEmpate);
            historico[key1] = [...(historico[key1] || []), "E"];
            historico[key2] = [...(historico[key2] || []), "E"];
          }
        });

        Object.entries(historico).forEach(([key, lista]) => {
          participantesMap[key].performance = lista.slice(-5);
        });
      });

      const listaFinal = Object.values(participantesMap).map((p) => {
        return {
          ...p,
          saldoGols: p.golsPro - p.golsContra,
        };
      });
      
      listaFinal.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (a.jogos === 0 && b.jogos === 0) {
          return a.participante.localeCompare(b.participante);
        }
        return desempatar(a, b);
      });

      listaFinal.forEach((p, i) => (p.posicao = i + 1));
      setClassificacao(listaFinal);
    };

    gerarClassificacao();
  }, [evento.id, evento.participantes, fase, getPlacar, grupo, incluirPlayer, letraParaNome, letraParaNomeEhPlaceholder, letraParaPlayer, letraParaSimbolo, modoGeral, placares, tabelaPorGrupo]);

  return (
    <Box width="100%" overflowX="auto">
      <TableContainer>
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr className={styles.trHeadContainer}>
              <Th w="40px" className={styles.thItem} color="black">POS</Th>
              <Th w="40px" />
              <Th w="240px" className={styles.thItem} pl={2}>PARTICIPANTE</Th>
              <Th w="20px" />
              <Th w="60px" className={styles.thItem} color="navy">PTS</Th>
              <Th w="40px" className={styles.thItem}>J</Th>
              <Th w="40px" className={styles.thItem}>V</Th>
              <Th w="40px" className={styles.thItem}>E</Th>
              <Th w="40px" className={styles.thItem}>D</Th>
              <Th w="50px" className={styles.thItem}>GP</Th>
              <Th w="50px" className={styles.thItem}>GC</Th>
              <Th w="50px" className={styles.thItem}>SG</Th>
              <Th w="150px" className={styles.thItem}>HR</Th>
              <Th w="50px" className={styles.thItem}>JR</Th>
              {incluirPlayer && <Th w="200px" textAlign="left" fontWeight="bold">PLAYER</Th>}
            </Tr>
          </Thead>

          <Tbody>
            {classificacao.map((item) => {
              return (
                <Tr key={item.participante} className={styles.trBodyContainer}>
                  <Td color="navy" fontWeight="bold" className={styles.tdItem}>
                    {item.posicao}
                  </Td>

                  <Td className={styles.tdItem} width="50px">
                    <Image
                      src={getImagemURL(item.simbolo)}
                      alt=""
                      className={styles.imagemParticipante}
                      borderRadius= "full"
                      fallbackSrc={defaultParticipante}
                    />
                  </Td>

                  <Td pl={3} color={item.isPlaceholder ? "gray" : "black"} fontWeight="medium">
                    {item.participante}
                  </Td>

                  <Td />

                  <Td className={styles.tdItem} color="navy" fontWeight="bold" fontSize="lg">
                    {item.pts}
                  </Td>

                  <Td className={styles.tdItem}>{item.jogos}</Td>
                  <Td className={styles.tdItem}>{item.vitorias}</Td>
                  <Td className={styles.tdItem}>{item.empates}</Td>
                  <Td className={styles.tdItem}>{item.derrotas}</Td>
                  <Td className={styles.tdItem}>{item.golsPro}</Td>
                  <Td className={styles.tdItem}>{item.golsContra}</Td>
                  <Td className={styles.tdItem}>{item.saldoGols}</Td>

                  <Td>
                    <Flex justify="center" gap={1.5}>
                      {item.performance.map((res, i, arr) => (
                        <Box
                          key={i}
                          boxSize="13px"
                          borderRadius="full"
                          bg={
                            res === "V"
                              ? "green"
                              : res === "E"
                              ? "yellow"
                              : res === "D"
                              ? "red"
                              : "gray"
                          }
                          border={i === arr.length - 1 ? "1.5px solid silver" : "none"}
                        />
                      ))}
                    </Flex>
                  </Td>
                  <Td textAlign="center">{item.jogosrestantes}</Td>
                  {incluirPlayer && <Td>{item.player || "-"}</Td>}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Text className={styles.legenda}>
        Legenda: <strong>PTS</strong>: Pontos • <strong>J</strong>: Jogos • <strong>V</strong>: Vitórias • <strong>E</strong>: Empates • <strong>D</strong>: Derrotas • <strong>GP</strong>: Gols Pró • <strong>GC</strong>: Gols Contra • <strong>SG</strong>: Saldo de Gols • <strong>HR</strong>: Histórico Recente • <strong>JR</strong>: Jogos Restantes
      </Text>
    </Box>
  );
};

export default TabelaClassificacao;
