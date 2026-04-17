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
  Select,
  Text
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import * as styles from "./styles.css";
import {
  BolaoListaGerenciamento,
  NovoBolao,
  bolaoStore
} from "../../stores/bolaoStore";
import { Bolao } from "../../stores/bolaoStore";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import BolaoForm from "../../components/BolaoForm";
import { BolaoRoles, EventoBase } from "../../models/BolaoCopaDefault";
import { formatarDataHoraBrasil, retornaUserPerfil } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";
import AcessoNegadoPage from "../Erros/AcessoNegadoPage";
import { PerfilSistema } from "../../models/PerfilSistema";
import BuscaUsuario from "../../components/BuscaUsuario";

// export type BolaoListaGerenciamento = {
//   id: string,
//   nome: string,
//   criador: string;
//   numeroParticipantes: number;
//   eventoBase: EventoBase.COPA_2026;
//   palpitesRealizados: number;
//   dataCriacao: string;
// }

export default function GerenciarBoloesAdmin() {
  const { boloesGerenciamento, carregarBolaoPorIdUserId, carregarBoloesGerenciamento, adicionarBolao, editarBolao, removerBolao } = bolaoStore();
  const [editando, setEditando] = useState<Bolao | null>(null);
  const [confirmarRemocaoBolaoId, setConfirmarRemocaoBolaoId] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [boloesFiltrados, setBoloesFiltrados] = useState<BolaoListaGerenciamento[]>([]);
  const [textoBusca, setTextoBusca] = useState("");

  const navigate = useNavigate();
  const userPerfil = retornaUserPerfil();

  useEffect(() => {
    carregarBoloesGerenciamento();
  }, [carregarBoloesGerenciamento]);

  useEffect(() => {
    if (!textoBusca.trim()) {
      setBoloesFiltrados(boloesGerenciamento);
      return;
    }

    const termo = textoBusca.toLowerCase().trim();

    const filtrados = boloesGerenciamento.filter((bolao) =>
      bolao.nome.toLowerCase().includes(termo) ||
      bolao.criador.toLowerCase().includes(termo)
    );

    setBoloesFiltrados(filtrados);
    setPaginaAtual(1);
  }, [boloesGerenciamento, textoBusca]);

  if (userPerfil != PerfilSistema.ADMIN) {
      return <AcessoNegadoPage />;
  }

  const totalPaginas = Math.ceil(boloesFiltrados.length / itensPorPagina);

  const boloesPaginados = boloesFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleBuscar = (texto: string) => {
    setTextoBusca(texto);
  };

  const handleSalvar = async (dados: NovoBolao, id?: string) => {
    let sucesso = false;

    try {
      if (id) {
        sucesso = await editarBolao(id, dados);
        setEditando(null);
      } else {
        sucesso = await adicionarBolao(dados);
        setEditando(null);
      }

      if (!sucesso) {
        alert("Ocorreu um erro ao salvar o bolão. Verifique os logs.");
      }
    } catch (err) {
      setEditando(null);
      alert("Falha ao salvar/editar bolão.");
      console.error(err);
    }
  };

  const handleEntrarEditMode = async (bolaoId: string) => {
    try {

      const responseBolao = await carregarBolaoPorIdUserId(bolaoId);

      if (responseBolao) {
        setEditando(responseBolao);
      } else {
        alert("Bolão não encontrado");
      }

    } catch (err) {
      console.error("Erro ao carregar bolão para edição:", err);
      alert("Ocorreu um erro ao tentar carregar o bolão.");
    }
  };

  const handleAbrirRemoverBolaoPopup = (bolaoId: string) => {
        setConfirmarRemocaoBolaoId(bolaoId);
  };

  const handleFecharRemoverBolaoPopup = () => {
        setConfirmarRemocaoBolaoId(null);
  };

  const handleRemoverBolao = async (bolaoId: string) => {
    handleFecharRemoverBolaoPopup();

    let sucesso = false;

    try{
      sucesso = await removerBolao(bolaoId);

      if (!sucesso) {
        alert("Ocorreu um erro ao removre o bolão. Verifique os logs.");
      }

    } catch (err) {
      setEditando(null);
      alert("Falha ao remover bolão.");
      console.error(err);
    }
  };

  return (
    <div className={styles.tableBolaoContainer}>
      <Heading mt={4}>Gerenciar Todos os Bolões</Heading>

      {!editando ? (
        <>
          <Heading size="md" my={4}>Bolões Cadastrados</Heading>

          <BuscaUsuario onBuscar={handleBuscar} />

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th textAlign="center">ID</Th>
                  <Th textAlign="center">Nome</Th>
                  <Th textAlign="center">Evento-Base</Th>
                  <Th textAlign="center">Número de Participantes</Th>
                  <Th textAlign="center">Palpites Realizados</Th>
                  <Th textAlign="center">Criador</Th>
                  <Th textAlign="center">Data de Criação</Th>
                  <Th textAlign="center">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {boloesGerenciamento.map((bolao) => ( */}
                {boloesPaginados.map((bolao) => (
                  <Tr key={bolao.id}>
                    <Td textAlign="center">{bolao.id}</Td>
                    <Td textAlign="center">{bolao.nome}</Td>
                    <Td textAlign="center">{bolao.eventoBase}</Td>
                    <Td textAlign="center">{bolao.numeroParticipantes}</Td>
                    <Td textAlign="center">{bolao.palpitesRealizados}</Td>
                    <Td textAlign="center">{bolao.criador}</Td>
                    <Td textAlign="center">{formatarDataHoraBrasil(bolao.dataCriacao)}</Td>
                    <Td>
                      <IconButton
                        aria-label="Entrar no Bolao"
                        icon={<ArrowForwardIcon />}
                        style={{marginRight: '10px'}}
                        onClick={() => navigate(`/bolao/${bolao.id}/inicio`)}
                      />
                      <IconButton
                        aria-label="Editar Bolao"
                        icon={<EditIcon />}
                        mr={2}
                        onClick={() => handleEntrarEditMode(bolao.id)}
                      />
                      <IconButton
                        aria-label="Deletar Bolao"
                        icon={<DeleteIcon />}
                        onClick={() => handleAbrirRemoverBolaoPopup(bolao.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <HStack mt={6} justify="space-between" align="center">
            <HStack>
              <Button
                size="sm"
                onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
                isDisabled={paginaAtual === 1}
              >
                Anterior
              </Button>

              <Text>
                Página {paginaAtual} de {totalPaginas || 1}
              </Text>

              <Button
                size="sm"
                onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
                isDisabled={paginaAtual === totalPaginas || totalPaginas === 0}
              >
                Próxima
              </Button>
            </HStack>

            <HStack marginBottom={3} marginRight={4}>
              <Text>Registros por página:</Text>
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
                <option value={boloesGerenciamento.length}>Todos</option>
              </Select>
            </HStack>
          </HStack>

          <Button 
            mt={4} 
            mb={4}
            colorScheme="blue" 
            onClick={() => setEditando({ 
              id: "", 
              nome: "", 
              compartilhamento: "",
              tipoConvite: "",
              pontuacao: "",
              imagemBolao: null,
              eventoBase: EventoBase.COPA_2026,
              userId: 0,
              convocacao: false,
              premiosIndividuais: false,
              melhoresPorRanking: false, 
              pontuacaoBonus: false,
              ranking: false,
              faseExtraPlayoff: false,
              roleBolao: BolaoRoles.CRIADOR
            })}
          >
            Adicionar Bolao
          </Button>

          {confirmarRemocaoBolaoId && (
            <Modal
                isOpen={!!confirmarRemocaoBolaoId}
                onClose={handleFecharRemoverBolaoPopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover Bolao</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover este Bolao?
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverBolao(confirmarRemocaoBolaoId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverBolaoPopup}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <BolaoForm
          bolao={editando.id ? editando : null} 
          onSalvar={handleSalvar}
          onCancelar={() => setEditando(null)}
        />
      )}
    </div>
  );
}
