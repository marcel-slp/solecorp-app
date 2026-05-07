
//import * as styles from "./styles.css";
import { useEffect, useMemo, useState } from "react";
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
  InputLeftElement,
  Button,
  Progress
} from "@chakra-ui/react";
import { Rateio, rateiosStore } from "../../stores/rateiosStore";
import { TipoCriterioPremiacaoBolao } from "../../models/TipoCriterioBolao";
import { classificacaoStore } from "../../stores/classificacaoStore";

interface TabelasRateioPremiacoesProps {
  rateioEditavel?: boolean;
  bolaoId: string;
  rateio: Rateio | null;
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
  { key: TipoCriterioPremiacaoBolao.LUGAR_PLAYOFF_1, label: "Vencedor do PlayOff Principal", condicao: "1º Lugar no Playoff", habilitar: false },
  { key: TipoCriterioPremiacaoBolao.LUGAR_PLAYOFF_2, label: "Vencedor do PlayOff Secundário", condicao: "2º Lugar no Playoff", habilitar: false },
  { key: TipoCriterioPremiacaoBolao.LUGAR_PLAYOFF_3, label: "Vencedor do PlayOff Terciário", condicao: "3º Lugar no Playoff", habilitar: false },
  { key: TipoCriterioPremiacaoBolao.LUGAR_GRUPOS_1, label: "Vencedor do módulo Grupos", condicao: "1º Lugar na Fase de Grupos", habilitar: false },
];

export default function TabelasRateioPremiacoes({ rateioEditavel, bolaoId, rateio }: TabelasRateioPremiacoesProps) {
  
  const { editarRateio, salvarRateio } = rateiosStore();
  const { carregarClassificacao, getClassificacaoPorCriterio, getTopN } = classificacaoStore();

  const [rateioInterno, setRateioInterno] = useState<Rateio>({
    id: "",
    bolaoId: bolaoId,
    cota: 0,
    qtdParticipantes: 0,
    taxaAdm: 10
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    carregarClassificacao(bolaoId);

    if (rateio) setRateioInterno(rateio);
  }, [bolaoId, rateio, carregarClassificacao]);
  
  const valorTotalPremiacao = useMemo(() => {
    if (!rateioInterno) return 0;

    return (rateioInterno.cota || 0) *
          (rateioInterno.qtdParticipantes || 0) *
          (1 - (rateioInterno.taxaAdm || 0) / 100);
  }, [rateioInterno]);

  const totalPercentualDistribuido = useMemo(() => {
    if (!rateioInterno) return 0;

    return CRITERIOS_PREMIACAO.reduce((acc, criterio) => {
      const val = rateioInterno[criterio.key] as number | undefined;
      return acc + (val || 0);
    }, 0);
  }, [rateioInterno]);

  const getParticipantesPorPosicao = (posicao: number) => {
    const lista = getTopN(posicao);

    return lista
      .filter(p => p.posicao === posicao)
      .map(p => p.nome)
      .join(", ") || "-";
  };

  const premiacoes = useMemo(() => {
    const topGeral = getTopN(10);

    return CRITERIOS_PREMIACAO.flatMap((criterioPremiacao) => {

      const porcentagem = rateioInterno?.[criterioPremiacao.key];
      const valor = porcentagem ? (valorTotalPremiacao * porcentagem) / 100 : 0;

      if (criterioPremiacao.key === TipoCriterioPremiacaoBolao.LUGAR_GERAL_6_10) {
        return topGeral.slice(5, 10).map((p, i) => ({
          criterio: `${i + 6}º Lugar`,
          participante: p?.nome || "-",
          valor,
          habilitar: criterioPremiacao.habilitar
        }));
      }

      if (criterioPremiacao.label.toString().includes("Lugar Geral")) {
        const posicao = Number(criterioPremiacao.label.slice(0, 1));

        return [{
          criterio: criterioPremiacao.label,
          participante: getParticipantesPorPosicao(posicao),
          valor,
          habilitar: criterioPremiacao.habilitar
        }];
      }

      const mapa: Partial<Record<TipoCriterioPremiacaoBolao, string>> = {
        [TipoCriterioPremiacaoBolao.VENCEDOR_RANK_GOLS]: "Gols",
        [TipoCriterioPremiacaoBolao.VENCEDOR_RANK_RESULTADO]: "Resultado",
        [TipoCriterioPremiacaoBolao.VENCEDOR_RANK_PLACAR]: "Placar Cravado",
        [TipoCriterioPremiacaoBolao.VENCEDOR_RANK_DIFERENCA_GOLS]: "Diferença",
      };

      const ranking = getClassificacaoPorCriterio(mapa[criterioPremiacao.key] || "");

      return [{
        criterio: criterioPremiacao.label,
        participante: ranking[0]?.participante || "—",
        valor,
        habilitar: criterioPremiacao.habilitar
      }];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClassificacaoPorCriterio, getTopN, rateioInterno, valorTotalPremiacao]);

  

  const handleChange = (key: keyof Rateio, novoValor?: number) => {
    setRateioInterno((prev) => {
      if (!prev) return prev;

      const atualizado = {
        ...prev,
        [key]: novoValor ?? undefined,
      };

      return atualizado;
    });
  };

  const podeSalvar = totalPercentualDistribuido <= 100;

  const handleSalvar = async () => {
    setIsSaving(true);
    setIsSaved(false);

    let sucesso;
    try {
      if (rateioInterno?.id) {
        sucesso = await editarRateio(rateioInterno);
        setIsSaving(false);
        if (sucesso) {
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        } else {
          alert("Erro ao editar rateio");
        }
      } else {
        sucesso = await salvarRateio(rateioInterno);
        setIsSaving(false);
        
        if (sucesso) {
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        } else { 
          alert("Erro ao salvar rateio");
        }
      }
    } catch (err) {
      setIsSaving(false);
      alert("Falha ao salvar/editar partida.");
      console.error(err);
    }
  };
  
  return (
    <Box>
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
              disabled={!rateioEditavel}
              placeholder="0,00"
              value={rateioInterno?.cota || ""}
              onChange={(e) => handleChange("cota", e.target.value ? Number(e.target.value) : undefined)}
            />
          </InputGroup>
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Quantidade Estimada de Participantes</Text>
          <Input
            width={"30%"}
            textAlign={"center"}
            disabled={!rateioEditavel}
            placeholder="0"
            value={rateioInterno?.qtdParticipantes || ""}
            onChange={(e) => handleChange("qtdParticipantes", e.target.value ? Number(e.target.value) : undefined)}
          />
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Taxa de Administração (%)</Text>
          <InputGroup>
            <Input
              width={"40%"}
              textAlign={"center"}
              disabled={!rateioEditavel}
              value={rateioInterno?.taxaAdm || ""}
              onChange={(e) => handleChange("taxaAdm", Number(e.target.value))}
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

        <Box ml={8}>
          <Text fontWeight="bold" mb={1}>
            Distribuição do Rateio
          </Text>

          <Progress
            value={totalPercentualDistribuido}
            max={100}
            size="lg"
            borderRadius="md"
            colorScheme={
              totalPercentualDistribuido > 100
                ? "red"
                : totalPercentualDistribuido === 100
                ? "green"
                : "blue"
            }
          />

          <Flex justify="space-between" mt={1}>
            <Text fontSize="sm" color="gray.600">
              0%
            </Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={
                totalPercentualDistribuido > 100
                  ? "red.500"
                  : totalPercentualDistribuido === 100
                  ? "green.600"
                  : "blue.500"
              }
            >
              {totalPercentualDistribuido.toFixed(2)}%
            </Text>
            <Text fontSize="sm" color="gray.600">
              100%
            </Text>
          </Flex>
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
                  const porcentagem = (rateioInterno?.[criterioPremiacao.key] as number);
                  const valorPremiacaoRateio = porcentagem != null ? (valorTotalPremiacao * porcentagem) / 100 : 0;
                  const maxPermitido = 100 - (totalPercentualDistribuido - porcentagem);
                  const atingiuLimite = totalPercentualDistribuido >= 100;
                  const campoVazio = porcentagem == null;

                  return (
                    <Tr key={criterioPremiacao.key}>
                      <Td textAlign="center" fontSize="sm" width={"20%"}>
                        <Text color={criterioPremiacao.habilitar ? 'black' : 'grey'}>
                          {criterioPremiacao.label}
                        </Text>
                      </Td>
                      <Td textAlign="center" px={1}>
                        <Input
                          type="number"
                          value={porcentagem || ""}
                          placeholder="%"
                          bg={atingiuLimite && campoVazio ? "gray.100" : "white"}
                          title={atingiuLimite && campoVazio ? "Percentual máximo atingido" : ""}
                          borderColor={totalPercentualDistribuido > 100 ? "red.500" : "gray.400"}
                          borderRadius="md"
                          max={maxPermitido}
                          width="70px"
                          size="sm"
                          textAlign="center"
                          disabled={!rateioEditavel || !criterioPremiacao.habilitar || (atingiuLimite && campoVazio)}
                          onChange={(e) => 
                            handleChange(criterioPremiacao.key, e.target.value === "" ? undefined : Number(e.target.value))
                          }
                        />
                      </Td>
                      <Td textAlign="center" fontWeight="bold" fontSize="sm" px={2}>
                        <Text color={criterioPremiacao.habilitar ? 'black' : 'grey'}>
                          R$ {valorPremiacaoRateio.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) ?? 0}
                        </Text>
                      </Td>
                      <Td fontSize="sm" px={2} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        <Text color={criterioPremiacao.habilitar ? 'black' : 'grey'}>
                          {criterioPremiacao.condicao}
                        </Text>
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

      {totalPercentualDistribuido > 100 && (
        <Text color="red.500" fontWeight="bold" mt={2}>
          O total de percentuais não pode ultrapassar 100%
        </Text>
      )}

      <Button
        colorScheme={isSaved ? "green" : "blue"}
        mt={4}
        isLoading={isSaving}
        isDisabled={!podeSalvar}
        size="md"
        onClick={handleSalvar}
      >
        {isSaved ? "Salvo!" : "Salvar Configuração de Rateio"}
      </Button>
    </Box>
  );
};
