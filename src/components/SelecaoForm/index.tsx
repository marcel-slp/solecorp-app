import { useState, useEffect } from "react";
import {
  Text,
  Input,
  Button,
  Heading,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import * as styles from "../SelecaoForm/styles.css.ts";
import { ImageUploader } from "../ImageUploader/ImageUploader.tsx";
import defaultSelecao from "@/assets/images/default_participante.jpeg";
import { NovaSelecao, Selecao } from "../../stores/selecoesStore.ts";

interface SelecaoFormProps {
  selecao?: Selecao | null;
  onSalvar: (dados: NovaSelecao, id?: string) => void;
  onCancelar?: () => void;
}

export default function SelecaoForm({
  selecao,
  onSalvar,
  onCancelar
}: SelecaoFormProps) {
  const [nomeSelecaoInterno, setNomeSelecaoInterno] = useState("");
  const [imagemSelecaoInterno, setImagemSelecaoInterno] = useState<File | string | null>(null);
  const [campeaoInterno, setCampeaoInterno] = useState<boolean>(false);
  const [viceCampeaoInterno, setViceCampeaoInterno] = useState<boolean>(false);
  const [terceiroLugarInterno, setTerceiroLugarInterno] = useState<boolean>(false);
  const [mensagemAlerta, setMensagemAlerta] = useState<string | null>(null);

  useEffect(() => {
    if (selecao) {
      setNomeSelecaoInterno(selecao.nome);
      setImagemSelecaoInterno(selecao.imagemSelecao);
      setCampeaoInterno(selecao.campeao);
      setViceCampeaoInterno(selecao.viceCampeao);
      setTerceiroLugarInterno(selecao.terceiroLugar);
    }
  }, [selecao]);

  const handleSubmit = () => {

    if (
      !nomeSelecaoInterno
    ) {
      setMensagemAlerta("Preencha todos os dados obrigatórios");
      return;
    }

    setMensagemAlerta(null);

    const novaSelecao: NovaSelecao = {
      nome: nomeSelecaoInterno,
      imagemSelecao: imagemSelecaoInterno,
      campeao: campeaoInterno,
      viceCampeao: viceCampeaoInterno,
      terceiroLugar: terceiroLugarInterno
    };

    onSalvar(novaSelecao, selecao?.id);
  };

  return (
    <>
      <Heading size="md" mb={4} mt={4}>
        {selecao ? "Editar Seleção" : "Adicionar Seleção"}
      </Heading>

      <div className={styles.addSelecaoContainer}>
        <Text>Nome:</Text>
        <div className={styles.selecaoInputs}>
          <Input
            key={"nomeSelecao"}
            placeholder="Insira o nome da seleção"
            value={nomeSelecaoInterno}
            onChange={(e) => setNomeSelecaoInterno(e.target.value)}
          />
        </div>

        <Text>Imagem do Seleção:</Text>
        <ImageUploader
          imagem={imagemSelecaoInterno}
          imagemDefault={defaultSelecao}
          onChange={setImagemSelecaoInterno}
        />
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
          {selecao ? "Salvar Alterações" : "Salvar Seleção"}
        </Button>
        <Button onClick={onCancelar}>Cancelar</Button>
      </div>
    </>
  );
}
