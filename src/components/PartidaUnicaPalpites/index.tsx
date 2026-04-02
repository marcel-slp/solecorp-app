import { 
  Input, 
  Image,
  Flex,
  Badge,
  //Grid,
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
  ModalOverlay
} from "@chakra-ui/react";
import * as styles from "./styles.css";
import { Partida } from "../../stores/partidasStore";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import { useEffect, useMemo, useState } from "react";
import { palpitesStore } from "../../stores/palpitesStore";
import { retornaUserId } from "../../utils/Utils";
import { Placar } from "../../models/generateCopa2026";
import { bolaoStore } from "../../stores/bolaoStore";

interface PartidaUnicaPalpitesProps {
  partida: Partida;
  placarPalpite: Placar;
  bolaoId: string;
  pontuacaoPartida: string;
}

export function PartidaUnicaPalpites({
  partida,
  placarPalpite,
  pontuacaoPartida,
  bolaoId
}: PartidaUnicaPalpitesProps) {
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
  const [placarPenaltisCasaInterno, setPlacarPenaltisCasaInterno] = useState("");
  const [placarPenaltisForaInterno, setPlacarPenaltisForaInterno] = useState("");
  const [dataJogoInterno, setDataJogoInterno] = useState("");
  const [horaJogoInterno, setHoraJogoInterno] = useState("");
  const [localJogoInterno, setLocalJogoInterno] = useState("");

  useEffect(() => {
    setPlacarCasaInterno(placarPalpite && placarPalpite.placarCasa != null ? placarPalpite.placarCasa.toString() : "");
    setPlacarForaInterno(placarPalpite && placarPalpite.placarFora != null ? placarPalpite.placarFora.toString() : "");

    setPlacarPenaltisCasaInterno(placarPalpite && placarPalpite.placarPenaltisCasa != null ? placarPalpite.placarPenaltisCasa.toString() : "");
    setPlacarPenaltisForaInterno(placarPalpite && placarPalpite.placarPenaltisFora != null ? placarPalpite.placarPenaltisFora.toString() : "");

    setNumeroPartidaInterno(partida.numeroPartida.toString());
    setTimeCasaInterno(partida.timeCasa);
    setTimeForaInterno(partida.timeFora);
    setDataJogoInterno(partida.dataJogo ?? "");
    setHoraJogoInterno(partida.horaJogo ?? "");
    setLocalJogoInterno(partida.localJogo ?? "");
  }, [partida.numeroPartida, partida.timeCasa, partida.timeFora, partida.dataJogo, partida.horaJogo, partida.localJogo, partida.placarCasa, partida.placarFora, placarPalpite]);

  const atualizarPlacarPalpite = (novoPlacarCasa?: string, novoPlacarFora?: string, novoPlacarPenaltisCasa?: string, novoPlacarPenaltisFora?: string) => {
    if (jogoJaComecou) return;

    const palpiteIdInterno = placarPalpite && placarPalpite.palpiteId ? placarPalpite.palpiteId : crypto.randomUUID().slice(0,5);

    if(!bolaoId) return alert("Algo deu errado. Palpite não associado a nenhum bolão")

    if (novoPlacarPenaltisCasa !== undefined && novoPlacarPenaltisFora !== undefined && !validarPenaltis()) return;

    salvarPalpite({
      id: palpiteIdInterno,
      partidaId: partida.id,
      placarCasa: novoPlacarCasa ? Number(novoPlacarCasa) : null,
      placarFora: novoPlacarFora ? Number(novoPlacarFora) : null,
      placarPenaltisCasa: novoPlacarPenaltisCasa ? Number(novoPlacarPenaltisCasa) : null,
      placarPenaltisFora: novoPlacarPenaltisFora ? Number(novoPlacarPenaltisFora) : null,
      userId:  loggedUserId,
      bolaoId: bolaoId,
      campeonatoId: 1
    });
  };

  const validarPenaltis = (): boolean => {
    if (placarPenaltisCasaInterno === "" || placarPenaltisForaInterno === "") return true;

    if (placarPenaltisCasaInterno === placarPenaltisForaInterno) {
      alert("Placar de pênaltis não pode ser empate! Escolha um vencedor.");
      atualizarPlacarPalpite(placarCasaInterno, placarForaInterno, undefined, undefined);
      return false;
    }
    return true;
  };

  const abrirPenaltis = placarCasaInterno !== "" && placarForaInterno !== "" && placarCasaInterno === placarForaInterno && !!partida.fase;

  const jogoJaComecou = useMemo(() => {
    if (!partida.dataJogo || !partida.horaJogo) return false;

    const dataHoraJogo = new Date(`${partida.dataJogo}T${partida.horaJogo}:00`);
    const agora = new Date();
    
    const umaHoraAntes = new Date(dataHoraJogo.getTime() - 60 * 60 * 1000);

    return agora >= umaHoraAntes;
  }, [partida.dataJogo, partida.horaJogo]);

  const handleClickVerPalpites = async () => {
    if(participantesBolao.length == 0) {
      carregarParticipantesBolao(bolaoId, loggedUserId);
    }
    
    const palpitesJaCarregados = Object.keys(palpitesBolao).length > 0;

    if(!palpitesJaCarregados) {
      await carregarPalpitesPorBolao(bolaoId);
    }
    onOpen();
  }

  return (
    <div className={styles.linhaTabelaJogos}>
      <div className={styles.itemLinha}>{numeroPartidaInterno}</div>

      <div className={styles.nomeSimbEsqContainer}>
        <div className={styles.nome}>{timeCasaInterno}</div>
        <Image src={partida.simboloCasa} className={styles.simb} fallbackSrc={defaultParticipante} />
      </div>

      <Input
        isDisabled={jogoJaComecou}
        backgroundColor="white"
        textAlign="center"
        type="number"
        value={placarCasaInterno}
        onChange={(e) => atualizarPlacarPalpite(e.target.value, placarForaInterno)} />

      <div className={styles.itemLinha}>x</div>

      <Input
        isDisabled={jogoJaComecou}
        backgroundColor="white"
        textAlign="center"
        type="number"
        value={placarForaInterno}
        onChange={(e) => atualizarPlacarPalpite(placarCasaInterno, e.target.value)} />

      <div className={styles.nomeSimbDirContainer}>
        <Image src={partida.simboloFora} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
        <div className={styles.nome}>{timeForaInterno}</div>
      </div>

      <Flex width={"max-content"} align="center" gap={2} fontSize="sm" mt={2}>
        Placar da Partida:
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
              {(partida.placarPenaltisCasa != null && partida.placarPenaltisFora != null) && (
                <Text as="span" fontSize="xs" color="blue.400">
                  ({partida.placarPenaltisCasa} × {partida.placarPenaltisFora})
                </Text>
              )}
            </>
          ) : (
            "–"
          )}
        </Badge>

        Pontos:
        <Badge colorScheme="green" fontSize="md" px={3} py={1}>
          {pontuacaoPartida}
        </Badge>
      </Flex>

      <Input isDisabled backgroundColor="white" textAlign="center" type="date" value={dataJogoInterno} />
      <Input isDisabled backgroundColor="white" textAlign="center" type="time" value={horaJogoInterno} />
      <Input isDisabled backgroundColor="white" textAlign="center" type="text" value={localJogoInterno} />

      {abrirPenaltis ? (
        <><div></div>
        <Flex
          align="center"
          gap={3}
          justify="start"
          ml={'95px'}
          width={'max-content'}
          className={styles.itemLinha}
        >
          <Text fontWeight="bold" color="gray.600">
            Pênaltis:
          </Text>

          <Input
            isDisabled={jogoJaComecou}
            backgroundColor="white"
            textAlign="center"
            type="number"
            value={placarPenaltisCasaInterno}
            width={'52px'}
            height={'30px'}
            onChange={(e) => atualizarPlacarPalpite(placarCasaInterno, placarForaInterno, e.target.value, placarPenaltisForaInterno)}
            onBlur={() => validarPenaltis()} />

          <div className={styles.xLinhaPenaltis}>x</div>

          <Input
            isDisabled={jogoJaComecou}
            backgroundColor="white"
            textAlign="center"
            type="number"
            width={'52px'}
            height={'30px'}
            value={placarPenaltisForaInterno}
            onChange={(e) => atualizarPlacarPalpite(placarCasaInterno, placarForaInterno, placarPenaltisCasaInterno, e.target.value)}
            onBlur={() => validarPenaltis()} />
        </Flex></>
      ) : (
        <><div></div><div></div></>
      )
    
    }
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <Button
        hidden={!jogoJaComecou}
        size="sm"
        width="fit-content"
        justifySelf="center"
        colorScheme="teal"
        onClick={() => handleClickVerPalpites()}
      >
        Ver Palpites
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Palpites da Partida {partida.numeroPartida}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Participante</Th>
                    <Th textAlign="center">Palpite</Th>
                    <Th textAlign="center">Pênaltis</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {participantesBolao.map((p) => {
                    const palpite = palpitesBolao[p.userId]?.find(
                      (pal) => pal.partidaId === partida.id
                    );

                    return (
                      <Tr key={p.userId}>
                        <Td fontWeight="medium">{p.nome}</Td>
                        <Td textAlign="center">
                          <Flex align="center" justify="center" gap={2}>
                            <Image 
                              src={partida.simboloCasa} 
                              className={styles.simb} 
                              fallbackSrc="/images/default_participante.jpeg" 
                              boxSize="24px"
                            />
                            <Text fontWeight="medium">
                              {palpite?.placarCasa ?? "-"} × {palpite?.placarFora ?? "-"}
                            </Text>
                            <Image 
                              src={partida.simboloFora} 
                              className={styles.simb} 
                              fallbackSrc="/images/default_participante.jpeg" 
                              boxSize="24px"
                            />
                          </Flex>
                        </Td>
                        <Td textAlign="center">
                          <Flex align="center" justify="center" gap={2}>
                            <Image 
                              src={partida.simboloCasa} 
                              className={styles.simb} 
                              fallbackSrc="/images/default_participante.jpeg" 
                              boxSize="24px"
                            />
                            <Text fontWeight="medium" color="blue.400">
                              {palpite?.placarPenaltisCasa ?? "-"} × {palpite?.placarPenaltisFora ?? "-"}
                            </Text>
                            <Image 
                              src={partida.simboloFora} 
                              className={styles.simb} 
                              fallbackSrc="/images/default_participante.jpeg" 
                              boxSize="24px"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          {/* <ModalBody>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>Participante</Th>
                    <Th textAlign={"center"}>Palpite</Th>
                    <Th textAlign={"center"}>Pênaltis</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {participantesBolao.map((p) => {
                    const palpite = palpitesBolao[p.userId]?.find(
                      (pal) => pal.partidaId === partida.id
                    );

                    return (
                      <Tr key={p.userId}>
                        <Td>{p.nome}</Td>
                        <Td display="flex" alignItems="center">
                          <Image mr="2" src={partida.simboloCasa} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
                          {palpite?.placarCasa ?? "-"} × {palpite?.placarFora ?? "-"}
                          <Image ml="2" src={partida.simboloFora} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
                        </Td>
                        <Td display="flex" alignItems="center">
                          <Image mr="2" src={partida.simboloCasa} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
                          {palpite?.placarPenaltisCasa ?? "-"} × {palpite?.placarPenaltisFora ?? "-"}
                          <Image ml="2" src={partida.simboloFora} className={styles.simb} fallbackSrc="/images/default_participante.jpeg" />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody> */}
        </ModalContent>
      </Modal>
      </div>
  );
}
