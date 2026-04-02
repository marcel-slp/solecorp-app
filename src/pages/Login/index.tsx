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
			const perfilId = res.perfilId;
			localStorage.setItem("auth",
				JSON.stringify({
					userId,
					nome,
					email,
					perfilId,
					expiresAt: Date.now() + 1000 * 60 * 60
				})
			);
			
			navigate(location.state?.redirectTo ?? "/home");
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
				>
					Entrar
				</Button>
				<Button 
					className={styles.item} 
					colorScheme="blue"
					onClick={() => navigate("/registro", {state: location.state})}
				>
					Registrar
				</Button>
				<Link style={{marginLeft: '8rem'}} to='/alterar-senha'>Alterar senha?</Link>
			</form>
			<Text color={message.includes('sucesso') ? 'green' : 'red'}>{message}</Text>
		</div>
	);
}