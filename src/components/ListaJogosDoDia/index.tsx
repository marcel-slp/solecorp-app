import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import { useMemo } from "react";
import { IoIosFootball } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import { getDataHoraPartida, getImagemSelecoesURL } from "../../utils/Utils";
import { Partida } from "../../stores/partidasStore";
import { Palpite } from "../../stores/palpitesStore";

interface ListaJogosDiaProps {
  partidas: Record<string, Partida>;
  participantesQtd: number;
  palpites?: Record<string, Palpite[]>;
  mostrarPalpites?: boolean;
}

export default function ListaJogosDia({
  partidas,
  participantesQtd,
  palpites = {},
  mostrarPalpites = true
}: ListaJogosDiaProps) {

  const proximosJogos = useMemo(() => {
    const agora = new Date();

    const partidasArray = Object.values(partidas)
      .map((p) => ({
        ...p,
        dataHora: getDataHoraPartida(p.dataJogo, p.horaJogo)
      }))
      .filter((p) => p.dataHora)
      .sort((a, b) => a.dataHora!.getTime() - b.dataHora!.getTime());

    const jogosHoje = partidasArray.filter((p) => {
      return (
        p.dataHora!.toDateString() === agora.toDateString() &&
        p.dataHora! >= agora
      );
    });

    if (jogosHoje.length > 0) return jogosHoje;

    const proximo = partidasArray.find((p) => p.dataHora! >= agora);
    if (!proximo) return [];

    const dataAlvo = proximo.dataHora!.toDateString();

    return partidasArray.filter(
      (p) => p.dataHora!.toDateString() === dataAlvo
    );
  }, [partidas]);

  const titulo = useMemo(() => {
    if (!proximosJogos.length) return "Próximos Jogos";

    const hoje = new Date();
    const data = new Date(proximosJogos[0].dataJogo);

    return data.toDateString() === hoje.toDateString()
      ? "Jogos de Hoje"
      : `Próximos Jogos (${data.toLocaleDateString()})`;
  }, [proximosJogos]);

  const jogosProcessados = useMemo(() => {
    return proximosJogos.map((jogo) => {
      let palpitesFeitos = 0;

      if (mostrarPalpites) {
        Object.values(palpites).forEach((lista: Palpite[]) => {
          const palpite = lista.find(p => p.partidaId === jogo.id);

          if (palpite && (palpite.placarCasa !== null || palpite.placarFora !== null)) {
            palpitesFeitos++;
          }
        });
      }

      const faltantes = participantesQtd - palpitesFeitos;

      return {
        ...jogo,
        simboloCasa: getImagemSelecoesURL(jogo.simboloCasa),
        simboloFora: getImagemSelecoesURL(jogo.simboloFora),
        palpitesFeitos,
        palpitesFaltantes: faltantes,
        estaCompleto: faltantes === 0 && participantesQtd > 0
      };
    });
  }, [proximosJogos, palpites, participantesQtd, mostrarPalpites]);

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
        //height="210px"
        overflowX="auto"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg="white"
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
                      <Badge colorScheme="red">
                        {jogo.palpitesFaltantes} faltando
                      </Badge>
                    )}
                  </HStack>
                )}

              </Box>
            ))}
          </HStack>
        )}
      </Box>
    </>
  );
}
