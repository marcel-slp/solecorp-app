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
  HStack,
  Text,
  Select,
  Flex
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import * as styles from "./styles.css";
import { useEffect,  useState } from "react";
import { DeleteIcon, EditIcon, WarningIcon } from "@chakra-ui/icons";
import { Usuario, usuariosStore } from "../../stores/usuariosStore";
import { retornaUserPerfil } from "../../utils/Utils";
import AcessoNegadoPage from "../Erros/AcessoNegadoPage";
import UsuarioForm from "../../components/UsuarioForm";
import BuscaUsuario from "../../components/BuscaUsuario";

export default function GerenciarUsuarios() {
  const { usuarios, carregarUsuarios, editarUsuario, removerUsuario } = usuariosStore();
  const [editandoUsuario, setEditandoUsuario] = useState<Usuario | null>(null);
  const [confirmarRemocaoUsuarioId, setConfirmarRemocaoUsuarioId] = useState<number | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  const [textoBusca, setTextoBusca] = useState("");

  const userPerfil = retornaUserPerfil();

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  useEffect(() => {
    if (!textoBusca) {
      setUsuariosFiltrados(usuarios);
      return;
    }

    const termo = textoBusca.toLowerCase();

    const filtrados = usuarios.filter(
      (u) =>
        u.nome.toLowerCase().includes(termo) ||
        u.email.toLowerCase().includes(termo)
    );

    setUsuariosFiltrados(filtrados);
  }, [usuarios, textoBusca]);

  if (userPerfil != 'a1b2c') {
      return <AcessoNegadoPage />;
  }

  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);

  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleBuscarUsuarios = (texto: string) => {
    setTextoBusca((anterior) => {
      if (anterior !== texto) {
        setPaginaAtual(1);
      }
      return texto;
    });
  };

  const handleSalvar = async (dados: Usuario, id: number) => {
    const sucesso = await editarUsuario(dados, id);

    if (sucesso) {
      setEditandoUsuario(null);
      await carregarUsuarios();
    } else {
      alert("Ocorreu um erro ao salvar o usuario. Verifique os logs.");
    }
  };

  const handleEntrarEditModeUsuario = (p: Usuario) => {    
    setEditandoUsuario(p);
  };

  const handleAbrirRemoverUsuarioPopup = (id: number) => {
        setConfirmarRemocaoUsuarioId(id);
  };

  const handleFecharRemoverUsuarioPopup = () => {
        setConfirmarRemocaoUsuarioId(null);
  };

  const handleRemoverUsuario = async (id: number) => {
    handleFecharRemoverUsuarioPopup();
    await removerUsuario(id);
  };

  return (
    <div className={styles.tableUsuariosContainer}>
      <Heading mt={4}>Usuários</Heading>

      {!editandoUsuario ? (
        <>
          <Heading size="md" my={4}>Usuários Existentes</Heading>
          <BuscaUsuario onBuscar={handleBuscarUsuarios} />
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Perfil</Th>
                  <Th>Criado Em</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {usuariosPaginados.map((usuario) => (
                  <Tr key={usuario.id}>
                    <Td>{usuario.id}</Td>
                    <Td>{usuario.nome}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>{usuario.nomePerfil}</Td>
                    <Td>{String(usuario.criadoEm)}</Td>
                    <Td>
                      <IconButton
                        aria-label="Editar Usuario"
                        icon={<EditIcon />}
                        mr={2}
                        onClick={() => handleEntrarEditModeUsuario(usuario)}
                      />
                      <IconButton
                        aria-label="Deletar Usuario"
                        icon={<DeleteIcon />}
                        onClick={() => handleAbrirRemoverUsuarioPopup(usuario.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <HStack mt={4} justify="space-between" align="center">
            <HStack marginBottom={3}>
              <Button
                size="sm"
                
                onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
                isDisabled={paginaAtual === 1}
              >
                Anterior
              </Button>

              <Text>
                Página {paginaAtual} de {totalPaginas}
              </Text>

              <Button
                size="sm"
                onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
                isDisabled={paginaAtual === totalPaginas}
              >
                Próxima
              </Button>
            </HStack>

            <HStack marginBottom={3} marginRight={4}>
              <Text>Registros:</Text>
              <Select
                size="sm"
                width="100px"
                value={itensPorPagina}
                onChange={(e) => {
                  setItensPorPagina(Number(e.target.value));
                  setPaginaAtual(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={usuarios.length}>Todos</option>
              </Select>
            </HStack>
          </HStack>

          {/* <Button mt={4} mb={4} colorScheme="blue" onClick={() => setEditandoUsuario({ 
            id: 0, 
            nome: "",
            email: "",
            perfilNome: PerfilSistema.USER_SIMPLES,
            criadoEm: new Date
          })}>
            Adicionar Usuário
          </Button> */}

          {confirmarRemocaoUsuarioId && (
            <Modal
                isOpen={!!confirmarRemocaoUsuarioId}
                onClose={handleFecharRemoverUsuarioPopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover Usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover este usuário?
                  <Flex align="center" gap={2}>
                    <WarningIcon color="red.500" />
                    <Text color="red.500" fontWeight="bold">
                      CUIDADO: Isso irá deletar seus palpites também!
                    </Text>
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverUsuario(confirmarRemocaoUsuarioId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverUsuarioPopup}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <UsuarioForm
          usuario={editandoUsuario} 
          onSalvar={handleSalvar}
          onCancelar={() => setEditandoUsuario(null)}
        />
      )}
    </div>
  );
}