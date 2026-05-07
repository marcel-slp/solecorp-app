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
  Tr,
  Checkbox
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as styles from "./styles.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import JogadorForm from "../../components/JogadorForm";
import { Posicao } from "../../models/JogadoresDefault";
import { Jogador, jogadoresStore, NovoJogador } from "../../stores/jogadoresStore";
import { selecoesStore } from "../../stores/selecoesStore";

export default function GerenciarJogadores() {
  const { jogadores, carregarJogadores, adicionarJogador , editarJogador, removerJogador } = jogadoresStore();
  const { selecoes, carregarSelecoes, } = selecoesStore();
  
  const [editando, setEditando] = useState<Jogador | null>(null);
  const [confirmarRemocaoJogadorId, setConfirmarRemocaoJogadorId] = useState<string | null>(null);

  useEffect(() => {
    carregarJogadores();
    carregarSelecoes();
  }, [carregarJogadores, carregarSelecoes]);

  const jogadoresArray = Object.values(jogadores);

  const handleSalvar = async (dados: NovoJogador, id?: string) => {
    let sucesso = false;

    try {
      if (id) {
        sucesso = await editarJogador(id, dados);
        setEditando(null);
      } else {
        sucesso = await adicionarJogador(dados);
        setEditando(null);
      }

      if (!sucesso) {
        alert("Ocorreu um erro ao salvar o jogador. Verifique os logs.");
      }
    } catch (err) {
      setEditando(null);
      alert("Falha ao salvar/editar jogador.");
      console.error(err);
    }
  };

  const handleEntrarEditMode = (p: Jogador) => {    
    setEditando(p);
  };

  const handleAbrirRemoverJogadorPopup = (jogadorId: string) => {
        setConfirmarRemocaoJogadorId(jogadorId);
  };

  const handleFecharRemoverJogadorPopup = () => {
        setConfirmarRemocaoJogadorId(null);
  };

  const handleRemoverJogador = async (jogadorId: string) => {
    handleFecharRemoverJogadorPopup();

    let sucesso = false;

    try{
      sucesso = await removerJogador(jogadorId);

      if (!sucesso) {
        alert("Ocorreu um erro ao remover o jogador. Verifique os logs.");
      }

    } catch (err) {
      setEditando(null);
      alert("Falha ao remover jogador.");
      console.error(err);
    }
  };

  // const atualizarUnico = async (
  //   campo: "melhorJogador" | "melhorGoleiro" | "artilheiro",
  //   selecionadoId: string
  // ) => {
  //   await Promise.all(
  //     jogadoresArray.map((s) =>
  //       editarJogador(s.id, {
  //         ...s,
  //         [campo]: s.id === selecionadoId
  //       })
  //     )
  //   );
  // };

  // const melhorJogadorSelecionado = jogadoresArray.find(s => s.melhorJogador)?.id || "";
  // const melhorGoleiroSelecionado = jogadoresArray.find(s => s.melhorGoleiro)?.id || "";
  // const artilheiroSelecionado = jogadoresArray.find(s => s.artilheiro)?.id || "";

  return (
    <div className={styles.tableJoagdorContainer}>
      <Heading mt={4}>Jogadores da Copa do Mundo 2026</Heading>

      {!editando ? (
        <>
          <Heading size="md" my={4}>Jogadores Cadastrados</Heading>
          <TableContainer whiteSpace={"normal"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th textAlign="center">ID</Th>
                  <Th textAlign="center">Nome</Th>
                  <Th textAlign="center">Posição</Th>
                  <Th textAlign="center">Seleção</Th>
                  <Th textAlign="center">Lista Melhor Jogador</Th>
                  <Th textAlign="center">Lista Melhor Goleiro</Th>
                  <Th textAlign="center">Lista Artilheiro</Th>
                  {/* <Th textAlign="center">É o melhor jogador?</Th>
                  <Th textAlign="center">É o melhor goleiro?</Th>
                  <Th textAlign="center">É o artilheiro?</Th> */}
                  <Th textAlign="center">Data de Criação</Th>
                  <Th textAlign="center">Ações</Th>
                </Tr>
              </Thead>
      
              <Tbody>
                {jogadoresArray.map((jogador: Jogador) => (
                  <Tr key={jogador.id}>
                    <Td textAlign="center">{jogador.id}</Td>
                    <Td textAlign="center">{jogador.nome}</Td>

                    <Td textAlign="center">{jogador.posicao}</Td>
                    <Td textAlign="center">{jogador.selecao}</Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={jogador.listaMelhorJogador}
                        onChange={(e) => handleSalvar({
                          ...jogador,
                          listaMelhorJogador: e.target.checked
                        }, jogador.id)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={jogador.listaMelhorGoleiro}
                        onChange={(e) => handleSalvar({
                          ...jogador,
                          listaMelhorGoleiro: e.target.checked
                        }, jogador.id)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={jogador.listaArtilheiro}
                        onChange={(e) => handleSalvar({
                          ...jogador,
                          listaArtilheiro: e.target.checked
                        }, jogador.id)}
                      />
                    </Td>
                    {/* <Td textAlign="center">
                      <Radio
                        isChecked={melhorJogadorSelecionado === jogador.id}
                        onChange={() => atualizarUnico("melhorJogador", jogador.id)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Radio
                        isChecked={melhorGoleiroSelecionado === jogador.id}
                        onChange={() => atualizarUnico("melhorGoleiro", jogador.id)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Radio
                        isChecked={artilheiroSelecionado === jogador.id}
                        onChange={() => atualizarUnico("artilheiro", jogador.id)}
                      />
                    </Td> */}
                    {/* <Td textAlign="center">
                      <Checkbox
                        isChecked={jogador.melhorJogador}
                        onChange={(e) => handleSalvar({
                          ...jogador,
                          melhorJogador: e.target.checked
                        }, jogador.id)}
                      />
                    </Td> */}
                    {/* <Td textAlign="center">
                      <Checkbox
                        isChecked={jogador.melhorGoleiro}
                        onChange={(e) => handleSalvar({
                          ...jogador,
                          melhorGoleiro: e.target.checked
                        }, jogador.id)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={jogador.artilheiro}
                        onChange={(e) => handleSalvar({
                          ...jogador,
                          artilheiro: e.target.checked
                        }, jogador.id)}
                      />
                    </Td> */}
                    <Td textAlign="center">{jogador.dataCriacao}</Td>
                    <Td textAlign="center" paddingInline={"inherit"}>      
                        <IconButton
                          aria-label="Editar"
                          icon={<EditIcon />}
                          mr={1}
                          onClick={() => handleEntrarEditMode(jogador)}
                        />

                        <IconButton
                          aria-label="Excluir"
                          icon={<DeleteIcon />}
                          onClick={() => handleAbrirRemoverJogadorPopup(jogador.id)}
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
            onClick={() => setEditando({ 
              id: "", 
              nome: "", 
              posicao: Posicao.GOLEIRO,
              selecao: "",
              imagemJogador: null,
              listaMelhorJogador: false,
              listaMelhorGoleiro: false,
              listaArtilheiro: false,
              // melhorJogador: false,
              // artilheiro: false,
              // melhorGoleiro: false
            })}
          >
            Adicionar Jogador
          </Button>

          {confirmarRemocaoJogadorId && (
            <Modal
                isOpen={!!confirmarRemocaoJogadorId}
                onClose={handleFecharRemoverJogadorPopup}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remover Jogador</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Deseja realmente remover este jogador?
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => handleRemoverJogador(confirmarRemocaoJogadorId)}>
                    Sim
                  </Button>
                  <Button onClick={handleFecharRemoverJogadorPopup}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <JogadorForm
          jogador={editando.id ? editando : null}
          selecoes={selecoes}
          onSalvar={handleSalvar}
          onCancelar={() => setEditando(null)}
        />
      )}
    </div>
  );
}
