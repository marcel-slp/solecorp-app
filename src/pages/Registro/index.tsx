import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
	Checkbox,
	useDisclosure,
	Flex,
	InputGroup,
	InputRightElement,
	IconButton,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import * as styles from "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../api";
import { ModalGenerico } from "../../components/ModalGenerico";
import BolaoTermosUso from "../../components/BolaoTermosUso";
import { FaArrowLeft } from "react-icons/fa6";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export function Registro() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState('');
	const [checkTermosCondicoes, setCheckTermosCondicoes] = useState<boolean>(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setEmail('');
		setPassword('');
		setNome('');
		setMessage('');
	}, []);

	const handleSubmitRegistro = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await registrarUsuario(nome, email, password);

		if (res.success && res.message) {
			setMessage(res.message);
			setTimeout(() => navigate("/login", {state: location.state}), 2000);
		} else {
			console.error('Falha ao fazer registro:', res.message);
			setMessage(String(res.message));
		}
	};

	return (
		<div className={styles.registroContainer}>
			<Text className={styles.tituloRegistro}>
				Criar Conta
			</Text>
			<form onSubmit={handleSubmitRegistro}>
				<FormControl isRequired>
					<FormLabel className={styles.item}>Nome Completo</FormLabel>
					<Input 
							type="input"  
							value={nome} 
							onChange={(e) => setNome(e.target.value)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel className={styles.item}>Email</FormLabel>
					<Input 
							type="email"  
							autoComplete="email" 
							value={email} 
							onChange={(e) => setEmail(e.target.value)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel className={styles.item}>Senha</FormLabel>
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
					<FormHelperText>
						Senha deve conter pelo menos 6 caracteres, sendo uma maiúscula e um número.
					</FormHelperText>
				</FormControl>
				<div className={styles.linkTermosCondicoes}>
					<Link
						onClick={() => onOpen()}
						to=''
					>
						Ver Termos e Condições
					</Link>

					<Checkbox
						isChecked={checkTermosCondicoes}
						backgroundColor={'white'}
						onChange={(e) => setCheckTermosCondicoes(e.target.checked)}
					>
						Aceito os Termos e Condições do sistema?
					</Checkbox>
				</div>

				<Flex justify="space-between" align="center" mt={6} gap={4}>
          <Button 
            disabled={!checkTermosCondicoes}
            colorScheme="blue" 
            type="submit"
            size="lg"
          >
            Cadastrar
          </Button>

          <Link 
            to="/login"
            className={styles.linkLogin}
          >
            <FaArrowLeft style={{ marginRight: "8px" }} />
            Ir para o Login
          </Link>
        </Flex>
			</form>
			<Text color={message.includes('sucesso') ? 'green' : 'red'}>{message}</Text>
			<ModalGenerico 
				isOpen={isOpen} 
				onClose={onClose} 
				titulo={''} 
				conteudo={<BolaoTermosUso />} 
				tamanho="full"
			/>
		</div>
	);
}