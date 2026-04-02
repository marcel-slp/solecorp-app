//import * as styles from "./styles.css";
import ErrorPage from "../../../components/ErrorPage";
import { LuSearchX } from "react-icons/lu";

function NaoEncontradoPage() {
  return (
    <ErrorPage
        titulo={'Página não Encontrada'}
        texto={'Obrigado pelo seu interesse. Infelizmente, a página que acessou não foi encontrada.'}
        botoes={[
            {
                label: 'Voltar a Home',
                to: '/home',
            }
        ]}
        icone={LuSearchX }
    />
  );
}

export default NaoEncontradoPage;