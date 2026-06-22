//import * as styles from "./styles.css";
import ErrorPage from "../../../components/ErrorPage";
import { FiRefreshCw } from "react-icons/fi";

function ManutencaoPage() {
  return (
    <ErrorPage
        titulo={'Página em Manutenção'}
        texto={'Lamentamos, mas estamos temporariamente em manutenção. Voltaremos o mais breve possível'}
        botoes={[
            {
                label: 'Atualizar a página',
                to: '/manutencao',
            }
        ]}
        icone={FiRefreshCw}
    />
  );
}

export default ManutencaoPage;