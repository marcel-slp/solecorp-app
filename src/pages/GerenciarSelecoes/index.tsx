import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { NovaSelecao, Selecao } from "../../stores/selecoesStore";

import * as styles from "./styles.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import SelecaoForm from "../../components/SelecaoForm";
import { selecoesStore } from "../../stores/selecoesStore";

export default function GerenciarSelecoes() {
  const {
    selecoes,
    carregarSelecoes,
    adicionarSelecao,
    editarSelecao,
    removerSelecao
  } = selecoesStore();

  const [editando, setEditando] = useState<Selecao | null>(null);
  const [confirmarRemocaoSelecaoId, setConfirmarRemocaoSelecaoId] =
    useState<string | null>(null);

  useEffect(() => {
    carregarSelecoes();
  }, [carregarSelecoes]);

  const handleSalvar = async (dados: NovaSelecao, id?: string) => {
    try {
      if (id) {
        await editarSelecao(id, dados);
      } else {
        await adicionarSelecao(dados);
      }
      setEditando(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar seleção");
    }
  };

  return (
    <div className={styles.tableJoagdorContainer}>
      <Heading mt={4}>Seleções da Copa do Mundo 2026</Heading>

      {!editando ? (
        <>
          <Heading size="md" my={4}>
            Seleções Cadastradas para Prêmios Individuais
          </Heading>

          <TableContainer whiteSpace={"normal"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th textAlign="center">ID</Th>
                  <Th textAlign="center">Nome</Th>
                  <Th textAlign="center">Data</Th>
                  <Th textAlign="center">Ações</Th>
                </Tr>
              </Thead>

              <Tbody>
                {selecoes.map((selecao) => (
                  <Tr key={selecao.id}>
                    <Td textAlign="center">{selecao.id}</Td>
                    <Td textAlign="center">{selecao.nome}</Td>
                    <Td textAlign="center">{selecao.dataCriacao}</Td>
                    <Td textAlign="center">
                      <IconButton
                        aria-label="Editar"
                        icon={<EditIcon />}
                        mr={1}
                        onClick={() => setEditando(selecao)}
                      />
                      <IconButton
                        aria-label="Excluir"
                        icon={<DeleteIcon />}
                        onClick={() =>
                          setConfirmarRemocaoSelecaoId(selecao.id)
                        }
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
            colorScheme="blue"
            onClick={() =>
              setEditando({
                id: "",
                nome: "",
                imagemSelecao: null,
                campeao: false,
                viceCampeao: false,
                terceiroLugar: false
              })
            }
          >
            Adicionar Seleção
          </Button>

          {confirmarRemocaoSelecaoId && (
            <Modal
              isOpen={!!confirmarRemocaoSelecaoId}
              onClose={() => setConfirmarRemocaoSelecaoId(null)}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover Seleção</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover esta seleção?
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() =>
                      removerSelecao(confirmarRemocaoSelecaoId)
                    }
                  >
                    Sim
                  </Button>
                  <Button
                    onClick={() =>
                      setConfirmarRemocaoSelecaoId(null)
                    }
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <SelecaoForm
          selecao={editando.id ? editando : null}
          onSalvar={handleSalvar}
          onCancelar={() => setEditando(null)}
        />
      )}
    </div>
  );
}
