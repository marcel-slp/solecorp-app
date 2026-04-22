import {
  // Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import * as styles from "./styles.css.ts";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Bolao, bolaoStore } from "../../../stores/bolaoStore.ts";
import { getImagemURL, retornaUserId } from "../../../utils/Utils.ts";
import { ReactNode, useEffect, useState } from "react";
import TabelaGerenciarParticipantesBolao from "../../../components/TabelaGerenciarParticipantesBolao/index.tsx";
import { ModalGenerico } from "../../../components/ModalGenerico/index.tsx";
import BolaoRegulamento from "../../../components/BolaoRegulamento/index.tsx";
import { BolaoRoles } from "../../../models/BolaoCopaDefault.tsx";
import { partidasStore } from "../../../stores/partidasStore.ts";
import { GiTrophyCup } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { classificacaoStore } from "../../../stores/classificacaoStore.ts";
import { palpitesStore } from "../../../stores/palpitesStore.ts";
import ListaJogosDia from "../../../components/ListaJogosDoDia/index.tsx";

export function InicioBolao() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  const {
    participanteBolaoLogado,
    participantesBolao,
    carregarParticipantesBolao
  } = bolaoStore();
  const { partidas, carregarPartidas } = partidasStore();
  const { palpitesBolao, carregarPalpitesPorBolao } = palpitesStore();
  const { carregarClassificacao, getRankingAoRedorUsuario, getTopN } =
    classificacaoStore();
  const [isSaved, setIsSaved] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalConteudo, setModalConteudo] = useState<ReactNode>(null);

  const navigate = useNavigate();

  const loggedUserId = retornaUserId();

  const adminOuGerente =
    participanteBolaoLogado?.roleBolao === BolaoRoles.CRIADOR ||
    participanteBolaoLogado?.roleBolao === BolaoRoles.GERENTE;

  useEffect(() => {
    carregarParticipantesBolao(bolao.id, loggedUserId);
    carregarPalpitesPorBolao(bolao.id);
    carregarPartidas(1);
  }, [
    bolao.id,
    carregarPalpitesPorBolao,
    carregarParticipantesBolao,
    carregarPartidas,
    loggedUserId
  ]);

  useEffect(() => {
    carregarClassificacao(bolao.id);
  }, [bolao.id, carregarClassificacao]);

  const rankingAoRedorUsuario = getRankingAoRedorUsuario(loggedUserId, 5);
  const top10Geral = getTopN(10);

  const abrirModal = (titulo: string, conteudo: ReactNode) => {
    setModalTitulo(titulo);
    setModalConteudo(conteudo);
    onOpen();
  };

  const infoEvento = [
    { label: "Nome do Bolão", value: bolao.nome },
    { label: "Compartilhamento", value: bolao.compartilhamento },
    { label: "Tipo de Convite", value: bolao.tipoConvite },
    { label: "Pontuação", value: bolao.pontuacao },
    { label: "Evento Base", value: bolao.eventoBase },
    { label: "Convocação da Seleção", value: bolao.convocacao ? "Sim" : "Não" },
    { label: "Prêmios Indivduais", value: bolao.premiosIndividuais ? "Sim" : "Não" },
    { label: "Melhores Por Ranking", value: bolao.melhoresPorRanking ? "Sim" : "Não" },
    { label: "Pontuação Bônus", value: bolao.pontuacaoBonus ? "Sim" : "Não" },
    { label: "Fase Extra Playoff", value: bolao.faseExtraPlayoff ? "Sim" : "Não" }
  ];

  const handleCriarConviteLink = () => {
    const conviteLink = `${window.location.origin}${window.location.pathname}#/convite/bolao/${bolao.id}`;
    navigator.clipboard.writeText(conviteLink);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className={styles.folhaContainer}>
          <div className={styles.quadroInicial}>
            <Flex direction="row" gap={4} wrap="nowrap">
              <Box flex="1" maxWidth="20%">
                <div className={styles.simboloTorneioContainer}>
                  <Image
                    src={String(getImagemURL(String(bolao.imagemBolao)))}
                    alt="Logotipo"
                    className={styles.simboloTorneio}
                  />
                </div>
              </Box>

              <Box flex="1">
                <div className={styles.infoTorneioContainer}>
                  {infoEvento.map((item, index) => {
                    const isNomeBolao = item.label === "Nome do Evento";
                    return (
                      <div
                        key={index}
                        style={{
                          color: isNomeBolao ? "blue" : "black",
                          fontWeight: isNomeBolao ? "bold" : "normal"
                        }}
                      >
                        {item.label}: {item.value}
                      </div>
                    );
                  })}
                </div>
              </Box>

              <Box
                flex="1"
                maxW="45%"
                display="flex"
                flexDirection="column"
                gap={4}
              >
                <Button
                  className={styles.buttonOpçõesExtras}
                  onClick={() =>
                    navigate(`/bolao/${bolao.id}/criterios-pontuacao-copa-2026`)
                  }
                  colorScheme={"blue"}
                >
                  Ver Critérios de Pontuação
                </Button>
                <Button
                  className={styles.buttonOpçõesExtras}
                  onClick={() => abrirModal("", <BolaoRegulamento />)}
                  colorScheme={"blue"}
                >
                  Ver Regulamento do Bolão
                </Button>
                <Button
                  className={styles.buttonOpçõesExtras}
                  onClick={() => navigate(`/bolao/${bolao.id}/rateio`)}
                  colorScheme={"blue"}
                >
                  Simulação de Rateio e Premiação
                </Button>
                <Button
                  className={styles.buttonOpçõesExtras}
                  onClick={() => navigate(`/bolao/${bolao.id}/classificacao`)}
                  colorScheme={"blue"}
                >
                  Classificação
                </Button>
                <Button
                  className={styles.buttonOpçõesExtras}
                  onClick={() => navigate(`/bolao/${bolao.id}/palpite`)}
                  colorScheme={"blue"}
                >
                  Palpites
                </Button>
              </Box>
            </Flex>
            
            <Box mt={10}>
              <ListaJogosDia
                partidas={partidas}
                participantesQtd={participantesBolao.length}
                palpites={palpitesBolao}
                mostrarPalpites={true}
              />
            </Box>


            {/* <Box mt={10}>
              <Heading
                size="md"
                mb={4}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={IoIosFootball} />
                {tituloJogos}
                {jogosComStatusPalpites.length > 0 && (
                  <Badge colorScheme="green">
                    {jogosComStatusPalpites.length}
                  </Badge>
                )}
              </Heading>

              <Box
                height="220px"
                overflowX="auto"
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                bg="white"
                whiteSpace="nowrap"
              >
                {jogosComStatusPalpites.length === 0 ? (
                  <Text color="gray.500" textAlign="center" py={10}>
                    Não há jogos agendados para hoje.
                  </Text>
                ) : (
                  <HStack spacing={4} align="stretch">
                    {jogosComStatusPalpites.map((jogo) => (
                      <Box
                        key={jogo.id}
                        minW="320px"
                        p={5}
                        borderWidth="1px"
                        borderRadius="lg"
                        bg="gray.50"
                      >
                        <HStack justify="space-between" mb={3}>
                          <Badge colorScheme="blue">
                            {jogo.grupo || jogo.fase}
                          </Badge>
                          <Text fontSize="xs" color="gray.500">
                            {jogo.horaJogo || "—"}
                          </Text>
                        </HStack>
                        <VStack align="stretch" spacing={3}>
                          <HStack>
                            <Image
                              src={jogo.simboloCasa}
                              fallbackSrc={defaultParticipante}
                              boxSize="28px"
                              borderRadius="full"
                            />
                            <Text fontWeight="medium" flex={1}>
                              {jogo.timeCasa}
                            </Text>
                            <Text
                              fontWeight="bold"
                              minW="30px"
                              textAlign="center"
                            >
                              {jogo.placarCasa !== null ? jogo.placarCasa : "-"}
                            </Text>
                            {jogo.placarPenaltisCasa && (
                              <Text
                                fontWeight="bold"
                                minW="30px"
                                textAlign="center"
                                color="blue.400"
                              >
                                {jogo.placarPenaltisCasa !== null
                                  ? jogo.placarPenaltisCasa
                                  : "-"}
                              </Text>
                            )}
                          </HStack>

                          <HStack>
                            <Image
                              src={jogo.simboloFora}
                              fallbackSrc={defaultParticipante}
                              boxSize="28px"
                              borderRadius="full"
                            />
                            <Text fontWeight="medium" flex={1}>
                              {jogo.timeFora}
                            </Text>
                            <Text
                              fontWeight="bold"
                              minW="30px"
                              textAlign="center"
                            >
                              {jogo.placarFora !== null ? jogo.placarFora : "-"}
                            </Text>
                            {jogo.placarPenaltisFora && (
                              <Text
                                fontWeight="bold"
                                minW="30px"
                                textAlign="center"
                                color="blue.400"
                              >
                                {jogo.placarPenaltisFora !== null
                                  ? jogo.placarPenaltisFora
                                  : "-"}
                              </Text>
                            )}
                          </HStack>
                        </VStack>
                        <HStack mt={4} justify="center">
                          {jogo.estaCompleto ? (
                            <Badge
                              colorScheme="green"
                              fontSize="xs"
                              px={4}
                              py={1}
                            >
                              <Icon as={FaCircleCheck} mr={1} />
                              Todos palpitaram
                            </Badge>
                          ) : (
                            <Badge
                              colorScheme="red"
                              fontSize="xs"
                              px={4}
                              py={1}
                            >
                              {jogo.palpitesFaltantes == 1
                                ? `1 palpite faltando`
                                : `${jogo.palpitesFaltantes} palpites faltantes`}
                            </Badge>
                          )}
                        </HStack>
                      </Box>
                    ))}
                  </HStack>
                )}
              </Box>
            </Box> */}

            <Box mt={10} mb={4}>
              <Heading size="md" mb={6}>
                <Icon as={GiTrophyCup} mr={2} />
                Rankings
              </Heading>

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                <Box>
                  <Text fontWeight="bold" mb={4}>
                    <Icon as={FaArrowTrendUp} mr={2} />
                    Sua Posição no Ranking
                  </Text>
                  <VStack spacing={3} align="stretch">
                    {rankingAoRedorUsuario.map((item) => (
                      <HStack
                        key={item.userId}
                        p={4}
                        bg={item.userId === loggedUserId ? "blue.50" : "white"}
                        borderRadius="md"
                        borderWidth={
                          item.userId === loggedUserId ? "2px" : "1px"
                        }
                        borderColor={
                          item.userId === loggedUserId ? "blue.500" : "gray.200"
                        }
                      >
                        <Text fontWeight="bold" w="40px">
                          #{item.posicao}
                        </Text>
                        <Text flex={1}>{item.nome}</Text>
                        <Text fontWeight="bold">
                          {item.ptsTotalParticipante} pts
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={4}>
                    Top 10 Geral
                  </Text>
                  <VStack spacing={3} align="stretch">
                    {top10Geral.map((item) => (
                      <HStack
                        key={item.userId}
                        p={4}
                        bg="white"
                        borderRadius="md"
                        borderWidth="1px"
                      >
                        <Text
                          fontWeight="bold"
                          w="40px"
                          color={
                            item.posicao && item.posicao <= 3
                              ? "gold"
                              : "inherit"
                          }
                        >
                          #{item.posicao}
                        </Text>
                        <Text flex={1}>{item.nome}</Text>
                        <Text fontWeight="bold">
                          {item.ptsTotalParticipante} pts
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </SimpleGrid>
            </Box>

            {adminOuGerente && (
              <>
                <div className={styles.tituloConfigEventoContainer}>
                  <Button
                    hidden={bolao.roleBolao === "jogador"}
                    onClick={handleCriarConviteLink}
                    colorScheme={isSaved ? "green" : "blue"}
                  >
                    {isSaved
                      ? "Link copiado para a área de transferência"
                      : "Criar Convite-Link"}
                  </Button>
                </div>
                <TabelaGerenciarParticipantesBolao />
              </>
            )}

            <ModalGenerico
              isOpen={isOpen}
              onClose={onClose}
              titulo={modalTitulo}
              conteudo={modalConteudo}
              tamanho="full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
