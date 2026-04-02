//import * as styles from "./styles.css";
import ErrorPage from "../../../components/ErrorPage";
import { RiForbidFill } from "react-icons/ri";

function AcessoNegadoPage() {
  return (
    <ErrorPage
        titulo={'Acesso Negado'}
        texto={'Lamentamos, não tem permissão para acessar esta página'}
        botoes={[
            {
                label: 'Voltar a Home',
                to: '/home',
            }
        ]}
        icone={RiForbidFill}
    />
  );
}

export default AcessoNegadoPage;