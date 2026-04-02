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
import { Usuario } from "../../stores/usuariosStore.ts";
import { PerfilSistema } from "../../models/PerfilSistema.tsx";

interface UsuarioFormProps {
  usuario: Usuario;
  onSalvar: (dados: Usuario, id: number) => void;
  onCancelar?: () => void;
}

export default function UsuarioForm({ usuario, onSalvar, onCancelar }: UsuarioFormProps) {
    const [nomeUsuarioInterno, setNomeUsuarioInterno] = useState<string>("");
    const [emailUsuarioInterno, setEmailUsuarioInterno] = useState<string>("");
		const [passwordUsuarioInterno, setPasswordUsuarioInterno] = useState<string>("");
    const [perfilUsuarioInterno, setPerfilUsuarioInterno] = useState("");
    const [mensagemAlertaUsuario, setMensagemAlertaUsuario] = useState<string|null>(null);

    useEffect(() => {        
			setNomeUsuarioInterno(usuario.nome);
			setPerfilUsuarioInterno(usuario.nomePerfil);
			setEmailUsuarioInterno(usuario.email);
    }, [usuario]);

    const handleSubmit = () => {
        if (!nomeUsuarioInterno || !emailUsuarioInterno || !perfilUsuarioInterno) {
            setMensagemAlertaUsuario("Preencha todos os dados obrigatórios");
            return;
        }

        setMensagemAlertaUsuario(null);

        const dados: Usuario = {
					id: usuario.id,
					nome: nomeUsuarioInterno,
					email: emailUsuarioInterno,
					password: passwordUsuarioInterno !== "" ? passwordUsuarioInterno : undefined,
					nomePerfil: perfilUsuarioInterno
        };
        
        onSalvar(dados, usuario.id);
    };
    
    return (
        <div className={styles.tableUsuarioContainer}>
            <Heading size="md" mb={4} mt={4}>
                Editar Usuário
            </Heading>

            <div className={styles.addUsuarioContainer}>
							<Text>Nome:</Text>
							<Input
									placeholder="Insira o nome do usuario"
									key={"nomeUsuario"}
									value={nomeUsuarioInterno} 
									onChange={(e) => setNomeUsuarioInterno(e.target.value)}
							/>
            </div>

						<div className={styles.addUsuarioContainer}>
							<Text>E-mail:</Text>
							<Input
								placeholder="Insira o email do usuario"
								key={"emailUsuario"}
								value={emailUsuarioInterno} 
								onChange={(e) => setEmailUsuarioInterno(e.target.value)}
							/>
						</div>

						<div className={styles.addUsuarioContainer}>
							<Text>Nova senha:</Text>
							<Input
								placeholder="Deixe em branco para manter a senha atual"
								key={"passwordUsuario"}
								type="password"
								value={passwordUsuarioInterno} 
								onChange={(e) => setPasswordUsuarioInterno(e.target.value)}
							/>
						</div>

						<div className={styles.addUsuarioContainer}>
							<Text>Perfil:</Text>
							<Select
									key={"perfilUsuario"}
									value={perfilUsuarioInterno} 
									onChange={(e) => setPerfilUsuarioInterno(e.target.value as PerfilSistema)}
									>
									{Object.values(PerfilSistema).map((perfil) => (
											<option key={perfil} value={perfil}>{perfil}</option>
									))}
							</Select>
					</div>

					{mensagemAlertaUsuario && (
						<div className={styles.mensagemErroValidacao}>
							<Alert status='error'>
							<AlertIcon />
								{mensagemAlertaUsuario}
							</Alert>
						</div>
					)}

					<Button mt={4} mb={4} onClick={handleSubmit} colorScheme="blue" style={{ marginRight: "20px" }}>
						Salvar Alterações
					</Button>
					<Button onClick={onCancelar}>
						Cancelar
					</Button>
			</div>
    );
}
