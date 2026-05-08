/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { PartidaUnicaPalpites } from "../PartidaUnicaPalpites";
import { useEffect, useMemo, useState } from "react";
import {
  generateGroupGamesFromDB,
  generateNextRoundFromDB,
  generateScoresFromDB
} from "../../models/generateCopa2026";
import { partidasStore } from "../../stores/partidasStore";
import { palpitesStore } from "../../stores/palpitesStore";
import { criteriosPontuacaoStore } from "../../stores/criteriosPontuacaoStore";
import { recordToArray, retornaUserId } from "../../utils/Utils";
import { ORDEM_FASES } from "../../models/BolaoCopaDefault";
import { calcularPontuacaoPorPartida } from "../TabelaClassificacaoBolao/scorePorPartida";
import { EscolherJogadorModal } from "../EscolherJogadorModal";
import { premiosIndividuaisStore } from "../../stores/premiosIndividuaisStore";
import { GiGoalKeeper, GiPodiumSecond, GiPodiumThird, GiPodiumWinner, GiSoccerKick, GiTrophy } from "react-icons/gi";
import { jogadoresStore } from "../../stores/jogadoresStore";
import { selecoesStore } from "../../stores/selecoesStore";
import { EscolherSelecaoModal } from "../EscolherSelecaoModal";
import { bolaoStore } from "../../stores/bolaoStore";
import { PalpitesPremiosIndividuaisModal } from "../PalpitesPremiosIndividuaisModal";

interface TabelaPalpitesJogosCopa2026Props {
  bolaoId: string;
}

function TabelaPalpitesJogosCopa2026({
  bolaoId
}: TabelaPalpitesJogosCopa2026Props) {
  const { partidas, carregarPartidas } = partidasStore();
  const { pontuacaoCriterios, carregarPontuacaoCriterios } =
    criteriosPontuacaoStore();
  const { palpitesUsuario, salvarPalpites, carregarPalpitesPorUsuario } =
    palpitesStore();
  const { premiosIndividuaisPalpite, carregarPremiosIndividuaisPalpite, editarPremiosIndividuaisPalpite } = premiosIndividuaisStore();
  const { jogadores, carregarJogadores } = jogadoresStore();
  const { selecoes, carregarSelecoes } = selecoesStore();
  const { participantesBolao, carregarParticipantesBolao } = bolaoStore();

  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [melhorJogadorInterno, setMelhorJogadorInterno] = useState<string>("");
  const [melhorGoleiroInterno, setMelhorGoleiroInterno] = useState<string>("");
  const [artilheiroInterno, setArtilheiroInterno] = useState<string>("");
  const [modalAberto, setModalAberto] = useState<
    "listaMelhorJogador" | "listaMelhorGoleiro" | "listaArtilheiro" | "campeao" | "viceCampeao" | "terceiroLugar" | "melhor1Fase" | null
  >(null);
  const [campeaoInterno, setCampeaoInterno] = useState<string>("");
  const [viceCampeaoInterno, setViceCampeaoInterno] = useState<string>("");
  const [terceiroLugarInterno, setTerceiroLugarInterno] = useState<string>("");
  const [melhor1FaseInterno, setMelhor1FaseInterno] = useState<string>("");
  const userIdLogado = retornaUserId();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([
        carregarPartidas(1),
        carregarPontuacaoCriterios(bolaoId),
        carregarPalpitesPorUsuario(bolaoId, userIdLogado),
        carregarPremiosIndividuaisPalpite(bolaoId, userIdLogado)
      ]);
      setIsReady(true);
    };

    loadAll();
  }, [bolaoId, carregarPartidas, carregarPontuacaoCriterios, carregarPalpitesPorUsuario, salvarPalpites, carregarPremiosIndividuaisPalpite, userIdLogado]);

  useEffect(() => {
    if (premiosIndividuaisPalpite) {
      setMelhorJogadorInterno(premiosIndividuaisPalpite.melhorJogador || "");
      setMelhorGoleiroInterno(premiosIndividuaisPalpite.melhorGoleiro || "");
      setArtilheiroInterno(premiosIndividuaisPalpite.artilheiro || "");
      setCampeaoInterno(premiosIndividuaisPalpite.campeao || "");
      setViceCampeaoInterno(premiosIndividuaisPalpite.viceCampeao || "");
      setTerceiroLugarInterno(premiosIndividuaisPalpite.terceiroLugar || "");
      setMelhor1FaseInterno(premiosIndividuaisPalpite.melhor1Fase || "");
    } else {
      setMelhorJogadorInterno("");
      setMelhorGoleiroInterno("");
      setArtilheiroInterno("");
      setCampeaoInterno("");
      setViceCampeaoInterno("");
      setTerceiroLugarInterno("");
      setMelhor1FaseInterno("");
    }
  }, [premiosIndividuaisPalpite]);

  const abrirModalPremio = (
    tipo: "listaMelhorJogador" | "listaMelhorGoleiro" | "listaArtilheiro" | "campeao" | "viceCampeao" | "terceiroLugar" | "melhor1Fase"
  ) => {
    setModalAberto(tipo);

    if (!Object.keys(jogadores).length) carregarJogadores();
    if (selecoes.length <= 0) carregarSelecoes();
  };

  const pontuacoesPorJogo = useMemo(() => {
    if (!isReady || !palpitesUsuario) return {};

    return Object.fromEntries(
      Object.entries(partidas).map(([id, partida]) => {
        const palpite = Object.values(palpitesUsuario)
          .flat()
          .find((p) => p.partidaId === id);

        if (!palpite) return [id, 0];

        const pontuacaoPorPartida = calcularPontuacaoPorPartida(
          partida,
          palpite,
          pontuacaoCriterios
        );

        return [id, pontuacaoPorPartida.ptsTotalPartida];
      })
    );
  }, [isReady, palpitesUsuario, pontuacaoCriterios, partidas]);

  const jogosFaseGrupos = useMemo(() => {
    return isReady ? generateGroupGamesFromDB(partidas) : [];
  }, [isReady, partidas]);

  const jogosMataMata = useMemo(() => {
    return isReady ? generateNextRoundFromDB(partidas) : {};
  }, [isReady, partidas]);

  const placaresPalpitesPorPartidaId = useMemo(() => {
    if (!isReady || !palpitesUsuario || !bolaoId) return {};
    return generateScoresFromDB(palpitesUsuario);
  }, [isReady, palpitesUsuario, bolaoId]);

  const primeiroJogoJaComecou = useMemo(() => {
    if (jogosFaseGrupos.length === 0) return false;

    const primeiro = jogosFaseGrupos[0];

    if (!primeiro?.dataJogo || !primeiro?.horaJogo) return false;

    try {
      const dataHoraJogo = new Date(`${primeiro.dataJogo}T${primeiro.horaJogo}:00`);
      const agora = new Date();
      const umaHoraAntes = new Date(dataHoraJogo.getTime() - 3600000); // 60 minutos

      return agora >= umaHoraAntes;
    } catch {
      return false;
    }
  }, [jogosFaseGrupos]);

  const salvarPalpitesHandle = async () => {
    if(!bolaoId) return alert("Algo deu errado. Palpite não associado a nenhum bolão");

    setIsSaving(true);
    setIsSaved(false);

    try {
      const okSalvarPalpites = await salvarPalpites(recordToArray(palpitesUsuario));

      const premiosIndividuaisId = premiosIndividuaisPalpite ? premiosIndividuaisPalpite.id : "";

      const okSalvarPremiosIndividuaisPalpite = await editarPremiosIndividuaisPalpite(premiosIndividuaisId, {
        bolaoId: bolaoId,
        userId: userIdLogado,
        campeonatoId: 1,
        melhorJogador: melhorJogadorInterno,
        melhorGoleiro: melhorGoleiroInterno,
        artilheiro: artilheiroInterno,
        campeao: campeaoInterno,
        viceCampeao: viceCampeaoInterno,
        terceiroLugar: terceiroLugarInterno,
        melhor1Fase: melhor1FaseInterno
      });

      setIsSaving(false);

      if (okSalvarPalpites && okSalvarPremiosIndividuaisPalpite) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (err) {
      alert("Falha ao salvar palpites");
      console.error(err);
    }
  };

  if (!isReady) {
    return <Spinner size="xl" />;
  }

  const handleClickPalpitesPremiosIndividuais = async () => {
    if(participantesBolao.length == 0) {
      carregarParticipantesBolao(bolaoId, retornaUserId());
    }
    onOpen();
  };

  return (
    <Box>
      <Box p={3} borderWidth="1px" borderRadius="lg" bg="white" width={"50%"} justifySelf={"center"} mb={4}>
        <Heading size="md" mb={4}>
          Prêmios Individuais da Copa
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Button
            onClick={() => abrirModalPremio("listaMelhorJogador")}
            colorScheme={melhorJogadorInterno ? "green" : "gray"}
            height="60px"
            leftIcon={<GiTrophy size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold" mb={1}>Melhor Jogador</Text>
              <Text fontSize="sm">{melhorJogadorInterno}</Text>
            </Box>
          </Button>

          <Button
            onClick={() => abrirModalPremio("listaMelhorGoleiro")}
            colorScheme={melhorGoleiroInterno ? "green" : "gray"}
            height="60px"
            leftIcon={<GiGoalKeeper size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold" mb={1}>Melhor Goleiro</Text>
              <Text fontSize="sm">{melhorGoleiroInterno}</Text>
            </Box>
          </Button>

          <Button
            onClick={() => abrirModalPremio("listaArtilheiro")}
            colorScheme={artilheiroInterno ? "green" : "gray"}
            height="60px"
            leftIcon={<GiSoccerKick size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold" mb={1}>Artilheiro</Text>
              <Text fontSize="sm">{artilheiroInterno}</Text>
            </Box>
          </Button>
        </SimpleGrid>

        <Heading size="md" mb={4} mt={4}>Pódio da Copa</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          <Button
            onClick={() => abrirModalPremio("campeao")}
            bgColor={campeaoInterno ? "gold" : "gray.100"}
            height="60px"
            leftIcon={<GiPodiumWinner size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold">Campeão</Text>
              <Text fontSize="sm">{campeaoInterno}</Text>
            </Box>
          </Button>

          <Button
            onClick={() => abrirModalPremio("viceCampeao")}
            bgColor={viceCampeaoInterno ? "silver" : "gray.100"}
            height="60px"
            leftIcon={<GiPodiumSecond size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold">Vice-Campeão</Text>
              <Text fontSize="sm">{viceCampeaoInterno}</Text>
            </Box>
          </Button>

          <Button
            onClick={() => abrirModalPremio("terceiroLugar")}
            bgColor={terceiroLugarInterno ? "burlywood" : "gray.100"}
            height="60px"
            leftIcon={<GiPodiumThird size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold">3º Lugar</Text>
              <Text fontSize="sm">{terceiroLugarInterno}</Text>
            </Box>
          </Button>

          <Button
            onClick={() => abrirModalPremio("melhor1Fase")}
            colorScheme="blue"
            height="60px"
            leftIcon={<GiPodiumThird size={20} />}
            disabled={primeiroJogoJaComecou}
          >
            <Box flexDirection={"column"}>
              <Text fontWeight="semibold">Melhor da 1ª Fase</Text>
              <Text fontSize="sm">{melhor1FaseInterno}</Text>
            </Box>
          </Button>

          <div></div>
          <Button
            hidden={!primeiroJogoJaComecou}
            size="sm"
            width="fit-content"
            alignSelf="anchor-center"
            justifySelf="center"
            colorScheme="teal"
            onClick={() => handleClickPalpitesPremiosIndividuais()}
          >
            Ver Palpites
          </Button>
        </SimpleGrid>
      </Box>
      <Flex align="center" justify="space-between" mb={6}>
        <Heading>Fase de Grupos</Heading>
        <Button
          isLoading={isSaving}
          colorScheme={isSaved ? "green" : "blue"}
          onClick={() => salvarPalpitesHandle()}
        >
          {isSaved ? "Salvo!" : "Salvar Palpites"}
        </Button>
      </Flex>

      {jogosFaseGrupos.map((jogo) => (
        <PartidaUnicaPalpites
          key={jogo.id}
          partida={jogo}
          bolaoId={bolaoId}
          placarPalpite={placaresPalpitesPorPartidaId[jogo.id]}
          pontuacaoPartida={String(pontuacoesPorJogo[jogo.id]) || "0"}
        />
      ))}

      <Flex align="center" justify="space-between" mb={6} mt={6}>
        <Heading>Fase de Mata-Mata</Heading>
        <Button
          isLoading={isSaving}
          colorScheme={isSaved ? "green" : "blue"}
          onClick={() => salvarPalpitesHandle()}
        >
          {isSaved ? "Salvo!" : "Salvar Palpites"}
        </Button>
      </Flex>

      {ORDEM_FASES.map((fase) => {
        const jogosDaFase = jogosMataMata[fase] || [];
        if (!jogosDaFase.length) return null;

        return (
          <Box key={fase} mb={10}>
            <Heading size="md" mb={4}>
              {fase}
            </Heading>
            {jogosDaFase.map((jogo) => (
              <PartidaUnicaPalpites
                key={jogo.id}
                partida={jogo}
                bolaoId={bolaoId}
                placarPalpite={placaresPalpitesPorPartidaId[jogo.id]}
                pontuacaoPartida={String(pontuacoesPorJogo[jogo.id]) || "0"}
              />
            ))}
          </Box>
        );
      })}

      <EscolherJogadorModal
        isOpen={
          modalAberto === "listaMelhorJogador" || 
          modalAberto === "listaMelhorGoleiro" || 
          modalAberto === "listaArtilheiro"
        }
        onClose={() => setModalAberto(null)}
        tipo={modalAberto as any}
        onSelecionar={(nome) => {
          if (modalAberto === "listaMelhorJogador") setMelhorJogadorInterno(nome);
          if (modalAberto === "listaMelhorGoleiro") setMelhorGoleiroInterno(nome);
          if (modalAberto === "listaArtilheiro") setArtilheiroInterno(nome);
        }}
        jogadoresDisponiveis={jogadores}
      />
      
      <EscolherSelecaoModal
        isOpen={modalAberto === "campeao" || modalAberto === "viceCampeao" || modalAberto === "terceiroLugar" || modalAberto === "melhor1Fase"}
        onClose={() => setModalAberto(null)}
        tipo={modalAberto as "campeao" | "viceCampeao" | "terceiroLugar" | "melhor1Fase"}
        onSelecionar={(nome) => {
          if (modalAberto === "campeao") setCampeaoInterno(nome);
          if (modalAberto === "viceCampeao") setViceCampeaoInterno(nome);
          if (modalAberto === "terceiroLugar") setTerceiroLugarInterno(nome);
          if (modalAberto === "melhor1Fase") setMelhor1FaseInterno(nome);
        }}
        selecoesDisponiveis={selecoes}
        selecoesEscolhidas={modalAberto === "melhor1Fase" ? undefined : [campeaoInterno, viceCampeaoInterno, terceiroLugarInterno].filter(Boolean)}
      />

      <PalpitesPremiosIndividuaisModal 
        isOpen={isOpen}
        onClose={onClose} 
        participantesBolao={participantesBolao}
      />
    </Box>
  );
}

export default TabelaPalpitesJogosCopa2026;
