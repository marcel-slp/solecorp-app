import { useState, useEffect } from "react";
import { 
  Text, 
  Input, 
  Button, 
  Heading,
  // Alert,
  // AlertIcon,
  // FormLabel,
  // FormControl,
  // FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as styles from './styles.css'
import { ImageUploader } from "../ImageUploader/ImageUploader.tsx";
import defaultEntidade from "@/assets/images/default_entidade.jpg";
import { Entidade, NovaEntidade } from "../../stores/entidadesStore.ts";
import { retornaUserId } from "../../utils/Utils.ts";

interface entidadeFormProps {
  entidade?: Entidade | null;
  onSalvar: (dados: NovaEntidade, id?: string) => void;
  onCancelar?: () => void;
}

export default function EntidadeForm({ entidade, onSalvar, onCancelar }: entidadeFormProps) {
  const [nomeEntidadeInterno, setNomeEntidadeInterno] = useState("");
  const [imagemEntidadeInterno, setImagemEntidadeInterno] = useState<File|string|null>(null);
  const [siglaEntidadeInterno, setSiglaEntidadeInterno] = useState<string>("");
  const [siteEntidadeInterno, setSiteEntidadeInterno] = useState<string>("");
  const [emailEntidadeInterno, setEmailEntidadeInterno] = useState<string>("");
  const [userIdEntidadeInterno, setUserIdEntidadeInterno] = useState<number|null>(null);
  const [mensagemAlerta, setMensagemAlerta] = useState<string|null>(null);

  useEffect(() => {
    if (entidade) {
      setNomeEntidadeInterno(entidade.nome);
      setImagemEntidadeInterno(entidade.imagemEntidade);
      setSiglaEntidadeInterno(entidade.sigla);
      setEmailEntidadeInterno(entidade.email);
      setSiteEntidadeInterno(entidade.site);
      setUserIdEntidadeInterno(entidade.userId);
    }
  }, [entidade]);

  const handleSubmit = () => {
    const userIdLogado = userIdEntidadeInterno ?? retornaUserId();
    if (!nomeEntidadeInterno || !siglaEntidadeInterno) {
      setMensagemAlerta("Nome e Sigla da Entidade devem estar preenchidos");
      return;
    } else if(!userIdLogado) {
      setMensagemAlerta("Algo errado. Usuário deve estar logado");
      return;
    }

    setMensagemAlerta(null);

    //const userIdLogado = userIdEntidadeInterno ?? retornaUserId();

    const novaEntidade: NovaEntidade = {
      nome: nomeEntidadeInterno,
      imagemEntidade: imagemEntidadeInterno,
      sigla: siglaEntidadeInterno,
      site: siteEntidadeInterno,
      email: emailEntidadeInterno,
      userId: userIdLogado
    };
    
    onSalvar(novaEntidade, entidade?.id);
  };
    
  return (
    <>
      <Heading size="md" mb={4} mt={4}>
          {entidade ? "Editar entidade" : "Adicionar entidade"}
      </Heading>

      <div className={styles.addEntidadesContainer}>
        <Text fontWeight={'normal'}>Nome:</Text>
        <div className={styles.entidadeInputs}>
          <Input
            placeholder="Insira o nome"
            value={nomeEntidadeInterno}
            onChange={(e) => setNomeEntidadeInterno(e.target.value)}
          />
        </div>
        
        <Text>Imagem da Entidade:</Text>
        <ImageUploader imagem={imagemEntidadeInterno} imagemDefault={defaultEntidade} onChange={setImagemEntidadeInterno} />

        <Text fontWeight={'normal'}>Sigla:</Text>
        <div className={styles.entidadeInputs}>
          <Input
            placeholder="Máx. 5 letras"
            maxLength={5}
            value={siglaEntidadeInterno}
            onChange={(e) => setSiglaEntidadeInterno(e.target.value)}
          />
        </div>

        <Text>E-mail:</Text>
        <div className={styles.entidadeInputs}>
          <Input
            placeholder="E-mail..."
            type="email"
						autoComplete="email"
            value={emailEntidadeInterno}
            onChange={(e) => setEmailEntidadeInterno(e.target.value)}
          />
        </div>

        <Text>Site:</Text>
        <div className={styles.entidadeInputs}>
          <Input
            placeholder="www..."
            type="url"
            value={siteEntidadeInterno}
            onChange={(e) => setSiteEntidadeInterno(e.target.value)}
          />
        </div>
      </div> 

      {mensagemAlerta && (
        <div className={styles.mensagemErroValidacao}>
          <Alert status='error'>
            <AlertIcon />
            {mensagemAlerta}
          </Alert>
        </div>
      )}

      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Button onClick={handleSubmit} colorScheme="blue" style={{ marginRight: "20px" }}>
            {entidade ? "Salvar Alterações" : "Salvar Entidade"}
        </Button>
        <Button onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </>
  );
}
