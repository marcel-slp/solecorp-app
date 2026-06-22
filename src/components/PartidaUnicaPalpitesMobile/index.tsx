import {
  Input,
  Image,
  Flex,
  Badge,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  TableContainer,
  Tbody,
  Table,
  Tr,
  Td,
  Thead,
  Th,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Card,
  CardBody,
  Box
} from "@chakra-ui/react";
import * as styles from "./styles.css";
import { Partida } from "../../stores/partidasStore";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import { useEffect, useMemo, useState } from "react";
import { palpitesStore } from "../../stores/palpitesStore";
import { formatarData, retornaUserId } from "../../utils/Utils";
import { Placar } from "../../models/generateCopa2026";
import { bolaoStore } from "../../stores/bolaoStore";
import { InfoPorPartida } from "../TabelaPalpitesJogosCopa2026";

interface PartidaUnicaPalpitesMobileProps {
  partida: Partida;
  placarPalpite: Placar;
  bolaoId: string;
  infoPartida: Record<number, InfoPorPartida>;
  // pontuacaoPartida: string;
  // iconesParticipantes: Record<number, React.ReactNode[]>;
}

export function PartidaUnicaPalpitesMobile({
  partida,
  placarPalpite,
  //pontuacaoPartida,
  bolaoId,
  infoPartida
  //iconesParticipantes = {}
}: PartidaUnicaPalpitesMobileProps) {
  const { salvarPalpite } = palpitesStore();
  const { participantesBolao, carregarParticipantesBolao } = bolaoStore();
  const { palpitesBolao, carregarPalpitesPorBolao } = palpitesStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedUserId = retornaUserId();

  const [numeroPartidaInterno, setNumeroPartidaInterno] = useState("");
  const [timeCasaInterno, setTimeCasaInterno] = useState("");
  const [timeForaInterno, setTimeForaInterno] = useState("");
  const [placarCasaInterno, setPlacarCasaInterno] = useState("");
  const [placarForaInterno, setPlacarForaInterno] = useState("");
  const [placarPenaltisCasaInterno, setPlacarPenaltisCasaInterno] =
    useState("");
  const [placarPenaltisForaInterno, setPlacarPenaltisForaInterno] =
    useState("");
  const [dataJogoInterno, setDataJogoInterno] = useState("");
  const [horaJogoInterno, setHoraJogoInterno] = useState("");
  const [localJogoInterno, setLocalJogoInterno] = useState("");

  const userIdLogado = retornaUserId();

  useEffect(() => {
    setPlacarCasaInterno(
      placarPalpite && placarPalpite.placarCasa != null
        ? placarPalpite.placarCasa.toString()
        : ""
    );
    setPlacarForaInterno(
      placarPalpite && placarPalpite.placarFora != null
        ? placarPalpite.placarFora.toString()
        : ""
    );

    setPlacarPenaltisCasaInterno(
      placarPalpite && placarPalpite.placarPenaltisCasa != null
        ? placarPalpite.placarPenaltisCasa.toString()
        : ""
    );
    setPlacarPenaltisForaInterno(
      placarPalpite && placarPalpite.placarPenaltisFora != null
        ? placarPalpite.placarPenaltisFora.toString()
        : ""
    );

    setNumeroPartidaInterno(partida.numeroPartida.toString());
    setTimeCasaInterno(partida.timeCasa);
    setTimeForaInterno(partida.timeFora);
    setDataJogoInterno(partida.dataJogo ?? "");
    setHoraJogoInterno(partida.horaJogo ?? "");
    setLocalJogoInterno(partida.localJogo ?? "");
  }, [
    partida.numeroPartida,
    partida.timeCasa,
    partida.timeFora,
    partida.dataJogo,
    partida.horaJogo,
    partida.localJogo,
    partida.placarCasa,
    partida.placarFora,
    placarPalpite
  ]);

  const atualizarPlacarPalpite = (
    novoPlacarCasa?: string,
    novoPlacarFora?: string,
    novoPlacarPenaltisCasa?: string,
    novoPlacarPenaltisFora?: string
  ) => {
    if (jogoJaComecou) return;

    const palpiteIdInterno =
      placarPalpite && placarPalpite.palpiteId
        ? placarPalpite.palpiteId
        : crypto.randomUUID().slice(0, 5);

    if (!bolaoId)
      return alert("Algo deu errado. Palpite não associado a nenhum bolão");

    if (
      novoPlacarPenaltisCasa !== undefined &&
      novoPlacarPenaltisFora !== undefined &&
      !validarPenaltis()
    )
      return;

    salvarPalpite({
      id: palpiteIdInterno,
      partidaId: partida.id,
      placarCasa: novoPlacarCasa ? Number(novoPlacarCasa) : null,
      placarFora: novoPlacarFora ? Number(novoPlacarFora) : null,
      placarPenaltisCasa: novoPlacarPenaltisCasa
        ? Number(novoPlacarPenaltisCasa)
        : null,
      placarPenaltisFora: novoPlacarPenaltisFora
        ? Number(novoPlacarPenaltisFora)
        : null,
      userId: loggedUserId,
      bolaoId: bolaoId,
      campeonatoId: 1
    });
  };

  const validarPenaltis = (): boolean => {
    if (placarPenaltisCasaInterno === "" || placarPenaltisForaInterno === "")
      return true;

    if (placarPenaltisCasaInterno === placarPenaltisForaInterno) {
      alert("Placar de pênaltis não pode ser empate! Escolha um vencedor.");
      atualizarPlacarPalpite(
        placarCasaInterno,
        placarForaInterno,
        undefined,
        undefined
      );
      return false;
    }
    return true;
  };

  const abrirPenaltis =
    placarCasaInterno !== "" &&
    placarForaInterno !== "" &&
    placarCasaInterno === placarForaInterno &&
    !!partida.fase;

  const jogoJaComecou = useMemo(() => {
    if (!partida.dataJogo || !partida.horaJogo) return false;

    const dataHoraJogo = new Date(`${partida.dataJogo}T${partida.horaJogo}:00`);
    const agora = new Date();

    const umaHoraAntes = new Date(dataHoraJogo.getTime() - 60 * 60 * 1000);

    return agora >= umaHoraAntes;
  }, [partida.dataJogo, partida.horaJogo]);

  const exibirPenaltis = useMemo(() => {
    return participantesBolao.some((p) => {
      const palpite = palpitesBolao[p.userId]?.find(
        (pal) => pal.partidaId === partida.id
      );

      return (
        palpite?.placarPenaltisCasa != null &&
        palpite?.placarPenaltisFora != null
      );
    });
  }, [participantesBolao, palpitesBolao, partida.id]);

  const handleClickVerPalpites = async () => {
    if (participantesBolao.length == 0) {
      carregarParticipantesBolao(bolaoId, loggedUserId);
    }

    const palpitesJaCarregados = Object.keys(palpitesBolao).length > 0;

    if (!palpitesJaCarregados) {
      await carregarPalpitesPorBolao(bolaoId);
    }
    onOpen();
  };

  return (
    <>
      <Card
        width="100%"
        maxW="470px"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        bg="white"
        shadow="sm"
      >
        <CardBody>
          <div className={styles.headerLinha}>
            <div>{numeroPartidaInterno}</div>
            <div>{formatarData(dataJogoInterno, 'extenso')}</div>
            <div>{horaJogoInterno}</div>
            <div>{localJogoInterno}</div>
          </div>

          <div className={styles.timeCasaLinha}>
            <Image
              src={partida.simboloCasa}
              loading="lazy"
              decoding="async"
              className={styles.simb}
              fallbackSrc={defaultParticipante}
            />
            <div className={styles.nome}>{timeCasaInterno}</div>
            <div className={styles.placarContainer}>
              <Input
                isDisabled={jogoJaComecou}
                w={"52px"}
                backgroundColor="white"
                border="1px solid gray"
                textAlign="center"
                type="number"
                value={placarCasaInterno}
                onChange={(e) =>
                  atualizarPlacarPalpite(e.target.value, placarForaInterno)
                }
              />

              {abrirPenaltis && (
                <>
                  <Text fontSize="xs" color="gray.500" mr={1} ml={1}>
                    P
                  </Text>
                  <Input
                    isDisabled={jogoJaComecou}
                    width="48px"
                    height="32px"
                    fontSize="sm"
                    textAlign="center"
                    border="1px solid #4a90e2"
                    type="number"
                    value={placarPenaltisCasaInterno}
                    onChange={(e) =>
                      atualizarPlacarPalpite(
                        placarCasaInterno,
                        placarForaInterno,
                        e.target.value,
                        placarPenaltisForaInterno
                      )
                    }
                  />
                </>
              )}
            </div>
          </div>

          <div className={styles.timeForaLinha}>
            <Image
              src={partida.simboloFora}
              loading="lazy"
              decoding="async"
              className={styles.simb}
              fallbackSrc={defaultParticipante}
            />
            <div className={styles.nome}>{timeForaInterno}</div>
            <div className={styles.placarContainer}>
              <Input
                isDisabled={jogoJaComecou}
                w={"52px"}
                backgroundColor="white"
                border="1px solid gray"
                textAlign="center"
                type="number"
                value={placarForaInterno}
                onChange={(e) =>
                  atualizarPlacarPalpite(placarCasaInterno, e.target.value)
                }
              />

              {abrirPenaltis && (
                <>
                  <Text fontSize="xs" color="gray.500" mr={1} ml={1}>
                    P
                  </Text>
                  <Input
                    isDisabled={jogoJaComecou}
                    width="48px"
                    height="32px"
                    fontSize="sm"
                    border="1px solid #4a90e2"
                    backgroundColor="white"
                    textAlign="center"
                    type="number"
                    value={placarPenaltisForaInterno}
                    onChange={(e) =>
                      atualizarPlacarPalpite(
                        placarCasaInterno,
                        placarForaInterno,
                        placarPenaltisCasaInterno,
                        e.target.value
                      )
                    }
                  />
                </>
              )}
            </div>
          </div>

          <div className={styles.resultadoLinha}>
            <Flex align="center" gap={2}>
              <Text>Placar:</Text>
              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                display="grid"
                alignItems="center"
                gap={1}
              >
                {partida.placarCasa != null && partida.placarFora != null ? (
                  <>
                    <Text as="span" fontSize="md">
                      {partida.placarCasa} × {partida.placarFora}
                    </Text>
                    {partida.placarPenaltisCasa != null &&
                      partida.placarPenaltisFora != null && (
                        <Text as="span" fontSize="xs" color="blue.400">
                          ({partida.placarPenaltisCasa} ×{" "}
                          {partida.placarPenaltisFora})
                        </Text>
                      )}
                  </>
                ) : (
                  "–"
                )}
              </Badge>
            </Flex>

            <Flex align="center" gap={2}>
              <Text>Pontos:</Text>
              <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                {infoPartida[userIdLogado].ptsTotal || "0"}
              </Badge>
            </Flex>
          </div>

          <Button
            hidden={!jogoJaComecou}
            size="sm"
            colorScheme="teal"
            onClick={handleClickVerPalpites}
            style={{ gridColumn: "1 / -1", justifySelf: "center" }}
          >
            Ver Palpites
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Palpites da Partida {partida.numeroPartida}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <TableContainer>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th textAlign="center">Participante</Th>
                        <Th textAlign="center">Palpite</Th>
                        {exibirPenaltis && <Th textAlign="center">Pênaltis</Th>}
                        <Th textAlign="center">Acertos</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {participantesBolao.map((p) => {
                        const palpite = palpitesBolao[p.userId]?.find(
                          (pal) => pal.partidaId === partida.id
                        );
                        const iconesParticipante = infoPartida?.[p.userId].icones || [];
                        return (
                          <Tr key={p.userId}>
                            <Td textAlign="start">{p.nome}</Td>
                            <Td textAlign="center">
                              <Flex align="center" justify="center" gap={2}>
                                <Image
                                  src={partida.simboloCasa}
                                  className={styles.simb}
                                  fallbackSrc={defaultParticipante}
                                  boxSize="24px"
                                />
                                <Text fontWeight="medium">
                                  {palpite?.placarCasa ?? "-"} ×{" "}
                                  {palpite?.placarFora ?? "-"}
                                </Text>
                                <Image
                                  src={partida.simboloFora}
                                  className={styles.simb}
                                  fallbackSrc={defaultParticipante}
                                  boxSize="24px"
                                />
                              </Flex>
                            </Td>
                            {exibirPenaltis && (
                              <Td textAlign="center">
                                {palpite?.placarPenaltisCasa != null &&
                                palpite?.placarPenaltisFora != null ? (
                                  <Flex align="center" justify="center" gap={2}>
                                    <Image
                                      src={partida.simboloCasa}
                                      fallbackSrc={defaultParticipante}
                                      boxSize="24px"
                                    />
                                    <Text fontWeight="medium" color="blue.400">
                                      {palpite.placarPenaltisCasa} ×{" "}
                                      {palpite.placarPenaltisFora}
                                    </Text>
                                    <Image
                                      src={partida.simboloFora}
                                      fallbackSrc={defaultParticipante}
                                      boxSize="24px"
                                    />
                                  </Flex>
                                ) : (
                                  "-"
                                )}
                              </Td>
                            )}
                            <Td fontWeight="medium">
                              <Flex align="center">
                                {iconesParticipante.map((icone, idx) => (
                                  <Box key={idx} fontSize="md">
                                    {icone}
                                  </Box>
                                ))}
                              </Flex>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
}
