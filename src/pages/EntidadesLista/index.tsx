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
  AlertIcon
} from "@chakra-ui/react";
import * as styles from "./styles.css";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Entidade, entidadesStore, NovaEntidade } from "../../stores/entidadesStore";
import EntidadeForm from "../../components/EntidadeForm";
import { retornaUserId } from "../../utils/Utils";

function EntidadesLista() {
  const { entidades, adicionarEntidade, carregarEntidades, editarEntidade, removerEntidade} = entidadesStore();
  const [editando, setEditando] = useState<Entidade | null>(null);
  const [confirmarRemocaoEntidadeId, setConfirmarRemocaoEntidadeId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarEntidades(retornaUserId());
  }, [carregarEntidades]);

  const handleSalvar = async (novaEntidade: NovaEntidade, id?: string) => {
    if (id) {
      await editarEntidade(id, novaEntidade);
      setEditando(null);
    } else {
      await adicionarEntidade(novaEntidade);
      setEditando(null);
    }
  };

  const handleEntrarEditMode = (entidade: Entidade) => {
    setEditando(entidade);
  };

  const handleAbrirRemoverEntidadePopup = (entidadeId: string) => {
        setConfirmarRemocaoEntidadeId(entidadeId);
  };

  const handleFecharRemoverEntidadePopup = () => {
        setConfirmarRemocaoEntidadeId(null);
  };

  const handleRemoverEntidade = async (entidadeId: string) => {
    handleFecharRemoverEntidadePopup();
    await removerEntidade(entidadeId);
  };

  const maxEntidadeAlcancado = Array.isArray(entidades) && entidades.length > 1;

  return (
    <div className={styles.tableEntidadesContainer}>
      <Heading>Entidades</Heading>
      {!editando ? (
        <>
        <Heading size="md" style={{ marginBottom: "20px", marginTop: "20px" }}>
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
                </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(entidades) && entidades.length > 0 ? (
                  entidades.map((entidade: Entidade) => (
                    <Tr key={entidade.id}>
                      <Td>{entidade.id}</Td>
                      <Td>{entidade.nome}</Td>
                      <Td>{entidade.sigla}</Td>
                      <Td>{entidade.site}</Td>
                      <Td>{entidade.email}</Td>
                      <Td>
                        <IconButton
                          aria-label="Entrar na entidade"
                          icon={<ArrowForwardIcon />}
                          style={{ marginRight: '10px' }}
                          onClick={() => navigate(`/entidade/${entidade.id}/inicio`)}
                        />
                        <IconButton 
                          aria-label='Editar entidade' 
                          icon={<EditIcon />} 
                          style={{ marginRight: '10px' }}
                          onClick={() => handleEntrarEditMode(entidade)}
                        />
                        <IconButton 
                          aria-label='Deletar entidade' 
                          icon={<DeleteIcon />} 
                          onClick={() => handleAbrirRemoverEntidadePopup(entidade.id)}
                        />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={6} textAlign="center" color="gray.500" py={8}>
                      Nenhuma entidade cadastrada
                    </Td>
                  </Tr>
                )}
            </Tbody>
          </Table>
        </TableContainer>

        <Button disabled={maxEntidadeAlcancado} mt={4} mb={4} colorScheme="blue" onClick={() => setEditando({ 
            id: "", 
            nome: "",
            imagemEntidade: null,
            sigla: "",
            site: "",
            email: "",
            userId: 0
        })}>
          Criar Entidade
        </Button>
        {maxEntidadeAlcancado && (
          <div className={styles.mensagemErroValidacao}>
            <Alert status='error'>
              <AlertIcon />
              Máximo de entidades criadas
            </Alert>
          </div>
        )}

        {confirmarRemocaoEntidadeId && (
            <Modal
                isOpen={!!confirmarRemocaoEntidadeId}
                onClose={handleFecharRemoverEntidadePopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover Entidade</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover esta entidade?
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverEntidade(confirmarRemocaoEntidadeId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverEntidadePopup}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
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

export default EntidadesLista