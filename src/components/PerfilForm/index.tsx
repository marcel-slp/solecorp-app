import { useState, useEffect } from "react";
import { 
  Text, 
  //Input, 
  Button, 
  Heading,
  Alert,
  AlertIcon,
  Select,
  Input,
} from "@chakra-ui/react";
import * as styles from "./styles.css.ts";
import { NovoPerfil, Perfil } from "../../stores/perfisStore.ts";
import { PerfilSistema } from "../../models/PerfilSistema.tsx";

interface PerfilFormProps {
  perfil?: Perfil | null;
  onSalvar: (dados: NovoPerfil, id?: string) => void;
  onCancelar?: () => void;
}

export default function PerfilForm({ perfil, onSalvar, onCancelar }: PerfilFormProps) {
    const [nomePerfilInterno, setNomePerfilInterno] = useState<PerfilSistema>(PerfilSistema.USER_SIMPLES);
    const [descricaoPerfilInterno, setDescricaoPerfilInterno] = useState("");
     // TODO: VERIFICAR COMO VOU SETAR AS FUNCIONALIDADES DE CADA PERFIL
    const [mensagemAlertaPerfil, setMensagemAlertaPerfil] = useState<string|null>(null);

    useEffect(() => {        
        if (perfil) {
            setNomePerfilInterno(perfil.nome as PerfilSistema);
            if(perfil.descricao) setDescricaoPerfilInterno(perfil.descricao);
        }
    }, [perfil]);

    // if (isLoadingPermissions) {
    //     return (
    //         <EvrLoadingSpinner
    //             style={{
    //                 position: 'absolute',
    //                 top: '50%',
    //                 left: '50%'
    //             }}
    //             size="large"
    //         />
    //     );
    // }

    // if (!hasBackofficePermission) {
    //     return <EvrGenericErrorPage />; // IMPLEMENTAR ACESSO VIA CONTEXT
    // }

    const handleSubmit = () => {
        if (!nomePerfilInterno) {
            setMensagemAlertaPerfil("Preencha todos os dados obrigatórios");
            return;
        }

        setMensagemAlertaPerfil(null);

        const dados: NovoPerfil = {
            nome: nomePerfilInterno,
            descricao: descricaoPerfilInterno ?? undefined
        };
        
        onSalvar(dados);
    };
    
    return (
        <div className={styles.tablePerfilContainer}>
            <Heading size="md" mb={4} mt={4}>
                {perfil ? "Editar Perfil" : "Adicionar Perfil"}
            </Heading>

            <div className={styles.addPerfilContainer}>
                <Text>Nome:</Text>
                <Select
                    key={"nomePerfil"}
                    value={nomePerfilInterno} 
                    onChange={(e) => setNomePerfilInterno(e.target.value as PerfilSistema)}
                    >
                    {Object.values(PerfilSistema).map((perfil) => (
                        <option key={perfil} value={perfil}>{perfil}</option>
                    ))}
                </Select>
            </div>

                <div className={styles.addPerfilContainer}>
                    <Text>Descrição:</Text>
                    <Input
                        placeholder="Insira a descrição do perfil"
                        key={"descricaoPerfil"}
                        value={descricaoPerfilInterno} 
                        onChange={(e) => setDescricaoPerfilInterno(e.target.value)}
                    />
                </div>

            {mensagemAlertaPerfil && (
                <div className={styles.mensagemErroValidacao}>
                    <Alert status='error'>
                    <AlertIcon />
                        {mensagemAlertaPerfil}
                    </Alert>
                </div>
            )}

            <Button mt={4} mb={4} onClick={handleSubmit} colorScheme="blue" style={{ marginRight: "20px" }}>
                {perfil ? "Salvar Alterações" : "Salvar Perfil"}
            </Button>
            <Button onClick={onCancelar}>
                Cancelar
            </Button>
        </div>
    );
}
