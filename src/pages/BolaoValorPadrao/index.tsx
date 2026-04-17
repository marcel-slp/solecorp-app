import TabelasCriteriosPontuacao from "../../components/TabelasCriteriosPontuacao";
import { PerfilSistema } from "../../models/PerfilSistema";
import { retornaUserPerfil } from "../../utils/Utils";
import AcessoNegadoPage from "../Erros/AcessoNegadoPage";
import * as styles from "./styles.css";

export default function BolaoCriteriosPontuacao() {
  const userPerfil = retornaUserPerfil();

  if (userPerfil === PerfilSistema.USER_SIMPLES) {
      return <AcessoNegadoPage />;
  }
  
  return (
    <div className={styles.tableCriterioContainer}>
      <TabelasCriteriosPontuacao pontosEditaveis/>
    </div>
  );
};
