import * as styles from "./styles.css";

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
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton
} from "@chakra-ui/react";

import {
  Evento,
  NovoEvento,
  eventosStore
} from "../../stores/eventosStore";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { FormaSistema } from "../../models/ConfiguracaoEvento";
import { useNavigate } from "react-router-dom";
import EventoForm from "../../components/EventoForm";

function EventosLista() {
  const { eventos, adicionarEvento, carregarEventos, editarEvento, removerEvento} = eventosStore();
  const [editando, setEditando] = useState<Evento | null>(null);
  const [confirmarRemocaoEventoId, setConfirmarRemocaoEventoId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  const handleSalvar = async (novoEvento: NovoEvento, id?: string) => {
    if (id) {
      await editarEvento(id, novoEvento);
      setEditando(null);
    } else {
      await adicionarEvento(novoEvento);
      setEditando(null);
    }
  };

  const handleEntrarEditMode = (evento: Evento) => {
    setEditando(evento);
  };

  const handleAbrirRemoverEventoPopup = (eventoId: string) => {
        setConfirmarRemocaoEventoId(eventoId);
  };

  const handleFecharRemoverEventoPopup = () => {
        setConfirmarRemocaoEventoId(null);
  };

  const handleRemoverEvento = async (eventoId: string) => {
    handleFecharRemoverEventoPopup();
    await removerEvento(eventoId);
  };

  return (
    <div className={styles.tableEventosContainer}>
      <Heading>Eventos</Heading>
      {!editando ? (
        <>
        <Heading size="md" style={{ marginBottom: "20px", marginTop: "20px" }}>
            Eventos Criados
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Forma de Sistema</Th>
                  <Th>Numero de Fases</Th>
                  <Th>Numero de Participantes</Th>
                  <Th>Modalidade</Th>
                  <Th>Tabela</Th>
                  <Th>Play-Off</Th>
                  <Th>Ações</Th>
                </Tr>
            </Thead>
            <Tbody>
                {eventos.map((evento: Evento) => {
                  return (
                      <Tr key={evento.id}>
                        <Td>{evento.id}</Td>
                        <Td>{evento.nome}</Td>
                        <Td>{evento.formaSistema}</Td>
                        <Td>{evento.numeroFases}</Td>
                        <Td>{evento.numeroParticipantes}</Td>
                        <Td>{evento.modalidade}</Td>
                        <Td>{evento.tabela}</Td>
                        <Td>{evento.playoff}</Td>
                        <Td>
                            <IconButton
                              aria-label="Entrar no Evento"
                              icon={<ArrowForwardIcon />}
                              style={{marginRight: '10px'}}
                              onClick={() => navigate(`/evento/${evento.id}/inicio`)}
                            />
                            <IconButton 
                                aria-label='Editar Evento' 
                                icon={<EditIcon />} 
                                style={{marginRight: '10px'}}
                                onClick={() => handleEntrarEditMode(evento)}
                            />
                            <IconButton 
                              aria-label='Deletar Evento' 
                              icon={<DeleteIcon />} 
                              onClick={() => handleAbrirRemoverEventoPopup(evento.id)}
                            />
                        </Td>
                      </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>

        <Button mt={4} mb={4} colorScheme="blue" onClick={() => setEditando({ 
            id: "", 
            nome: "",
            imagemEvento: null,
            imagemPatrocinador1: null,
            imagemPatrocinador2: null,
            imagemPatrocinador3: null,
            imagemPatrocinador4: null,
            modalidade: "",
            tabela: "",
            playoff: "",
            compartilhamento: "",
            formaSistema: FormaSistema.TORNEIO,
            numeroFases: 1,
            numeroParticipantes: 3,
            participantes: undefined,
            configuracaoFases: []
        })}>
          Criar Evento
        </Button>

        {confirmarRemocaoEventoId && (
            <Modal
                isOpen={!!confirmarRemocaoEventoId}
                onClose={handleFecharRemoverEventoPopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover este evento?
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverEvento(confirmarRemocaoEventoId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverEventoPopup}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
    ) : (
      <div className={styles.buttonSalvarEditarEvento}>
        <EventoForm
          evento={editando.id ? editando : null} 
          onSalvar={handleSalvar}
          onCancelar={() => setEditando(null)}
        />
      </div>
    )}
    </div>
  );
}

export default EventosLista