import { useState, useEffect } from "react";
import {
  Text,
  Input,
  Button,
  Heading,
  Alert,
  AlertIcon,
  Select,
  Switch
} from "@chakra-ui/react";
import * as styles from "../JogadorForm/styles.css.ts";
import { ImageUploader } from "../ImageUploader/ImageUploader.tsx";
import defaultJogador from "@/assets/images/default_jogador.jpg";
import { Posicao } from "../../models/JogadoresDefault.tsx";
import { Jogador, NovoJogador } from "../../stores/jogadoresStore.ts";
import { Selecao } from "../../stores/selecoesStore.ts";

interface JogadorFormProps {
  jogador?: Jogador | null;
  selecoes: Selecao[];
  onSalvar: (dados: NovoJogador, id?: string) => void;
  onCancelar?: () => void;
}

export default function JogadorForm({
  jogador,
  selecoes,
  onSalvar,
  onCancelar
}: JogadorFormProps) {
  const [nomeJogadorInterno, setNomeJogadorInterno] = useState("");
  const [posicaoJogadorInterno, setPosicaoJogadorInterno] = useState<Posicao>(Posicao.GOLEIRO);
  const [selecaoJogadorInterno, setSelecaoJogadorInterno] = useState("África do Sul");
  const [imagemJogadorInterno, setImagemJogadorInterno] = useState<File | string | null>(null);
  const [listaMelhorJogadorInterno, setListaMelhorJogadorInterno] = useState<boolean>(false);
  const [listaMelhorGoleiroInterno, setListaMelhorGoleiroInterno] = useState<boolean>(false);
  const [listaArtilheiroInterno, setListaArtilheiroInterno] = useState<boolean>(false);
  const [mensagemAlerta, setMensagemAlerta] = useState<string | null>(null);

  useEffect(() => {
    if (jogador) {
      setNomeJogadorInterno(jogador.nome);
      setPosicaoJogadorInterno(jogador.posicao);
      setSelecaoJogadorInterno(jogador.selecao);
      setImagemJogadorInterno(jogador.imagemJogador);
      setListaMelhorJogadorInterno(jogador.listaMelhorJogador);
      setListaMelhorGoleiroInterno(jogador.listaMelhorGoleiro);
      setListaArtilheiroInterno(jogador.listaArtilheiro);
    }
  }, [jogador]);

  const handleSubmit = () => {
    if (
      !nomeJogadorInterno ||
      !posicaoJogadorInterno ||
      !selecaoJogadorInterno
    ) {
      setMensagemAlerta("Preencha todos os dados obrigatórios");
      return;
    }

    setMensagemAlerta(null);

    const novoJogador: NovoJogador = {
      nome: nomeJogadorInterno,
      posicao: posicaoJogadorInterno,
      selecao: selecaoJogadorInterno,
      imagemJogador: imagemJogadorInterno,
      listaMelhorJogador: listaMelhorJogadorInterno,
      listaMelhorGoleiro: listaMelhorGoleiroInterno,
      listaArtilheiro: listaArtilheiroInterno
    };

    onSalvar(novoJogador, jogador?.id);
  };

  return (
    <>
      <Heading size="md" mb={4} mt={4}>
        {jogador ? "Editar Jogador" : "Adicionar Jogador"}
      </Heading>

      <div className={styles.addJogadorContainer}>
        <Text>Nome:</Text>
        <div className={styles.jogadorInputs}>
          <Input
            key={"nomeJogador"}
            placeholder="Insira o nome do jogador"
            value={nomeJogadorInterno}
            onChange={(e) => setNomeJogadorInterno(e.target.value)}
          />
        </div>

        <Text>Imagem do Jogador:</Text>
        <ImageUploader
          imagem={imagemJogadorInterno}
          imagemDefault={defaultJogador}
          onChange={setImagemJogadorInterno}
        />

        <Text>Posição:</Text>
        <div className={styles.jogadorDropdown}>
          <Select
            key={"posicao"}
            value={posicaoJogadorInterno || ""}
            onChange={(e) => setPosicaoJogadorInterno(e.target.value as Posicao)}
          >
            {Object.values(Posicao).map((posicao) => (
              <option key={posicao} value={posicao}>
                {posicao}
              </option>
            ))}
          </Select>
        </div>

        <Text>Seleção:</Text>
        <div className={styles.jogadorDropdown}>
          <Select
            key={"selecao"}
            value={selecaoJogadorInterno}
            onChange={(e) => setSelecaoJogadorInterno(e.target.value)}
            className={styles.jogadorInputs}
          >
            {Object.values(selecoes).map((selecao) => (
              <option key={selecao.nome} value={selecao.nome}>
                {selecao.nome}
              </option>
            ))}
          </Select>
        </div>

        <Text>Aparecer na lista de Melhor Jogador:</Text>
        <div className={styles.jogadorDropdown}>
          <Switch
            key={"listaMelhorJogador"}
            isChecked={listaMelhorJogadorInterno}
            name="listaMelhorJogador"
            onChange={(e) => setListaMelhorJogadorInterno(e.target.checked)}
          />
        </div>

        <Text>Aparecer na lista de Melhor Goleiro:</Text>
        <div className={styles.jogadorDropdown}>
          <Switch
            key={"listaMelhorGoleiro"}
            isChecked={listaMelhorGoleiroInterno}
            name="listaMelhorGoleiro"
            onChange={(e) => setListaMelhorGoleiroInterno(e.target.checked)}
          />
        </div>

        <Text>Aparecer na lista de Artilheiro:</Text>
        <div className={styles.jogadorDropdown}>
          <Switch
            key={"listaArtilheiro"}
            isChecked={listaArtilheiroInterno}
            name="listaArtilheiro"
            onChange={(e) => setListaArtilheiroInterno(e.target.checked)}
          />
        </div>
      </div>

      {mensagemAlerta && (
        <div className={styles.mensagemErroValidacao}>
          <Alert status="error">
            <AlertIcon />
            {mensagemAlerta}
          </Alert>
        </div>
      )}

      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          style={{ marginRight: "20px" }}
        >
          {jogador ? "Salvar Alterações" : "Salvar Jogador"}
        </Button>
        <Button onClick={onCancelar}>Cancelar</Button>
      </div>
    </>
  );
}
