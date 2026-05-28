//import * as styles from "./styles.css";
import ErrorPage from "../../../components/ErrorPage";
import { LuSearchX } from "react-icons/lu";

export type NaoEncontradoPageProps = {
    mobile?: boolean;
};

function NaoEncontradoPage({ mobile }: NaoEncontradoPageProps) {
  return (
    <ErrorPage
        titulo={'Página não Encontrada'}
        texto={'Obrigado pelo seu interesse. Infelizmente, a página que acessou não foi encontrada.'}
        botoes={[
            {
                label: 'Voltar a Home',
                to: mobile ? '/mobile/boloes-mobile' : '/home',
            }
        ]}
        icone={LuSearchX }
    />
  );
}

export default NaoEncontradoPage;