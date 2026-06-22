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
  ModalFooter,
  Checkbox,
  Select,
  Icon
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import * as styles from "./styles.css";
import { useEffect, useState } from "react";
import { bolaoStore, ParticipanteBolao, ParticipanteBolaoDTO } from "../../stores/bolaoStore";
import { BolaoRoles } from "../../models/BolaoCopaDefault";
import { useParams } from "react-router-dom";
import { retornaUserId } from "../../utils/Utils";
import { FaUserGear } from "react-icons/fa6";

export default function TabelaGerenciarParticipantesBolao() {
  const { participantesBolao, editarParticipanteBolao, removerParticipanteBolao, carregarParticipantesBolao } = bolaoStore();
  const [confirmarRemocaoParticipanteBolaoId, setConfirmarRemocaoParticipanteBolaoId] = useState<number | null>(null);

  const userId = retornaUserId();
  const { bolaoId } = useParams<{ bolaoId: string }>();

  useEffect(() => {
    if(bolaoId) carregarParticipantesBolao(bolaoId, userId);
  }, [bolaoId, carregarParticipantesBolao, userId]);

  const handleEditarParticipante = async (input: boolean | string, participanteBolao: ParticipanteBolaoDTO) => {
    const payload: ParticipanteBolaoDTO = {
      bolaoId: participanteBolao.bolaoId,
      userId: participanteBolao.userId,
      habilitarPalpite: typeof input === 'boolean' ? input : participanteBolao.habilitarPalpite,
      roleBolao: typeof input === 'string' ? input : participanteBolao.roleBolao,
    }

    const sucesso = await editarParticipanteBolao(payload);

    if (!sucesso) {
      alert("Ocorreu um erro ao editar o participante do bolão. Verifique os logs.");
    }
  };

  const handleAbrirRemoverBolaoPopup = (userId: number) => {
        setConfirmarRemocaoParticipanteBolaoId(userId);
  };

  const handleFecharRemoverBolaoPopup = () => {
        setConfirmarRemocaoParticipanteBolaoId(null);
  };

  const handleRemoverParticipanteBolao = async (userId: number) => {
    let sucesso = false;

    try {
      if(bolaoId) {
        sucesso = await removerParticipanteBolao(userId, bolaoId);
      }

      if (!sucesso) {
        alert("Ocorreu um erro ao deletar o participante. Verifique os logs.");
      }

    } catch (err) {
      alert("Falha ao deletar participante");
      console.error(err);
      handleFecharRemoverBolaoPopup();
    }

    handleFecharRemoverBolaoPopup();
  };

  return (
    <div className={styles.tableBolaoContainer}>
      <Heading size="md" my={4}>
        <Icon as={FaUserGear} mr={2} />
        Gerenciar Participantes do Bolão
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Papel</Th>
              <Th>Criado Em</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participantesBolao.map((participanteBolao: ParticipanteBolao) => (
              <Tr key={participanteBolao.userId}>
                <Td>{participanteBolao.nome}</Td>
                <Td>{participanteBolao.email}</Td>
                <Td>
                  <Select
                    key={participanteBolao.userId}
                    value={participanteBolao.roleBolao}
                    onChange={(e) => handleEditarParticipante(e.target.value, participanteBolao)} 
                  >
                    {Object.values(BolaoRoles).map((roleBolao) => (
                      <option key={roleBolao} value={roleBolao}>{roleBolao}</option>
                    ))}
                  </Select>
                </Td>
                <Td>{participanteBolao.joinedAt.toString()}</Td>
                <Td>
                  <Checkbox
                    style={{paddingRight: '20px'}}
                    isChecked={participanteBolao.habilitarPalpite}
                    backgroundColor={'white'}
                    onChange={(e) => handleEditarParticipante(e.target.checked, participanteBolao)}
                  >
                    Habilitar palpites?
                  </Checkbox>
                  <IconButton
                    aria-label="Deletar Participante Bolao"
                    icon={<DeleteIcon />}
                    onClick={() => handleAbrirRemoverBolaoPopup(participanteBolao.userId)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {confirmarRemocaoParticipanteBolaoId && (
        <Modal
            isOpen={!!confirmarRemocaoParticipanteBolaoId}
            onClose={handleFecharRemoverBolaoPopup}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remover Participante</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Deseja realmente remover este participante do bolão?
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => handleRemoverParticipanteBolao(confirmarRemocaoParticipanteBolaoId)}>
                Sim
              </Button>
              <Button onClick={handleFecharRemoverBolaoPopup}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
