/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { IoIosFootball } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import { getDataHoraPartida, getImagemSelecoesURL } from "../../utils/Utils";
import { Partida } from "../../stores/partidasStore";
import { Palpite } from "../../stores/palpitesStore";
import { ParticipanteBolao } from "../../stores/bolaoStore";

interface ListaJogosDiaProps {
  partidas: Record<string, Partida>;
  palpites?: Record<string, Palpite[]>;
  mostrarPalpites?: boolean;
  participantesBolao?: ParticipanteBolao[];
  criadorOuGerente?: boolean;
}

export default function ListaJogosDia({
  partidas,
  palpites = {},
  mostrarPalpites = true,
  participantesBolao = [],
  criadorOuGerente
}: ListaJogosDiaProps) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jogoSelecionado, setJogoSelecionado] = useState<Partida | null>(null);
  const [faltantes, setFaltantes] = useState<ParticipanteBolao[]>([]);

  const { jogosProcessados, titulo } = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const hojeTime = hoje.getTime();

    const partidasArray = Object.values(partidas)
      .map((p) => {
        const dataHora = getDataHoraPartida(p.dataJogo, p.horaJogo);
        if (!dataHora) return null;

        const data = new Date(dataHora);
        data.setHours(0, 0, 0, 0);

        return {
          ...p,
          dataHora,
          dataSomente: data.getTime()
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime());

    const jogosHoje = partidasArray.filter(p => p.dataSomente === hojeTime);

    const jogosBase = jogosHoje.length
      ? jogosHoje
      : (() => {
          const proxima = partidasArray.find(p => p.dataSomente > hojeTime);
          if (!proxima) return [];
          return partidasArray.filter(p => p.dataSomente === proxima.dataSomente);
        })();

    let titulo = "Próximos Jogos";

    if (jogosBase.length) {
      const dataRef = new Date(jogosBase[0].dataJogo);

      titulo = `Próximos Jogos (${dataRef.toLocaleDateString('pt-BR')})`;
    }

    const jogosProcessados = jogosBase.map((jogo) => {
      let palpitesFeitos = 0;
      const userIdsQuePalpitaram = new Set<number>();

      if (mostrarPalpites && participantesBolao.length > 0) {
        Object.entries(palpites).forEach(([userIdStr, listaPalpites]) => {
          const userId = Number(userIdStr);
          
          const palpiteDoUsuario = listaPalpites.find(p => p.partidaId === jogo.id);

          if (palpiteDoUsuario && 
              (palpiteDoUsuario.placarCasa !== null || palpiteDoUsuario.placarFora !== null)) {
            palpitesFeitos++;
            userIdsQuePalpitaram.add(userId);
          }
        });
      }

      const faltantesCount = mostrarPalpites ? participantesBolao.length - palpitesFeitos : 0;

      const participantesFaltantes = mostrarPalpites 
        ? participantesBolao.filter(p => !userIdsQuePalpitaram.has(p.userId))
        : [];

      return {
        ...jogo,
        simboloCasa: getImagemSelecoesURL(jogo.simboloCasa),
        simboloFora: getImagemSelecoesURL(jogo.simboloFora),
        palpitesFaltantes: faltantesCount,
        participantesFaltantes,
        estaCompleto: mostrarPalpites 
          ? (faltantesCount === 0 && participantesBolao.length > 0)
          : false
      };
    });

    return { jogosProcessados, titulo };

  }, [partidas, mostrarPalpites, participantesBolao, palpites]);

  const abrirModalFaltantes = (jogo: any) => {
    if (!criadorOuGerente) return;

    setJogoSelecionado(jogo);
    setFaltantes(jogo.participantesFaltantes || []);
    onOpen();
  };

  return (
    <>
      <Heading size="md" mb={4} display="flex" alignItems="center" gap={2}>
        <Icon as={IoIosFootball} />
        {titulo}
        {jogosProcessados.length > 0 && (
          <Badge colorScheme="green">{jogosProcessados.length}</Badge>
        )}
      </Heading>

      <Box
        overflowX="auto"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg="whiteAlpha.500"
        whiteSpace="nowrap"
      >
        {jogosProcessados.length === 0 ? (
          <Text color="gray.500" textAlign="center" py={10}>
            Não há jogos agendados.
          </Text>
        ) : (
          <HStack spacing={4} align="stretch">
            {jogosProcessados.map((jogo) => (
              <Box key={jogo.id} minW="320px" p={5} borderWidth="1px" borderRadius="lg" bg="gray.50">
                
                <HStack justify="space-between" mb={3}>
                  <Badge colorScheme="blue">
                    {jogo.grupo || jogo.fase}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {jogo.horaJogo || "—"}
                  </Text>
                </HStack>

                <VStack align="stretch" spacing={3}>
                  {[ 
                    { time: jogo.timeCasa, simbolo: jogo.simboloCasa, placar: jogo.placarCasa },
                    { time: jogo.timeFora, simbolo: jogo.simboloFora, placar: jogo.placarFora }
                  ].map((t, idx) => (
                    <HStack key={idx}>
                      <Image
                        src={t.simbolo}
                        fallbackSrc={defaultParticipante}
                        boxSize="28px"
                        borderRadius="full"
                      />
                      <Text flex={1}>{t.time}</Text>
                      <Text fontWeight="bold">
                        {t.placar ?? "-"}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                {mostrarPalpites && (
                  <HStack mt={4} justify="center">
                    {jogo.estaCompleto ? (
                      <Badge colorScheme="green">
                        <Icon as={FaCircleCheck} mr={1} />
                        Todos palpitaram
                      </Badge>
                    ) : (
                      <Badge 
                        colorScheme="red" 
                        cursor={criadorOuGerente ? "pointer" : "default"}
                        onClick={() => abrirModalFaltantes(jogo)}
                        _hover={criadorOuGerente ? { bg: "red.600", color: "white" } : {}}
                      >
                        {jogo.palpitesFaltantes} palpites faltando
                      </Badge>
                    )}
                  </HStack>
                )}
              </Box>
            ))}
          </HStack>
        )}
      </Box>
      
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>
            Palpites Faltantes - {jogoSelecionado?.timeCasa} x {jogoSelecionado?.timeFora}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {faltantes.length === 0 ? (
              <Text color="green.600">Todos os participantes já palpitaram!</Text>
            ) : (
              <List spacing={2}>
                {faltantes.map((p: any) => (
                  <ListItem key={p.userId} fontSize="sm">
                    • {p.nome}
                  </ListItem>
                ))}
              </List>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
