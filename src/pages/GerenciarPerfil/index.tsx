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
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import * as styles from "./styles.css";
import { useEffect,  useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { NovoPerfil, Perfil, perfisStore } from "../../stores/perfisStore";
import PerfilForm from "../../components/PerfilForm";
import { retornaUserPerfil } from "../../utils/Utils";
import AcessoNegadoPage from "../Erros/AcessoNegadoPage";

export default function GerenciarPerfil() {
  const { perfis, adicionarPerfil, carregarPerfis, editarPerfil, removerPerfil } = perfisStore();
  const [editandoPerfil, setEditandoPerfil] = useState<Perfil | null>(null);
  const [confirmarRemocaoPerfilId, setConfirmarRemocaoPerfilId] = useState<string | null>(null);
  const userPerfil = retornaUserPerfil();

  useEffect(() => {
    carregarPerfis();
  }, [carregarPerfis]);

  if (userPerfil != 'a1b2c') {
      return <AcessoNegadoPage />;
  }

  const handleSalvar = async (dados: NovoPerfil, id?: string) => {
    let sucesso = false;

    if (id) {
      sucesso = await editarPerfil(id, dados);
    } else {
      sucesso = await adicionarPerfil(dados);
    }

    if (sucesso) {
      setEditandoPerfil(null);
      await carregarPerfis();
    } else {
      alert("Ocorreu um erro ao salvar o perfil. Verifique os logs.");
    }
  };

  const handleEntrarEditModePerfil = (p: Perfil) => {    
    setEditandoPerfil(p);
  };

  const handleAbrirRemoverPerfilPopup = (id: string) => {
        setConfirmarRemocaoPerfilId(id);
  };

  const handleFecharRemoverPerfilPopup = () => {
        setConfirmarRemocaoPerfilId(null);
  };

  const handleRemoverPerfil = async (id: string) => {
    handleFecharRemoverPerfilPopup();
    await removerPerfil(id);
  };

  return (
    <div className={styles.tablePerfilContainer}>
      <Heading mt={4}>Perfis</Heading>

      {!editandoPerfil ? (
        <>
          <Heading size="md" my={4}>Perfis Existentes</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Perfil</Th>
                  <Th>Descrição</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {perfis.map((perfil) => (
                  <Tr key={perfil.id}>
                    <Td>{perfil.id}</Td>
                    <Td>{perfil.nome}</Td>
                    <Td>{perfil.descricao}</Td>
                    <Td>
                      <IconButton
                        aria-label="Editar Perfil"
                        icon={<EditIcon />}
                        mr={2}
                        onClick={() => handleEntrarEditModePerfil(perfil)}
                      />
                      <IconButton
                        aria-label="Deletar Perfil"
                        icon={<DeleteIcon />}
                        onClick={() => handleAbrirRemoverPerfilPopup(perfil.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Button mt={4} mb={4} colorScheme="blue" onClick={() => setEditandoPerfil({ 
            id: "", 
            nome: ""
          })}>
            Adicionar Perfil
          </Button>

          {confirmarRemocaoPerfilId && (
            <Modal
                isOpen={!!confirmarRemocaoPerfilId}
                onClose={handleFecharRemoverPerfilPopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover Perfil</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover este perfil?
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverPerfil(confirmarRemocaoPerfilId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverPerfilPopup}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <PerfilForm
          perfil={editandoPerfil.id ? editandoPerfil : null} 
          onSalvar={handleSalvar}
          onCancelar={() => setEditandoPerfil(null)}
        />
      )}
    </div>
  );
}