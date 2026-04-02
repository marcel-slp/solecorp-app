import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generateGroupGamesFromDB, generateNextRoundFromDB } from "../../models/generateCopa2026";
import { partidasStore } from "../../stores/partidasStore";
import { recordToArray } from "../../utils/Utils";
import { PartidaUnicaOriginal } from "../PartidaUnicaOriginal";
import { ORDEM_FASES } from "../../models/BolaoCopaDefault";

function TabelaOriginalJogosCopa2026() {
  const { partidas, carregarPartidas, editarPartidas } = partidasStore();

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    carregarPartidas(1);
  }, [carregarPartidas]);

  const jogosFaseGrupos = generateGroupGamesFromDB(partidas);
  const jogosMataMata = generateNextRoundFromDB(partidas);

  const salvarPartidaHandle = async () => {
    setIsSaving(true);
    setIsSaved(false);

    try {
      const ok = await editarPartidas(recordToArray(partidas));

      setIsSaving(false);

      if (ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        alert("Erro ao editar partida. Ver logs");
      }
    } catch (err) {
      setIsSaving(false);
      alert("Falha ao editar partida.");
      console.error(err);
    }
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={6}>
        <Heading>Fase de Grupos</Heading>
        <Button
          isLoading={isSaving}
          colorScheme={isSaved ? "green" : "blue"}
          onClick={() => salvarPartidaHandle()}
        >
          {isSaved ? "Salvo!" : "Salvar Partidas"}
        </Button>
      </Flex>

      {jogosFaseGrupos.map((jogo) => (
        <PartidaUnicaOriginal
          key={jogo.id}
          partida={jogo}
        />
      ))}

      <Flex align="center" justify="space-between" mb={6} mt={6}>
        <Heading>Fase de Mata-Mata</Heading>
        <Button
          isLoading={isSaving}
          colorScheme={isSaved ? "green" : "blue"}
          onClick={() => salvarPartidaHandle()}
        >
          {isSaved ? "Salvo!" : "Salvar Partidas"}
        </Button>
      </Flex>

      {ORDEM_FASES.map((fase) => {
        const jogosDaFase = jogosMataMata[fase] || [];
        if (!jogosDaFase.length) return null;

        return (
          <Box key={fase} mb={10}>
            <Heading size="md" mb={4}>{fase}</Heading>
            {jogosDaFase.map((jogo) => (
              <PartidaUnicaOriginal
                key={jogo.id}
                partida={jogo}
              />
            ))}
          </Box>
        );
      })}
    </Box>
  );
}

export default TabelaOriginalJogosCopa2026;