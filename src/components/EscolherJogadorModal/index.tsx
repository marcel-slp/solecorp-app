import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  HStack,
  Text,
  Image,
  Box,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import defaultJogador from "@/assets/images/default_jogador.jpg";
import { getImagemURL } from "../../utils/Utils";
import { Jogador } from "../../stores/jogadoresStore";

type TipoJogador = "listaMelhorJogador" | "listaMelhorGoleiro" | "listaArtilheiro";

interface EscolherJogadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: TipoJogador;
  onSelecionar: (nomeJogador: string) => void;
  jogadoresDisponiveis: Record<string, Jogador>;
  loading?: boolean;
}

export function EscolherJogadorModal({
  isOpen,
  onClose,
  tipo,
  onSelecionar,
  jogadoresDisponiveis,
  loading = false,
}: EscolherJogadorModalProps) {
  const [busca, setBusca] = useState("");

  const titulo = {
    listaMelhorJogador: "Selecionar Melhor Jogador da Copa",
    listaMelhorGoleiro: "Selecionar Melhor Goleiro da Copa",
    listaArtilheiro: "Selecionar Artilheiro da Copa",
  }[tipo];

  const jogadoresFiltrados = useMemo(() => {
    let lista = Object.values(jogadoresDisponiveis).filter((j) => j[tipo] === true);

    if (busca.trim()) {
      const termo = busca.toLowerCase().trim();
      lista = lista.filter((j) =>
        j.nome.toLowerCase().includes(termo) ||
        j.selecao.toLowerCase().includes(termo) ||
        j.posicao.toLowerCase().includes(termo)
      );
    }

    return lista;
  }, [jogadoresDisponiveis, busca, tipo]);

  const handleSelecionar = (jogador: Jogador) => {
    onSelecionar(jogador.nome);
    onClose();
    setBusca("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{titulo}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Input
            placeholder="Buscar por nome, seleção ou posição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            mb={6}
          />

          {loading ? (
            <VStack py={10}>
              <Spinner size="lg" />
              <Text>Carregando jogadores...</Text>
            </VStack>
          ) : jogadoresFiltrados.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={10}>
              Nenhum jogador encontrado.
            </Text>
          ) : (
            <VStack spacing={3} align="stretch" maxH="520px" overflowY="auto">
              {jogadoresFiltrados.map((jogador) => (
                <Box
                  key={jogador.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ shadow: "md", borderColor: "blue.400" }}
                  cursor="pointer"
                  onClick={() => handleSelecionar(jogador)}
                  transition="all 0.2s"
                >
                  <HStack spacing={5}>
                    <Image
                      src={getImagemURL(String(jogador.imagemJogador))}
                      fallbackSrc={defaultJogador}
                      boxSize="70px"
                      borderRadius="full"
                      objectFit="cover"
                    />
                    <Box flex={1}>
                      <Text fontWeight="bold" fontSize="lg">
                        {jogador.nome}
                      </Text>
                      <HStack fontSize="sm" color="gray.600" mt={1}>
                        <Text>{jogador.posicao}</Text>
                        <Text>•</Text>
                        <Text fontWeight="medium">{jogador.selecao}</Text>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}