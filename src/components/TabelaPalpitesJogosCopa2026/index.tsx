import { Box, Button, Flex, Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import { PartidaUnicaPalpites } from "../PartidaUnicaPalpites";
import { useEffect, useMemo, useState } from "react";
import { generateGroupGamesFromDB, generateNextRoundFromDB, generateScoresFromDB } from "../../models/generateCopa2026";
import { partidasStore } from "../../stores/partidasStore";
import { palpitesStore } from "../../stores/palpitesStore";
import { criteriosPontuacaoStore } from "../../stores/criteriosPontuacaoStore";
import { recordToArray, retornaUserId } from "../../utils/Utils";
//import { calcularPontosPorJogo } from "../TabelaClassificacaoBolao/scorePorJogo";
import { ORDEM_FASES } from "../../models/BolaoCopaDefault";
//import { calcularPontosExtra1 } from "../TabelaClassificacaoBolao/scoreExtra1";
import { calcularPontuacaoPorPartida } from "../TabelaClassificacaoBolao/scorePorPartida";

interface TabelaPalpitesJogosCopa2026Props {
  bolaoId: string;
}

function TabelaPalpitesJogosCopa2026({ bolaoId }: TabelaPalpitesJogosCopa2026Props) {
  const { partidas, carregarPartidas } = partidasStore();
  const { pontuacaoCriterios, carregarPontuacaoCriterios } = criteriosPontuacaoStore();
  const { palpitesUsuario, salvarPalpites, carregarPalpitesPorUsuario } = palpitesStore();

  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const userIdLogado = retornaUserId();
    const loadAll = async () => {
      await Promise.all([
        carregarPartidas(1),
        carregarPontuacaoCriterios(bolaoId),
        carregarPalpitesPorUsuario(bolaoId, userIdLogado)
      ]);
      setIsReady(true);
    };

    loadAll();
  }, [bolaoId, carregarPartidas, carregarPontuacaoCriterios, carregarPalpitesPorUsuario, salvarPalpites]);

  const pontuacoesPorJogo = useMemo(() => {
    if (!isReady || !palpitesUsuario) return {};

    return Object.fromEntries(
      Object.entries(partidas).map(([id, partida]) => {
        const palpite = Object.values(palpitesUsuario).flat().find(
          p => p.partidaId === id
        );

        if (!palpite) return [id, 0];

        const pontuacaoPorPartida = calcularPontuacaoPorPartida(
          partida, 
          palpite,
          pontuacaoCriterios
        );

        return [id, pontuacaoPorPartida.ptsTotalPartida]
    //     const palpite = Object.values(palpitesUsuario).flat().find(
    //       p => p.partidaId === id
    //     );

    //     if (!palpite) return [id, 0];

    //     const pontosPorJogo = calcularPontosPorJogo(
    //       partida, 
    //       {
    //         placarCasa: palpite.placarCasa,
    //         placarFora: palpite.placarFora,
    //       },
    //       criteriosPorJogo
    //     );

    //     const pontosExtra1 = calcularPontosExtra1(
    //       partida, 
    //       {
    //         placarPenaltisCasa: palpite.placarPenaltisCasa,
    //         placarPenaltisFora: palpite.placarPenaltisFora,
    //       },
    //       criteriosExtra1
    //     );

    //     const pontosTotal = 
    //       pontosPorJogo.ptsDiferencaGols + pontosPorJogo.ptsGols + pontosPorJogo.ptsPlacarCravado + pontosPorJogo.ptsResultado + 
    //       pontosExtra1.ptsClassificacaoPenaltis + pontosExtra1.ptsPlacarCravadoPenaltis;

    //     return [id, pontosTotal];
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

  const salvarPalpitesHandle = async () => {
    if(!bolaoId) return alert("Algo deu errado. Palpite não associado a nenhum bolão");

    setIsSaving(true);
    setIsSaved(false);

    try {
      const okSalvarPalpites = await salvarPalpites(recordToArray(palpitesUsuario));

      setIsSaving(false);

      if (okSalvarPalpites) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (err) {
      alert("Falha ao salvar palpites");
      console.error(err);
    }
  };

  if (!isReady) {
    return (
      <VStack spacing={6} py={20} align="center">
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg" color="gray.600">
          Carregando jogos da Copa 2026...
        </Text>
      </VStack>
    );
  }

  return (
    <Box>
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

      <Flex align="center" justify="space-between" mb={6} mt={6} >
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
            <Heading size="md" mb={4}>{fase}</Heading>
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
    </Box>
  );
}

export default TabelaPalpitesJogosCopa2026;