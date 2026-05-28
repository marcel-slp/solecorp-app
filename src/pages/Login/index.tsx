import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import * as styles from "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUsuario } from "../../api";

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

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
			localStorage.setItem("auth",
				JSON.stringify({
					userId,
					nome,
					email,
					nomePerfil,
					expiresAt: Date.now() + 1000 * 60 * 60
				})
			);
			
			navigate(location.state?.redirectTo ?? "/escolher-dispositivo");
		} else {
			console.error('Falha ao fazer login:', res.message);
			setMessage(String(res.message));
		}
	};	

	return (
		<div className={styles.registroContainer}>
			<Text className={styles.tituloRegistro}>
				Login
			</Text>
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
					<Input 
							type="password"  
							autoComplete={"current-password"}
							value={password} 
							onChange={(e) => setPassword(e.target.value)}
					/>
				</FormControl>

				<Button 
					className={styles.item}
					colorScheme="blue" 
					type="submit"
					width="100%"
				>
					Entrar
				</Button>
				<Button 
					className={styles.item} 
					colorScheme="blue"
					variant="outline"
					width="100%"
					onClick={() => navigate("/registro", {state: location.state})}
				>
					Registrar
				</Button>
				<Link className={styles.linkAlterarSenha} to='/alterar-senha'>
					Alterar senha?
				</Link>
			</form>
			<Text color={message.includes('sucesso') ? 'green' : 'red'}>{message}</Text>
		</div>
	);
}