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
  IconButton,
  Alert,
  AlertIcon,
  Badge,
  Tooltip,
  Box,
  Select,
  Checkbox,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

import * as styles from "./styles.css";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Entidade,
  entidadesStore,
  NovaEntidade
} from "../../stores/entidadesStore";
import EntidadeForm from "../../components/EntidadeForm";
import { retornaUserId } from "../../utils/Utils";
import { TbArrowsRightLeft } from "react-icons/tb";

function EntidadesLista() {
  const {
    entidades,
    entidadeAtivaId,
    adicionarEntidade,
    carregarEntidades,
    editarEntidade,
    removerEntidade,
    exportarEntidade,
    definirEntidadeAtiva
  } = entidadesStore();

  const [editando, setEditando] = useState<Entidade | null>(null);
  const [confirmarRemocaoEntidadeId, setConfirmarRemocaoEntidadeId] = useState<
    string | null
  >(null);
  const [confirmarExportarEntidadeId, setConfirmarExportarEntidadeId] = useState<string | null>(null);
  const [entidadeDestinoId, setEntidadeDestinoId] = useState("");
  const [transferirAntesRemover, setTransferirAntesRemover] = useState<boolean>(false);
  const [transferenciaConcluida, setTransferenciaConcluida] = useState<boolean>(false);

  const [processando, setProcessando] = useState(false);

  const userId = retornaUserId();

  useEffect(() => {
    carregarEntidades(userId);
  }, [carregarEntidades, userId]);

  const handleSalvar = async (novaEntidade: NovaEntidade, id?: string) => {
    if (id) {
      await editarEntidade(id, novaEntidade);
    } else {
      await adicionarEntidade(novaEntidade);
    }

    setEditando(null);
  };

  const handleAtivarEntidade = async (entidadeId: string) => {
    const ok = await definirEntidadeAtiva(entidadeId, userId);

    if (!ok) {
      alert("Não foi possível ativar a entidade");
    }
  };

  const handleAbrirExportarEntidadePopup = (entidadeId: string) => {
    setConfirmarExportarEntidadeId(entidadeId);
    setEntidadeDestinoId("");
  };

  const handleFecharExportarEntidadePopup = () => {
    setConfirmarExportarEntidadeId(null);
    setEntidadeDestinoId("");
    setTransferenciaConcluida(false);
  };

  const handleExportarEntidade = async () => {
    if (!confirmarExportarEntidadeId || !entidadeDestinoId) {
      alert("Selecione uma entidade de destino");
      return;
    }

    if (confirmarExportarEntidadeId === entidadeDestinoId) {
      alert("A entidade de destino deve ser diferente da entidade de origem");
      return;
    }

    setProcessando(true);

    try {
      const ok = await exportarEntidade(
        confirmarExportarEntidadeId,
        entidadeDestinoId
      );

      if (!ok) {
        alert("Não foi possível exportar os eventos e participantes");
        return;
      }

      setTransferenciaConcluida(true);

      setTimeout(() => {
        handleFecharExportarEntidadePopup();
      }, 1000);

    } catch (error) {
      console.error("Erro ao exportar entidade:", error);
      alert("Ocorreu um erro ao transferir os dados");
    } finally {
      setProcessando(false);
    }
  };

  const handleEntrarEditMode = (entidade: Entidade) => {
    setEditando(entidade);
  };

  const handleAbrirRemoverEntidadePopup = (entidadeId: string) => {
    setConfirmarRemocaoEntidadeId(entidadeId);
    setEntidadeDestinoId("");
    setTransferirAntesRemover(false);
  };

  const handleFecharRemoverEntidadePopup = () => {
    setConfirmarRemocaoEntidadeId(null);
    setEntidadeDestinoId("");
    setTransferirAntesRemover(false);
  };

  const handleRemoverEntidade = async () => {
    if (!confirmarRemocaoEntidadeId) return;

    if (confirmarRemocaoEntidadeId === entidadeAtivaId) {
      alert("Não é possível excluir a entidade ativa");
      return;
    }

    if (transferirAntesRemover) {
      if (!entidadeDestinoId) {
        alert("Selecione uma entidade para receber os dados");
        return;
      }

      if (confirmarRemocaoEntidadeId === entidadeDestinoId) {
        alert("A entidade de destino deve ser diferente da entidade excluída");
        return;
      }
    }

    setProcessando(true);

    try {
      if (transferirAntesRemover) {
        const ok = await exportarEntidade(
          confirmarRemocaoEntidadeId,
          entidadeDestinoId
        );

        if (!ok) {
          alert(
            "Não foi possível transferir os dados. A entidade não foi excluída."
          );
          return;
        }
      }

      await removerEntidade(confirmarRemocaoEntidadeId);

      alert("Entidade removida com sucesso!");

      handleFecharRemoverEntidadePopup();
    } catch (error) {
      console.error("Erro ao remover entidade:", error);
      alert("Ocorreu um erro ao remover a entidade");
    } finally {
      setProcessando(false);
    }
  };

  const maxEntidadeAlcancado = Array.isArray(entidades) && entidades.length > 1;

  // Entidades disponíveis para receber os dados.
  // const entidadesDestino = entidades.filter(
  //   (entidade: Entidade) =>
  //     entidade.id !== confirmarExportarEntidadeId &&
  //     entidade.id !== confirmarRemocaoEntidadeId
  // );

  // Origem da exportação na janela de exclusão.
  const entidadeParaRemover = entidades.find(
    (entidade: Entidade) => entidade.id === confirmarRemocaoEntidadeId
  );

  // Origem da exportação na janela independente.
  const entidadeParaExportar = entidades.find(
    (entidade: Entidade) => entidade.id === confirmarExportarEntidadeId
  );

  return (
    <div className={styles.tableEntidadesContainer}>
      <Heading>Entidades</Heading>

      {!editando ? (
        <>
          <Heading
            size="md"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Entidades Criadas
          </Heading>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Sigla</Th>
                  <Th>Site</Th>
                  <Th>Email</Th>
                  <Th textAlign="center">Status</Th>
                  <Th textAlign="center">Ações</Th>
                </Tr>
              </Thead>

              <Tbody>
                {Array.isArray(entidades) && entidades.length > 0 ? (
                  entidades.map((entidade: Entidade) => {
                    const isAtiva = entidade.id === entidadeAtivaId;

                    return (
                      <Tr key={entidade.id}>
                        <Td>{entidade.id}</Td>
                        <Td>{entidade.nome}</Td>
                        <Td>{entidade.sigla}</Td>
                        <Td>{entidade.site}</Td>
                        <Td>{entidade.email}</Td>

                        <Td textAlign="center">
                          {isAtiva ? (
                            <Badge colorScheme="green" variant="solid">
                              Ativa
                            </Badge>
                          ) : (
                            <Button
                              size="xs"
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => handleAtivarEntidade(entidade.id)}
                            >
                              Ativar
                            </Button>
                          )}
                        </Td>

                        <Td textAlign="center">
                          <IconButton
                            aria-label="Editar entidade"
                            icon={<EditIcon />}
                            mr={2}
                            onClick={() => handleEntrarEditMode(entidade)}
                          />
                          <Tooltip
                            label="Transferir eventos e participantes"
                            placement="top"
                            hasArrow
                          >
                            <IconButton
                              aria-label="Exportar eventos e participantes"
                              icon={<TbArrowsRightLeft />}
                              mr={2}
                              onClick={() =>
                                handleAbrirExportarEntidadePopup(entidade.id)
                              }
                            />
                          </Tooltip>
                          <Tooltip
                            label="Não é possível excluir a entidade ativa"
                            isDisabled={!isAtiva}
                            placement="top"
                            hasArrow
                          >
                            <Box as="span" display="inline-block">
                              <IconButton
                                aria-label="Deletar entidade"
                                icon={<DeleteIcon />}
                                isDisabled={isAtiva}
                                onClick={() =>
                                  handleAbrirRemoverEntidadePopup(entidade.id)
                                }
                              />
                            </Box>
                          </Tooltip>
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign="center" color="gray.500" py={8}>
                      Nenhuma entidade cadastrada
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>

          <Button
            isDisabled={maxEntidadeAlcancado}
            mt={4}
            mb={4}
            colorScheme="blue"
            onClick={() =>
              setEditando({
                id: "",
                nome: "",
                imagemEntidade: null,
                sigla: "",
                site: "",
                email: "",
                userId: 0
              })
            }
          >
            Criar Entidade
          </Button>

          {maxEntidadeAlcancado && (
            <div className={styles.mensagemErroValidacao}>
              <Alert status="error">
                <AlertIcon />
                Máximo de entidades criadas
              </Alert>
            </div>
          )}

          <Modal
            isOpen={!!confirmarExportarEntidadeId}
            onClose={handleFecharExportarEntidadePopup}
          >
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>Transferir eventos e participantes</ModalHeader>
              <ModalCloseButton isDisabled={processando} />

              <ModalBody>
                <p>
                  Selecione a entidade que receberá os eventos e participantes
                  de <strong>{entidadeParaExportar?.nome}</strong>.
                </p>

                <FormControl mt={4}>
                  <FormLabel>Entidade de destino</FormLabel>

                  <Select
                    placeholder="Selecione uma entidade"
                    value={entidadeDestinoId}
                    onChange={(e) => setEntidadeDestinoId(e.target.value)}
                    isDisabled={processando}
                  >
                    {entidades
                      .filter(
                        (entidade: Entidade) =>
                          entidade.id !== confirmarExportarEntidadeId
                      )
                      .map((entidade: Entidade) => (
                        <option key={entidade.id} value={entidade.id}>
                          {entidade.nome}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <Alert status="info" mt={4}>
                  <AlertIcon />
                  Os eventos e participantes serão transferidos sem excluir a
                  entidade de origem.
                </Alert>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme={transferenciaConcluida ? "green" : "blue"}
                  mr={3}
                  isLoading={processando}
                  isDisabled={!entidadeDestinoId || processando || transferenciaConcluida}
                  onClick={handleExportarEntidade}
                >
                  {transferenciaConcluida
                    ? "Transferido com sucesso!"
                    : "Transferir dados"}
                </Button>

                <Button
                  onClick={handleFecharExportarEntidadePopup}
                  isDisabled={processando || transferenciaConcluida}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={!!confirmarRemocaoEntidadeId}
            onClose={handleFecharRemoverEntidadePopup}
          >
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>Remover entidade</ModalHeader>
              <ModalCloseButton isDisabled={processando || transferenciaConcluida} />

              <ModalBody>
                <p>
                  Deseja realmente remover a entidade{" "}
                  <strong>{entidadeParaRemover?.nome}</strong>?
                </p>

                <Checkbox
                  mt={4}
                  isChecked={transferirAntesRemover}
                  isDisabled={processando}
                  onChange={(e) => {
                    setTransferirAntesRemover(e.target.checked);
                    setEntidadeDestinoId("");
                  }}
                >
                  Transferir eventos e participantes antes de excluir
                </Checkbox>

                {transferirAntesRemover && (
                  <FormControl mt={4}>
                    <FormLabel>Entidade que receberá os dados</FormLabel>

                    <Select
                      placeholder="Selecione uma entidade"
                      value={entidadeDestinoId}
                      onChange={(e) => setEntidadeDestinoId(e.target.value)}
                      isDisabled={processando}
                    >
                      {entidades
                        .filter(
                          (entidade: Entidade) =>
                            entidade.id !== confirmarRemocaoEntidadeId
                        )
                        .map((entidade: Entidade) => (
                          <option key={entidade.id} value={entidade.id}>
                            {entidade.nome}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}

                {transferirAntesRemover && (
                  <Alert status="info" mt={4}>
                    <AlertIcon />
                    Os eventos e participantes serão transferidos antes da
                    exclusão.
                  </Alert>
                )}

                {!transferirAntesRemover && (
                  <Alert status="warning" mt={4}>
                    <AlertIcon />A entidade será excluída sem transferir seus
                    eventos e participantes.
                  </Alert>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  isLoading={processando}
                  isDisabled={
                    processando ||
                    (transferirAntesRemover && !entidadeDestinoId)
                  }
                  onClick={handleRemoverEntidade}
                >
                  Sim, remover
                </Button>

                <Button
                  onClick={handleFecharRemoverEntidadePopup}
                  isDisabled={processando}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <div className={styles.buttonSalvarEditarEntidade}>
          <EntidadeForm
            entidade={editando.id ? editando : null}
            onSalvar={handleSalvar}
            onCancelar={() => setEditando(null)}
          />
        </div>
      )}
    </div>
  );
}

export default EntidadesLista;
