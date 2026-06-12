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
import { FcInvite } from "react-icons/fc";

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

  const criadorOuGerente =
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

  const rankingAoRedorUsuario = getRankingAoRedorUsuario(loggedUserId, 2);
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
    {
      label: "Prêmios Indivduais",
      value: bolao.premiosIndividuais ? "Sim" : "Não"
    },
    {
      label: "Melhores Por Ranking",
      value: bolao.melhoresPorRanking ? "Sim" : "Não"
    },
    { label: "Pontuação Bônus", value: bolao.pontuacaoBonus ? "Sim" : "Não" },
    {
      label: "Fase Extra Playoff",
      value: bolao.faseExtraPlayoff ? "Sim" : "Não"
    }
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
                alignItems={"center"}
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
              {criadorOuGerente && (
                <div className={styles.botaoLinkConviteContainer}>
                  <Button
                    size={"lg"}
                    hidden={bolao.roleBolao === "jogador"}
                    onClick={handleCriarConviteLink}
                    colorScheme={isSaved ? "green" : "blue"}
                    height={"50%"}
                    leftIcon={<FcInvite />}
                  >
                    {isSaved ? "Link copiado" : "Criar Convite-Link"}
                  </Button>
                </div>
              )}
            </Flex>

            <Box mt={10}>
              <ListaJogosDia
                partidas={partidas}
                palpites={palpitesBolao}
                participantesBolao={participantesBolao}
                criadorOuGerente={criadorOuGerente}
                mostrarPalpites={true}
              />
            </Box>

            <Box mt={10} mb={6}>
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
                  <VStack spacing={1} align="stretch">
                    {rankingAoRedorUsuario.map((item) => (
                      <HStack
                        key={item.userId}
                        p={2}
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
                  <VStack spacing={1} align="stretch">
                    {top10Geral.map((item) => (
                      <HStack
                        key={item.userId}
                        p={2}
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

            {criadorOuGerente && (
              <>
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
