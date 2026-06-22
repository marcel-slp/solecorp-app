import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Checkbox,
  Flex
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import * as styles from "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUsuario } from "../../api";
import defaultLogin from "@/assets/images/login_logo.jpeg";
import { Image, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginUsuario(email, password);

    if (res.success) {
      const userId = res.userId;
      const nome = res.nome;
      const email = res.email;
      const nomePerfil = res.nomePerfil;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          userId,
          nome,
          email,
          nomePerfil,
          rememberMe,
          expiresAt: rememberMe
            ? Date.now() + 1000 * 60 * 60 * 24 * 30
            : Date.now() + 1000 * 60 * 60
        })
      );

      navigate(location.state?.redirectTo ?? "/escolher-dispositivo");
    } else {
      console.error("Falha ao fazer login:", res.message);
      setMessage(String(res.message));
    }
  };

  return (
    <div className={styles.registroContainer}>
      <Image src={defaultLogin} alt="Login Logo" className={styles.imageLogo} />
      <Text className={styles.tituloRegistro}>Login</Text>
      <form onSubmit={handleFormSubmit}>
        <FormControl isRequired className={styles.item}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired className={styles.item}>
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              pattern="^(?=.*[A-Z])(?=.*\d).{6,}$"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="sm"
                color="gray.600"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          className={styles.item}
          colorScheme="blue"
          type="submit"
          width="100%"
        >
          Entrar
        </Button>
        <Flex
          mt={1}
          align="center"
          justify="space-between"
          width="100%"
          className={styles.linhaAlterarSenha}
        >
          <Link to="/alterar-senha">Alterar senha?</Link>

          <Checkbox
            isChecked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            Mantenha-me logado
          </Checkbox>
        </Flex>
      </form>
      <Text color={message.includes("sucesso") ? "green" : "red"}>
        {message}
      </Text>
    </div>
  );
}
