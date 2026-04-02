import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Participante, participantesStore } from "../../stores/participantesStore";

type Props = {
  numeroMaximo: number;
  onChange: (selecionados: Participante[]) => void;
};

export function ParticipanteSelector({ numeroMaximo, onChange }: Props) {
  const [participantesSelector, setParticipantesSelector] = useState<Participante[]>([]);
  const { participantes } = participantesStore();
  const toast = useToast();
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<Participante[]>([]);

  useEffect(() => {
    setParticipantesSelector(participantes);
}, [participantes]);

  const participantesFiltrados = participantesSelector.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSelect = (p: Participante) => {
    if (selecionados.some((s) => s.id === p.id)) return;

    if (selecionados.length >= numeroMaximo) {
      toast({
        title: "Limite atingido",
        description: `Você só pode adicionar até ${numeroMaximo} participante${numeroMaximo > 1 ? "s" : ""}.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const novos = [...selecionados, p];
    setSelecionados(novos);
    onChange(novos);
  };

  const handleRemove = (id: string) => {
    const novos = selecionados.filter((s) => s.id !== id);
    setSelecionados(novos);
    onChange(novos);
  };

  return (
    <Box width="100%" maxW="400px">
      <Text fontWeight="bold" mb={2}>
        Selecionar Participantes ({selecionados.length}/{numeroMaximo})
      </Text>

      <Menu closeOnSelect={false} placement="bottom-start">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          variant="outline"
        >
          Selecionar participante
        </MenuButton>
        <MenuList maxH="300px" overflowY="auto" p={2}>
          <Input
            placeholder="Pesquisar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            mb={2}
            size="sm"
          />
          {participantesFiltrados.map((p: Participante) => (
            <MenuItem key={p.id} onClick={() => handleSelect(p)}>
              {p.nome}
            </MenuItem>
          ))}
          {participantesFiltrados.length === 0 && (
            <Text color="gray" fontSize="sm" px={3}>
              Nenhum participante encontrado
            </Text>
          )}
        </MenuList>
      </Menu>

      {selecionados.length > 0 && (
        <VStack align="start" mt={3}>
          {selecionados.map((p) => (
            <Tag
              size="md"
              key={p.id}
              colorScheme="blue"
              borderRadius="full"
            >
              <TagLabel>{p.nome}</TagLabel>
              <TagCloseButton onClick={() => handleRemove(p.id)} />
            </Tag>
          ))}
        </VStack>
      )}
    </Box>
  );
}

