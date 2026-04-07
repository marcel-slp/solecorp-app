import TabelasCriteriosPontuacao from "../../components/TabelasCriteriosPontuacao";
import { retornaUserPerfil } from "../../utils/Utils";
import AcessoNegadoPage from "../Erros/AcessoNegadoPage";
import * as styles from "./styles.css";

export default function BolaoCriteriosPontuacao() {
  const userPerfil = retornaUserPerfil();

  if (userPerfil === 'a2b1c') {
      return <AcessoNegadoPage />;
  }
  
  return (
    <div className={styles.tableCriterioContainer}>
      <TabelasCriteriosPontuacao pontosEditaveis/>
    </div>
  );
};
