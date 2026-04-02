import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import * as styles from "./styles.css";
import {
  NovoParticipante,
  participantesStore
} from "../../stores/participantesStore";
import { Participante } from "../../stores/participantesStore";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ParticipanteForm from "../../components/ParticipanteForm";

export default function Participantes() {
  const { participantes, adicionarParticipante, carregarParticipantes, editarParticipante, removerParticipante } = participantesStore();
  const [editando, setEditando] = useState<Participante | null>(null);
  const [confirmarRemocaoParticipanteId, setConfirmarRemocaoParticipanteId] = useState<string | null>(null);

  useEffect(() => {
    carregarParticipantes();
  }, [carregarParticipantes]);

  const handleSalvar = async (dados: NovoParticipante, id?: string) => {
    let sucesso = false;

    if (id) {
      sucesso = await editarParticipante(id, dados);
    } else {
      sucesso = await adicionarParticipante(dados);
    }

    if (sucesso) {
      setEditando(null);
      await carregarParticipantes();
    } else {
      alert("Ocorreu um erro ao salvar o participante. Verifique os logs.");
    }
  };

  const handleEntrarEditMode = (p: Participante) => {    
    setEditando(p);
  };

  const handleAbrirRemoverParticipantePopup = (participanteId: string) => {
        setConfirmarRemocaoParticipanteId(participanteId);
  };

  const handleFecharRemoverParticipantePopup = () => {
        setConfirmarRemocaoParticipanteId(null);
  };

  const handleRemoverParticipante = async (participanteId: string) => {
    handleFecharRemoverParticipantePopup();
    await removerParticipante(participanteId);
  };


  return (
    <div className={styles.tableParticipantesContainer}>
      <Heading>Participantes</Heading>

      {!editando ? (
        <>
          <Heading size="md" my={4}>Participantes Cadastrados</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Tipo</Th>
                  <Th>Grupo</Th>
                  <Th>Atletas</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {participantes.map((participante) => (
                  <Tr key={participante.id}>
                    <Td>{participante.id}</Td>
                    <Td>{participante.nome}</Td>
                    <Td>{participante.tipo}</Td>
                    <Td>{participante.grupo}</Td>
                    <Td>
                      {
                        participante.tipo === "Equipe" &&
                        participante.atletas?.length &&
                        participante.atletas?.length > 0 ? 
                        participante.atletas.map((atleta) => atleta.nome).join(", "): "-"
                       }
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Editar Participante"
                        icon={<EditIcon />}
                        mr={2}
                        onClick={() => handleEntrarEditMode(participante)}
                      />
                      <IconButton
                        aria-label="Deletar Participante"
                        icon={<DeleteIcon />}
                        onClick={() => handleAbrirRemoverParticipantePopup(participante.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Button mt={4} mb={4} colorScheme="blue" onClick={() => setEditando({ 
            id: "", 
            nome: "", 
            tipo: "", 
            grupo: null, 
            imagemParticipante: null, 
            imagemAtletas: null, 
            atletas: [] 
          })}>
            Adicionar Participante
          </Button>

          {confirmarRemocaoParticipanteId && (
            <Modal
                isOpen={!!confirmarRemocaoParticipanteId}
                onClose={handleFecharRemoverParticipantePopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover participante</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover este participante?
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverParticipante(confirmarRemocaoParticipanteId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverParticipantePopup}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <ParticipanteForm
          participante={editando.id ? editando : null} 
          onSalvar={handleSalvar}
          onCancelar={() => setEditando(null)}
        />
      )}
    </div>
  );
}
