import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  TableContainer,
  Table,
  Tbody,
  Td,
  Tr,
  Thead,
  Th
} from "@chakra-ui/react";
import { ParticipanteBolao } from "../../stores/bolaoStore";

interface PalpitesPremiosIndividuaisModalProps {
  participantesBolao: ParticipanteBolao[];
  isOpen: boolean;
  onClose: () => void;
}

export function PalpitesPremiosIndividuaisModal({
  isOpen,
  onClose,
  participantesBolao
}: PalpitesPremiosIndividuaisModalProps) {
  //const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Palpites dos Prêmios Individuais</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Participante</Th>
                  <Th textAlign="center">Melhor Jogador</Th>
                  <Th textAlign="center">Melhor Goleiro</Th>
                  <Th textAlign="center">Artilheiro</Th>
                  <Th textAlign="center">Campeão</Th>
                  <Th textAlign="center">Vice-Campeão</Th>
                  <Th textAlign="center">Terceiro Lugar</Th>
                  <Th textAlign="center">Melhor da 1ª Fase</Th>
                </Tr>
              </Thead>
              <Tbody>
                {participantesBolao.map((p) => (
                  <Tr key={p.userId}>
                    <Td fontWeight="medium">{p.nome}</Td>
                    <Td textAlign="center">{p.melhorJogador}</Td>
                    <Td textAlign="center">{p.melhorGoleiro}</Td>
                    <Td textAlign="center">{p.artilheiro}</Td>
                    <Td textAlign="center">{p.campeao}</Td>
                    <Td textAlign="center">{p.viceCampeao}</Td>
                    <Td textAlign="center">{p.terceiroLugar}</Td>
                    <Td textAlign="center">{p.melhor1Fase}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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
