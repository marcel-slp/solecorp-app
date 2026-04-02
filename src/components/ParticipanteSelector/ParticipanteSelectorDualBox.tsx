import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as styles from "../ParticipanteSelector/styles.css.ts";
import { useState, useMemo, useEffect } from "react";
import { Participante, participantesStore } from "../../stores/participantesStore";
import { ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
  selecionados: Participante[];
  onChange: (novosSelecionados: Participante[]) => void;
  numeroMaximo: number;
};

export function ParticipanteSelectorDualBox({selecionados, onChange, numeroMaximo}: Props) {
  const { participantes, carregarParticipantes } = participantesStore();
  const [ativo, setAtivo] = useState<Participante | null>(null);
  const [grupoAberto, setGrupoAberto] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarParticipantes();
  }, [carregarParticipantes]);
  
  const disponiveis = participantes.filter((p: { id: string; }) => !selecionados.some((s) => s.id === p.id));

  const gruposFiltrados = useMemo(() => {
    const map: Record<string, Participante[]> = {};
    const termo = busca.trim().toLowerCase();

    for (const p of disponiveis) {
      const grupoNome = p.grupo ?? "Sem grupo";
      if (
        termo === "" ||
        p.nome.toLowerCase().includes(termo) ||
        grupoNome.toLowerCase().includes(termo)
      ) {
        if (!map[grupoNome]) map[grupoNome] = [];
        map[grupoNome].push(p);
      }
    }
    return map;
  }, [disponiveis, busca]);

  const handleAdicionar = () => {
    if (!ativo) return;
    if (selecionados.length >= numeroMaximo) {
      alert(`Você só pode adicionar até ${numeroMaximo} participantes.`);
      return;
    }
    const novos = [...selecionados, ativo];
    onChange(novos);
    setAtivo(null);
  };

  const handleRemover = () => {
    if (!ativo) return;
    const novos = selecionados.filter((s) => s.id !== ativo.id);
    onChange(novos);
    setAtivo(null);
  };

// const atualizarNomeCustomizado = (id: string, nome: string) => {
//   const novos = selecionados.map((s) =>
//     s.id === id ? { ...s, nomeCustomizado: nome } : s
//   );
//   onChange(novos);
// };
  
  return (
    <Flex className={styles.flexContainer}>
      <Box className={styles.boxContainer}>
        <Heading size="sm" mb={2}>
          Participantes disponíveis
        </Heading>

        <Input
          placeholder="Buscar participante..."
          size="sm"
          mb={3}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Box className={styles.innerBoxContainer}>
          {Object.keys(gruposFiltrados).length === 0 && (
            <Text fontSize="sm" color="gray">
              Nenhum participante encontrado
            </Text>
          )}

          {Object.entries(gruposFiltrados).map(([grupo, lista]) => (
            <Box key={grupo} mb={2}>
              <Flex className={styles.innerFlexContainer}
                bg={grupoAberto === grupo ? "gray.100" : "transparent"}
                _hover={{ bg: "gray.50" }}
                onClick={() =>
                  setGrupoAberto(grupoAberto === grupo ? null : grupo)
                }
              >
                <Text fontWeight="bold">{grupo}</Text>
                <ChevronDownIcon
                  transform={grupoAberto === grupo ? "rotate(180deg)" : ""}
                  transition="transform 0.2s"
                />
              </Flex>

              <Collapse in={grupoAberto === grupo} animateOpacity>
                <List spacing={1} pl={4} mt={1}>
                  {lista.map((p) => (
                    <ListItem
                      key={p.id}
                      p={1}
                      borderRadius="md"
                      bg={ativo?.id === p.id ? "blue.100" : "transparent"}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      onClick={() => setAtivo(p)}
                    >
                      {p.nome}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>

      <VStack spacing={3} align="center" justify="center">
        <Button
          colorScheme="blue"
          leftIcon={<ChevronRightIcon />}
          size="sm"
          onClick={handleAdicionar}
          isDisabled={!ativo || selecionados.length >= numeroMaximo}
        >
          Adicionar
        </Button>
        <Button
          colorScheme="red"
          leftIcon={<ChevronLeftIcon />}
          variant="outline"
          size="sm"
          onClick={handleRemover}
          isDisabled={!ativo || !selecionados.some((s) => s.id === ativo.id)}
        >
          Remover
        </Button>
      </VStack>

      <Box className={styles.boxContainer}>
        <Heading size="sm" mb={2}>
          Selecionados ({selecionados.length}/{numeroMaximo})
        </Heading>
        <Box className={styles.innerBoxContainer}>
          <List spacing={1}>
            {selecionados.map((p) => (
              <ListItem
                key={p.id}
                p={1}
                borderRadius="md"
                bg={ativo?.id === p.id ? "blue.100" : "transparent"}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => setAtivo(p)}
              >
                {p.nome}
              </ListItem>
            ))}
          </List>
          {selecionados.length === 0 && (
            <Text fontSize="sm" color="gray">
              Nenhum participante selecionado
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
}
