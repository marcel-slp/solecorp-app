import { useEffect, useState } from "react";
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Flex,
  Divider,
  IconButton,
  Box,
  Text
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Criterio, criteriosPontuacaoStore } from "../../stores/criteriosPontuacaoStore";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../stores/bolaoStore";
import { TipoCriterioPontuacaoBolao } from "../../models/TipoCriterioBolao";
import * as styles from "./styles.css";

interface TabelasCriteriosPontuacaoProps {
  pontosEditaveis?: boolean;
}

export default function TabelasCriteriosPontuacao({ pontosEditaveis = true }: TabelasCriteriosPontuacaoProps) {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();

  const {
    criterios,
    pontuacaoCriterios,
    carregarCriterios,
    carregarPontuacaoCriterios,
    editarPontuacaoCriterio
  } = criteriosPontuacaoStore();

  const [pontuacoesInterno, setPontuacoesInterno] = useState<Record<string, { pontuacaoId: string, pontosPrimeiraFase?: number; pontosSegundaFase?: number; pontos?: number }>>({});

  useEffect(() => {
    carregarCriterios();
    carregarPontuacaoCriterios(bolao.id);
  }, [bolao.id, carregarCriterios, carregarPontuacaoCriterios]);

  useEffect(() => {
    const novasPontuacoes: Record<string, { 
      pontuacaoId: string,
      pontosPrimeiraFase?: number; 
      pontosSegundaFase?: number; 
      pontos?: number 
    }> = {};

    pontuacaoCriterios.forEach((pc) => {
      novasPontuacoes[pc.criterioId] = {
        pontuacaoId: pc.id,
        pontosPrimeiraFase: pc.pontosPrimeiraFase,
        pontosSegundaFase: pc.pontosSegundaFase,
        pontos: pc.pontos,
      };
    });

    setPontuacoesInterno(novasPontuacoes);
  }, [pontuacaoCriterios]);

  const criteriosPorJogo = criterios.filter(c => c.tipo === TipoCriterioPontuacaoBolao.POR_JOGO);
  //const criteriosExtra1 = criterios.filter(c => c.tipo === TipoCriterioPontuacaoBolao.EXTRA_1);
  const criteriosExtra2 = criterios.filter(c => c.tipo === TipoCriterioPontuacaoBolao.EXTRA_2);
  //const criteriosConvocacaoBonus = criterios.filter(c => c.tipo === TipoCriterioPontuacaoBolao.CONVOCACAO_BONUS);

  const salvarLinha = async (criterio: Criterio, pontuacaoId: string) => {
    const pontuacoesInternoDoCriterio = pontuacoesInterno[criterio.id] || {};

    const dadosAtualizacao = {
      bolaoId: bolao.id,
      criterioId: criterio.id,
      pontosPrimeiraFase: pontuacoesInternoDoCriterio.pontosPrimeiraFase,
      pontosSegundaFase: pontuacoesInternoDoCriterio.pontosSegundaFase,
      pontos: pontuacoesInternoDoCriterio.pontos,
    };

    const response = await editarPontuacaoCriterio(pontuacaoId, dadosAtualizacao);

    if (response) {
      alert(`Pontuação do critério "${criterio.situacao}" salva com sucesso!`);
    } else {
      alert(`Erro ao salvar pontuação do critério ${criterio.situacao}. Verifique os logs.`);
    }
  };

  const handleLocalChange = (
    criterioId: string,
    campo: "pontosPrimeiraFase" | "pontosSegundaFase" | "pontos",
    valor: number
  ) => {
    setPontuacoesInterno(prev => ({
      ...prev,
      [criterioId]: {
        ...prev[criterioId],
        [campo]: valor,
      },
    }));
  };

  function criterioNaoImplementados (criterio: string): boolean {
     return criterio === "Classificação para 2ª Fase" || criterio === "Classificação Grupos" ||
      criterio === "Convocação" || criterio === "Bônus 1" || criterio === "Bônus 2" || criterio === "Bônus 3";
  }

  const renderTabelaPorJogo = (titulo: string) => (
    <>
      <Heading size="md" my={4}>{titulo}</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr backgroundColor="gray.200">
              <Th textAlign={"center"}>Situação</Th>
              <Th textAlign={"center"}>Descrição</Th>
              <Th textAlign={"center"}>Pontos 1ª Fase</Th>
              <Th textAlign={"center"}>Pontos 2ª Fase</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {criteriosPorJogo.map((criterio) => {
              const pontuacao = pontuacoesInterno[criterio.id] || {};
              return (
                <Tr key={criterio.id}>
                  <Td textAlign={"center"}>{criterio.situacao}</Td>
                  <Td textAlign={"center"}>{criterio.descricao}</Td>
                  <Td textAlign={"center"}>
                    <Input
                      disabled={
                        !pontosEditaveis || 
                        criterio.situacao === "Classificação Pênaltis" || 
                        criterio.situacao === "Placar Cravado Pênaltis"
                      }
                      bg={"white"}
                      width={"60%"}
                      textAlign={"center"}
                      border={"1px solid grey"}
                      value={pontuacao.pontosPrimeiraFase ?? ""}
                      onChange={(e) => handleLocalChange(criterio.id, 'pontosPrimeiraFase', Number(e.target.value))}
                    />
                  </Td>
                  <Td textAlign={"center"}>
                    <Input
                      className={styles.inputPontosPorJogo}
                      disabled={!pontosEditaveis}
                      bg={"white"}
                      width={"60%"}
                      textAlign={"center"}
                      border={"1px solid grey"}
                      value={pontuacao.pontosSegundaFase ?? ""}
                      onChange={(e) => handleLocalChange(criterio.id, 'pontosSegundaFase', Number(e.target.value))}
                    />
                  </Td>
                  <Td textAlign={"center"}>
                    <IconButton
                      aria-label="Salvar critério"
                      hidden={!pontosEditaveis}
                      icon={<CheckIcon />}
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => salvarLinha(criterio, pontuacao.pontuacaoId)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );

  const renderTabelaExtra = (criteriosLista: Criterio[], titulo: string) => (
    <>
      <Heading size="md" my={4}>{titulo}</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr backgroundColor="gray.200">
              <Th textAlign={"center"}>Situação</Th>
              <Th textAlign={"center"}>Descrição</Th>
              <Th textAlign={"center"}>Pontos</Th>
              {/* <Th textAlign={"center"}>Condição</Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {criteriosLista.map((criterio) => {
              const pontuacao = pontuacoesInterno[criterio.id] || {};
              return (
                <Tr key={criterio.id}>
                  <Td textAlign={"center"}>
                    <Text color={!criterioNaoImplementados(criterio.situacao) ? 'black' : 'grey'}>
                      {criterio.situacao}
                    </Text>
                  </Td>
                  <Td textAlign={"center"}>
                    <Text color={!criterioNaoImplementados(criterio.situacao) ? 'black' : 'grey'}>
                      {criterio.descricao}
                    </Text>
                  </Td>
                  <Td textAlign={"center"}>
                    <Input
                      bg={"white"}
                      width={"60px"}
                      textAlign={"center"}
                      border={"1px solid grey"}
                      disabled={!pontosEditaveis || criterioNaoImplementados(criterio.situacao)}
                      value={pontuacao.pontos ?? ""}
                      onChange={(e) => handleLocalChange(criterio.id, 'pontos', Number(e.target.value))}
                    />
                  </Td>
                  {/* <Td textAlign={"center"}>
                    <Text color={!criterioNaoImplementados(criterio.situacao) ? 'black' : 'grey'}>
                      {criterio.condicao}
                    </Text>
                  </Td> */}
                  <Td textAlign={"center"}>
                    <IconButton
                      aria-label="Salvar critério"
                      hidden={!pontosEditaveis || criterioNaoImplementados(criterio.situacao)}
                      icon={<CheckIcon />}
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => salvarLinha(criterio, pontuacao.pontuacaoId)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <>
      <Heading mt={4}>Critérios de Pontuação - {bolao.nome}</Heading>

      <Flex direction="row" gap={3} wrap="nowrap">
        <Box flex="1">
          {renderTabelaPorJogo("Pontuação Por Jogo")}
        </Box>

        <Divider orientation= "vertical" className={styles.divider} />

        <Box flex="1">
          {renderTabelaExtra(criteriosExtra2, "Pontuação Extra 2")}
        </Box>

        {/* <Box flex="1">
          {renderTabelaExtra(criteriosExtra1, "Pontuação Extra 1")}
        </Box> */}
      </Flex>

      {/* <Flex direction="row" gap={8} wrap="nowrap" mt={8}>
        <Box flex="1">
          {renderTabelaExtra(criteriosExtra2, "Pontuação Extra 2")}
        </Box>

        <Divider orientation= "vertical" className={styles.divider} />

        <Box flex="1">
          {renderTabelaExtra(criteriosConvocacaoBonus, "Pontuação Convocação e Bônus")}
        </Box>
      </Flex> */}
    </>
  );
}