import { useMemo } from "react";
import * as styles from "./styles.css.ts";
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { Bolao } from "../../stores/bolaoStore.ts";
import { classificacaoStore } from "../../stores/classificacaoStore.ts";

interface TabelaClassificacaoBolaoProps {
  bolao: Bolao;
  loggedUserId: number;
  criterioFiltro: string;
}

function TabelaClassificacaoBolao({criterioFiltro}: TabelaClassificacaoBolaoProps) {

  const { getClassificacaoPorCriterio } = classificacaoStore();

  const classificacao = useMemo(() => {
    return getClassificacaoPorCriterio(criterioFiltro);
  }, [criterioFiltro, getClassificacaoPorCriterio]);

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