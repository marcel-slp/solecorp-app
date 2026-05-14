import { useMemo } from "react";
import * as styles from "./styles.css.ts";
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { classificacaoStore } from "../../stores/classificacaoStore.ts";

interface TabelaClassificacaoBolaoProps {
  criterioFiltro: string;
  isGeral?: boolean;
}

function TabelaClassificacaoBolao({criterioFiltro, isGeral}: TabelaClassificacaoBolaoProps) {

  const { getClassificacaoPorCriterio } = classificacaoStore();

  const classificacao = useMemo(() => {
    return getClassificacaoPorCriterio(criterioFiltro);
  }, [criterioFiltro, getClassificacaoPorCriterio]);

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr 
              className={styles.trHeadContainer}
              style={isGeral ? { backgroundColor: "#2C3E50", color: "white" } : {}}
            >
              <Th w="40px" className={styles.thItem} color={isGeral ? "white" : "black"}>
                POS
              </Th>
              <Th className={styles.thItem} pl={2} color={isGeral ? "white" : "black"}>
                PARTICIPANTE
              </Th>
              <Th w="60px" className={styles.thItem} color={isGeral ? "white" : "navy"}>
                PTS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {classificacao.map((item) => (
              <Tr key={item.userId} className={styles.trBodyContainer}>
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