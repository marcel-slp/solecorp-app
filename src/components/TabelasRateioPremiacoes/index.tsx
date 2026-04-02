
//import * as styles from "./styles.css";
import { useEffect, useMemo } from "react";
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
  Box,
  Text,
  SimpleGrid,
  InputRightElement,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { Rateio, rateiosStore } from "../../stores/rateiosStore";
import { TipoCriterioPremiacaoBolao } from "../../models/TipoCriterioBolao";

import { Bolao, bolaoStore } from "../../stores/bolaoStore";
import { criteriosPontuacaoStore } from "../../stores/criteriosPontuacaoStore";
import { palpitesStore } from "../../stores/palpitesStore";
import { partidasStore } from "../../stores/partidasStore";
import { retornaUserId } from "../../utils/Utils";
import { calcularPontuacoesParticipantes } from "../TabelaClassificacaoBolao/scoreParticipantes";
import { PontuacaoParticipante } from "../../pages/BolaoPage/BolaoClassificacao";

interface TabelasRateioPremiacoesProps {
  rateioEditavel?: boolean;
  bolao: Bolao;
}

const CRITERIOS_PREMIACAO = [
  { key: TipoCriterioPremiacaoBolao.LUGAR_GERAL_1, label: "1º Lugar Geral", condicao: "1º Lugar na Classificação Geral", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GERAL_2, label: "2º Lugar Geral", condicao: "2º Lugar na Classificação Geral", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GERAL_3, label: "3º Lugar Geral", condicao: "3º Lugar na Classificação Geral", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GERAL_4, label: "4º Lugar Geral", condicao: "4º Lugar na Classificação Geral", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GERAL_5, label: "5º Lugar Geral", condicao: "5º Lugar na Classificação Geral", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GERAL_6_10, label: "6º ao 10º Lugar Geral", condicao: "6º ao 10º Lugar na Classificação Geral", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.VENCEDOR_RANK_DIFERENCA_GOLS, label: "Vencedor Diferença de Gols", condicao: "Mais acertos de Diferença de Gols", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.VENCEDOR_RANK_GOLS, label: "Vencedor Gols", condicao: "Mais acertos de Gols", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.VENCEDOR_RANK_RESULTADO, label: "Vencedor Resultado", condicao: "Mais acertos de Resultado", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.VENCEDOR_RANK_PLACAR, label: "Vencedor Placar Cravado", condicao: "Mais acertos de Placar Cravado", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.VENCEDOR_1_FASE, label: "Vencedor 1ª Fase", condicao: "Melhor colocado na 1ª Fase", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.VENCEDOR_2_FASE, label: "Vencedor 2ª Fase", condicao: "Melhor colocado na 2ª Fase", habilitar: true },
  { key: TipoCriterioPremiacaoBolao.LUGAR_PLAYOFF_1, label: "1º Lugar Playoff", condicao: "1º Lugar no Playoff", habilitar: false },
  { key: TipoCriterioPremiacaoBolao.LUGAR_PLAYOFF_2, label: "2º Lugar Playoff", condicao: "2º Lugar no Playoff", habilitar: false },
  { key: TipoCriterioPremiacaoBolao.LUGAR_PLAYOFF_3, label: "3º Lugar Playoff", condicao: "3º Lugar no Playoff", habilitar: false },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GRUPOS_1, label: "1º Lugar Grupos", condicao: "1º Lugar na Fase de Grupos", habilitar: false },
];

export default function TabelasRateioPremiacoes({ rateioEditavel, bolao }: TabelasRateioPremiacoesProps) {
  
  const { rateio, atualizarRateio } = rateiosStore();
  const { palpitesBolao, carregarPalpitesPorBolao } = palpitesStore();
  const { pontuacaoCriterios, carregarPontuacaoCriterios } = criteriosPontuacaoStore();
  const { participantesBolao, carregarParticipantesBolao } = bolaoStore();
  const { partidas, carregarPartidas } = partidasStore();

  const loggedUserId = retornaUserId();
  
  useEffect(() => {
    carregarParticipantesBolao(bolao.id, loggedUserId);
    carregarPalpitesPorBolao(bolao.id);
    carregarPartidas(1);
    carregarPontuacaoCriterios(bolao.id);
  }, [bolao.id, carregarPontuacaoCriterios, carregarPalpitesPorBolao, carregarParticipantesBolao, carregarPartidas, loggedUserId]);

  const valorTotalPremiacao = useMemo(() => {
    if (!rateio) return 0;

    return (rateio.cota || 0) *
          (rateio.qtdParticipantes || 0) *
          (1 - (rateio.taxaAdm || 0) / 100);
  }, [rateio]);

  const pontuacoesParticipantes = useMemo(() => {
    if (!participantesBolao.length || !pontuacaoCriterios.length) return [];
    return calcularPontuacoesParticipantes(
      participantesBolao,
      palpitesBolao,
      partidas,
      pontuacaoCriterios
    ) as PontuacaoParticipante[];
  }, [participantesBolao, palpitesBolao, partidas, pontuacaoCriterios]);

  const premiacoes = useMemo(() => {
    if (!pontuacoesParticipantes.length) return [];

    const rankingGeral = [...pontuacoesParticipantes].sort(
      (a, b) => b.ptsTotalParticipante - a.ptsTotalParticipante
    );

    return CRITERIOS_PREMIACAO.flatMap((criterioPremiacao) => {
      const porcentagem = (rateio?.[criterioPremiacao.key]) || 0;
      const valorPremio = (valorTotalPremiacao * porcentagem) / 100;

      if (criterioPremiacao.key === TipoCriterioPremiacaoBolao.LUGAR_GERAL_6_10) {
        return [5, 6, 7, 8, 9].map((pos) => {
          const participante = rankingGeral[pos]?.nome || "—";

          return {
            criterio: `${pos + 1}º Lugar Geral`,
            condicao: `${pos + 1}º Lugar na Classificação Geral`,
            habilitar: criterioPremiacao.habilitar,
            participante,
            valor: valorPremio,
            porcentagem,
          };
        });
      }

      let participante = "—";

      switch (criterioPremiacao.key) {
        case TipoCriterioPremiacaoBolao.LUGAR_GERAL_1:
          participante = rankingGeral[0]?.nome || "—";
          break;
        case TipoCriterioPremiacaoBolao.LUGAR_GERAL_2:
          participante = rankingGeral[1]?.nome || "—";
          break;
        case TipoCriterioPremiacaoBolao.LUGAR_GERAL_3:
          participante = rankingGeral[2]?.nome || "—";
          break;
        case TipoCriterioPremiacaoBolao.LUGAR_GERAL_4:
          participante = rankingGeral[3]?.nome || "—";
          break;
        case TipoCriterioPremiacaoBolao.LUGAR_GERAL_5:
          participante = rankingGeral[4]?.nome || "—";
          break;

        default: {
          let ptsField: keyof PontuacaoParticipante = "ptsTotalParticipante";

          switch (criterioPremiacao.key) {
            case TipoCriterioPremiacaoBolao.VENCEDOR_RANK_DIFERENCA_GOLS:
              ptsField = "ptsDiferencaGols";
              break;
            case TipoCriterioPremiacaoBolao.VENCEDOR_RANK_GOLS:
              ptsField = "ptsGols";
              break;
            case TipoCriterioPremiacaoBolao.VENCEDOR_RANK_RESULTADO:
              ptsField = "ptsResultado";
              break;
            case TipoCriterioPremiacaoBolao.VENCEDOR_RANK_PLACAR:
              ptsField = "ptsPlacarCravado";
              break;
          }

          const ranking = [...pontuacoesParticipantes].sort(
            (a, b) => b[ptsField] - a[ptsField]
          );

          participante = ranking[0]?.nome || "—";
        }
      }

      return [{
        criterio: criterioPremiacao.label,
        condicao: criterioPremiacao.condicao,
        habilitar: criterioPremiacao.habilitar,
        participante,
        valor: valorPremio,
        porcentagem,
      }];
    });
  }, [pontuacoesParticipantes, rateio, valorTotalPremiacao]);

  const updateConfig = (field: keyof Rateio, value: number | undefined) => {
    atualizarRateio({ [field]: value });
  };
  
  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>Simulação de Rateio e Premiações - {bolao.nome}</Heading>

      <Flex gap={6} mb={8} wrap="wrap">
        <Box>
           <Text fontWeight="bold" mb={1}>Valor da Cota (R$)</Text>
           <InputGroup>
            <InputLeftElement pl={3}>
              <Text fontWeight="bold" color="green.600">R$</Text>
            </InputLeftElement>
            <Input
              width={"50%"}
              textAlign={"center"}
             value={rateio?.cota || ""}
              onChange={(e) => updateConfig("cota", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="0,00"
            />
          </InputGroup>
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Quantidade Estimada de Participantes</Text>
          <Input
            width={"30%"}
            textAlign={"center"}
            disabled={!rateioEditavel}
            value={rateio?.qtdParticipantes || ""}
            onChange={(e) => updateConfig("qtdParticipantes", e.target.value ? Number(e.target.value) : undefined)}
            placeholder="0"
          />
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Taxa de Administração (%)</Text>
          <InputGroup>
            <Input
              width={"40%"}
              textAlign={"center"}
              value={rateio?.taxaAdm || 10}
              onChange={(e) => updateConfig("taxaAdm", Number(e.target.value))}
              pr={8}
            />
            <InputRightElement pr={120}>
              <Text fontWeight="bold" color="gray.600">%</Text>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Valor Total para Premiação</Text>
          <Text fontSize="2xl" fontWeight="bold" color="green.600">
            R$ {valorTotalPremiacao.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Box>
      </Flex>

      <Divider mb={10} />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Box>
          <Heading size="md" mb={3}>Configuração de Rateio</Heading>
          <TableContainer overflowX="hidden">
            <Table size="sm" variant="striped" colorScheme="blue">
              <Thead backgroundColor={"blackAlpha.300"}>
                <Tr>
                  <Th w="38%" textAlign="center" whiteSpace="nowrap" px={2}>Critério</Th>
                  <Th w="10%" textAlign="center" px={1}>%</Th>
                  <Th w="17%" textAlign="right" px={2}>Valor Estimado (R$)</Th>
                  <Th w="35%" textAlign="center" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" px={2}>
                    Condição
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {CRITERIOS_PREMIACAO.map((criterioPremiacao) => {
                  const porcentagem = (rateio?.[criterioPremiacao.key] as number) || 0;
                  const valorPremiacaoRateio = (valorTotalPremiacao * porcentagem) / 100;

                  return (
                    <Tr key={criterioPremiacao.key}>
                      <Td textAlign="center" fontSize="sm" width={"20%"}>{criterioPremiacao.label}</Td>
                      <Td textAlign="center" px={1}>
                        <Input
                          type="number"
                          value={porcentagem}
                          placeholder="%"
                          backgroundColor={"white"}
                          borderColor={"gray.400"}
                          borderRadius="md"
                          max={100}
                          width="70px"
                          size="sm"
                          textAlign="center"
                          disabled={!rateioEditavel || !criterioPremiacao.habilitar}
                          onChange={(e) => updateConfig(criterioPremiacao.key, e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </Td>
                      <Td textAlign="center" fontWeight="bold" fontSize="sm" px={2}>
                        R$ {valorPremiacaoRateio.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td fontSize="sm" px={2} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        {criterioPremiacao.condicao}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Premiação - Líder por Critério</Heading>
          <TableContainer overflowX="hidden">
            <Table size="sm" variant="striped" colorScheme="green">
              <Thead backgroundColor={"blackAlpha.300"}>
                <Tr>
                  <Th w="38%" textAlign="center" whiteSpace="nowrap">Critério</Th>
                  <Th w="32%" textAlign="center">Participante Líder</Th>
                  <Th w="10%" textAlign="center">Valor do Prêmio</Th>
                </Tr>
              </Thead>
              <Tbody>
                {premiacoes.map((item, index) => (
                  <Tr key={index} >
                    <Td textAlign="center" fontSize="sm" px={2} color={!item.habilitar === true ? 'grey' : "black"}>{item.criterio}</Td>
                    <Td textAlign="center" fontSize="sm" px={2}>{item.habilitar === true ? item.participante : "-"}</Td>
                    <Td textAlign="center" fontWeight="bold" fontSize="sm">
                      R$ {item.habilitar === true ? item.valor.toFixed(2) : "-"}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
    </Box>
  );
};