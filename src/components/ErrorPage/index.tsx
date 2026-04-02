import { Fragment } from "react";
import { 
  Text, 
  Button, 
  Heading,
  Icon,
} from "@chakra-ui/react";
import * as styles from "./styles.css.ts";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons/lib";

interface ErrorPageProps {
  titulo: string;
  texto: string;
  botoes: { label: string; textBellow?: string; to: string }[];
  icone: IconType;
}

export default function ErrorPage({ titulo, texto, botoes, icone }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
		<main>
			<Heading />
			<div className={styles.wrapper}>
					<Icon color='red' fontSize={200} as={icone }/>
				<div className={styles.text}>
					<Text as="h1" variant="display-l">
						{titulo}
					</Text>
					<Text
						as="p"
						variant="component-m"
						className={styles.textBody}
					>
						{texto}
					</Text>
					{botoes.map(({ label, to }) => (
						<Fragment key={label}>
							<Button
								size="md"
								colorScheme="blue"
								onClick={() => navigate(to)}
								className={styles.button}
							>
								{label}
							</Button>
						</Fragment>
					))}
				</div>
			</div>
		</main>
	);
}
