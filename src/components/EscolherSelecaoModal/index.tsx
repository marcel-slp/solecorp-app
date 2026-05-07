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
  Text,
  Image,
  Box,
  SimpleGrid,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import defaultParticipante from "@/assets/images/default_participante.jpeg";
import { getImagemURL } from "../../utils/Utils";
import { Selecao } from "../../stores/selecoesStore";

type TipoPodio = "campeao" | "viceCampeao" | "terceiroLugar" | "melhor1Fase";

interface EscolherSelecaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: TipoPodio;
  onSelecionar: (nomeSelecao: string) => void;
  selecoesDisponiveis: Selecao[];
  selecoesEscolhidas?: string[];
  loading?: boolean;
}

export function EscolherSelecaoModal({
  isOpen,
  onClose,
  tipo,
  onSelecionar,
  selecoesDisponiveis,
  selecoesEscolhidas,
  loading = false,
}: EscolherSelecaoModalProps) {
  const [busca, setBusca] = useState("");

  const titulo = {
    campeao: "Selecionar Campeão",
    viceCampeao: "Selecionar Vice-Campeão",
    terceiroLugar: "Selecionar 3º Lugar",
    melhor1Fase: "Melhor da 1ª Fase"
  }[tipo];

  const selecoesFiltradas = useMemo(() => {
    if(selecoesEscolhidas) {
      return selecoesDisponiveis.filter(
        (s) => !selecoesEscolhidas.includes(s.nome)
      );
    } else {
      return selecoesDisponiveis;
    }
  }, [selecoesDisponiveis, selecoesEscolhidas]);

  const itensBuscados = useMemo(() => {
    if (!busca.trim()) return selecoesFiltradas;

    const termo = busca.toLowerCase().trim();
    return selecoesFiltradas.filter((s) =>
      s.nome.toLowerCase().includes(termo)
    );
  }, [selecoesFiltradas, busca]);

  const handleSelecionar = (selecao: Selecao) => {
    onSelecionar(selecao.nome);
    onClose();
    setBusca("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{titulo}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Input
            placeholder="Buscar seleção..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            mb={6}
          />

          {loading ? (
            <VStack py={10}>
              <Spinner size="lg" />
              <Text>Carregando seleções...</Text>
            </VStack>
          ) : itensBuscados.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={10}>
              Nenhuma seleção disponível.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} maxH="480px" overflowY="auto">
              {itensBuscados.map((selecao) => {
                return (
                <Box
                  key={selecao.nome}
                  p={5}
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ shadow: "md", borderColor: "blue.400" }}
                  cursor="pointer"
                  onClick={() => handleSelecionar(selecao)}
                  textAlign="center"
                >
                  <Image
                    src={
                      typeof selecao.imagemSelecao === "string" ? getImagemURL(selecao.imagemSelecao)
                        : undefined
                    }
                    alt="imagemSelecaoPalpite"
                    fallbackSrc={defaultParticipante}
                    boxSize="40px"
                    objectFit="contain"
                    mx="auto"
                    mb={3}
                  />
                  <Text fontWeight="bold" fontSize="lg">
                    {selecao.nome}
                  </Text>
                </Box>
              )
              }
              
              )}
            </SimpleGrid>
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