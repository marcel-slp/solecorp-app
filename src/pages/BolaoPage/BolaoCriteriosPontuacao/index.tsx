import * as styles from "./styles.css";
import TabelasCriteriosPontuacao from "../../../components/TabelasCriteriosPontuacao";
import { retornaUserPerfil } from "../../../utils/Utils";
import AcessoNegadoPage from "../../Erros/AcessoNegadoPage";

export default function BolaoCriteriosPontuacao() {
  const userPerfil = retornaUserPerfil();

  if (userPerfil == 'a1b1c') {
      return <AcessoNegadoPage />;
  }
  
  return (
    <div className={styles.tableCriterioContainer}>
      <TabelasCriteriosPontuacao pontosEditaveis/>
    </div>
  );
};