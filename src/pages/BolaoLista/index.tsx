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
  NovoBolao,
  bolaoStore
} from "../../stores/bolaoStore";
import { Bolao } from "../../stores/bolaoStore";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import BolaoForm from "../../components/BolaoForm";
import { BolaoRoles, EventoBase } from "../../models/BolaoCopaDefault";
import { retornaUserId, retornaUserPerfil } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";
import { PerfilSistema } from "../../models/PerfilSistema";

export default function BolaoLista() {
  const { boloes, adicionarBolao, carregarBoloesPorUserId, editarBolao, removerBolao } = bolaoStore();
  const [editando, setEditando] = useState<Bolao | null>(null);
  const [confirmarRemocaoBolaoId, setConfirmarRemocaoBolaoId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarBoloesPorUserId(retornaUserId());
  }, [carregarBoloesPorUserId]);

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
        alert("Ocorreu um erro ao salvar o Bolao. Verifique os logs.");
      }
    } catch (err) {
      setEditando(null);
      alert("Falha ao salvar/editar bolão.");
      console.error(err);
    }
  };

  const handleEntrarEditMode = (p: Bolao) => {    
    setEditando(p);
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

  const hideAddBolao = retornaUserPerfil() === PerfilSistema.USER_SIMPLES && boloes.filter(b => b.roleBolao && b.roleBolao === BolaoRoles.CRIADOR).length >= 2;

  return (
    <div className={styles.tableBolaoContainer}>
      <Heading mt={4}>Bolão Copa do Mundo 2026</Heading>

      {!editando ? (
        <>
          <Heading size="md" my={4}>Bolões Cadastrados/Convidados</Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Evento-Base</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {boloes.map((bolao) => (
                  <Tr key={bolao.id}>
                    <Td>{bolao.id}</Td>
                    <Td>{bolao.nome}</Td>
                    <Td>{bolao.eventoBase}</Td>
                    <Td>
                      <IconButton
                        aria-label="Entrar no Bolao"
                        icon={<ArrowForwardIcon />}
                        style={{marginRight: '10px'}}
                        onClick={() => navigate(`/bolao/${bolao.id}/inicio`)}
                      />
                      <IconButton
                        aria-label="Editar Bolao"
                        hidden={bolao.roleBolao !== 'criador'}
                        icon={<EditIcon />}
                        mr={2}
                        onClick={() => handleEntrarEditMode(bolao)}
                      />
                      <IconButton
                        aria-label="Deletar Bolao"
                        hidden={bolao.roleBolao !== 'criador'}
                        icon={<DeleteIcon />}
                        onClick={() => handleAbrirRemoverBolaoPopup(bolao.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Button 
            mt={4} 
            mb={4}
            disabled={hideAddBolao}
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
