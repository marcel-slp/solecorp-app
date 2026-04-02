import { useMemo } from "react";
import * as styles from "./styles.css.ts";
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { Bolao } from "../../stores/bolaoStore.ts";
import { PontuacaoParticipante } from "../../pages/BolaoPage/BolaoClassificacao/index.tsx";

interface TabelaClassificacaoBolaoProps {
  bolao: Bolao;
  loggedUserId: number;
  criterioFiltro: string;
  pontuacoes: PontuacaoParticipante[];
}

function TabelaClassificacaoBolao({criterioFiltro, pontuacoes}: TabelaClassificacaoBolaoProps) {
  const classificacao = useMemo(() => {
    if (!pontuacoes.length) return [];

    const lista = pontuacoes.map((p) => {
      let pts = 0;

      if (criterioFiltro === "Geral") {
        pts = p.ptsTotalParticipante;
      } else {
        switch (criterioFiltro) {
          case "Placar Cravado":
            pts = p.ptsPlacarCravado;
            break;
          case "Resultado":
            pts = p.ptsResultado;
            break;
          case "Diferença":
            pts = p.ptsDiferencaGols;
            break;
          case "Gols":
            pts = p.ptsGols;
            break;
          case "Placar Cravado Pênaltis":
            pts = p.ptsPlacarCravadoPenaltis;
            break;
          case "Classificação Pênaltis":
            pts = p.ptsClassificacaoPenaltis;
            break;
          // case "Bônus 1":
          //   pts = p.ptsBonus1;
          //   break;
          // case "Bônus 2":
          //   pts = p.ptsBonus2;
          //   break;
          // case "Bônus 3":
          //   pts = p.ptsBonus3;
          //   break;
          default:
            pts = 0;
        }
      }

      return {
        posicao: 0,
        participante: p.nome,
        pts,
      };
    });

    lista.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return a.participante.localeCompare(b.participante);
    });

    lista.forEach((item, i) => (item.posicao = i + 1));

    return lista;
  }, [pontuacoes, criterioFiltro]);

  return (
    <Box width="50%" overflowX="auto">
      <TableContainer>
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr className={styles.trHeadContainer}>
              <Th w="40px" className={styles.thItem} color="black">
                POS
              </Th>
              <Th className={styles.thItem} pl={2}>
                PARTICIPANTE
              </Th>
              <Th w="60px" className={styles.thItem} color="navy">
                PTS
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {classificacao.map((item) => (
              <Tr key={item.participante} className={styles.trBodyContainer}>
                <Td fontWeight="bold" color="navy">
                  {item.posicao}
                </Td>
                <Td pl={3} color="black" fontWeight="medium">
                  {item.participante}
                </Td>
                <Td fontWeight="bold" fontSize="lg" color="navy">
                  {item.pts}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {classificacao.length === 0 && (
        <Text textAlign="center" mt={4} color="gray.500">
          Ainda não há participantes ou pontuações calculadas.
        </Text>
      )}
    </Box>
  );
}

export default TabelaClassificacaoBolao;