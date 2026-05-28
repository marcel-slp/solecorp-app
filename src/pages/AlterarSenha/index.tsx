import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { alterarSenhaUsuario, verificarEmailUsuario } from "../../api";
import * as styles from "./styles.css";
import { Link } from "react-router-dom";

export function AlterarSenha() {
  const [step, setStep] = useState<"email" | "senha">("email");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [message, setMessage] = useState<string|null>(null);
	const [errorMessage, setErrorMessage] = useState<string|null>(null);

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, []);

  const handleVerificarEmail = async () => {
    const res = await verificarEmailUsuario(email);
    if (res.success) {
			setStep("senha");
			setErrorMessage(null);
		} else {
			setErrorMessage(res.message);
		}
  };

  const handleAlterarSenha = async () => {
    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

		setErrorMessage(null);
    const res = await alterarSenhaUsuario(email, senha);
    setMessage(res.message);
  };

  return (
    <div className={styles.registroContainer}>
      <Text className={styles.tituloRegistro}>Alterar Senha</Text>

      {step === "email" && (
        <>
          <FormControl isRequired isInvalid={errorMessage ? true : false}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
							autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
						<FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>

          <Button mt={4} colorScheme="blue" onClick={handleVerificarEmail}>
            Continuar
          </Button>
        </>
      )}

      {step === "senha" && (
        <form onSubmit={handleAlterarSenha}>
          <FormControl isRequired isInvalid={errorMessage ? true : false}>
            <FormLabel>Nova senha</FormLabel>
            <Input
              type="password"
							autoComplete="new-password"
              pattern="^(?=.*[A-Z])(?=.*\d).{6,}$"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
						<FormErrorMessage>{errorMessage}</FormErrorMessage>
            <FormHelperText>
              Pelo menos 6 caracteres, uma maiúscula e um número.
            </FormHelperText>

						<FormLabel style={{marginTop: '15px'}}>Confirmar senha</FormLabel>
            <Input
              type="password"
							autoComplete="confirm-new-password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </FormControl>					
          <Button mt={4} colorScheme="blue" type="submit">
            Alterar senha
          </Button>
          
        </form>
      )}
			
			<Text color={'green'} margin='20px 0 10px 0'>{message}</Text>
			<Link to='/login'>Ir para Login</Link>
    </div>
  );
}
