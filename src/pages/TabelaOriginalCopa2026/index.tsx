import tituloTabela from "@/assets/images/tituloTabela.jpg";
import * as styles from "./styles.css";
import TabelaOriginalJogosCopa2026 from "../../components/TabelaOriginalJogosCopa2026";
import AcessoNegadoPage from "../Erros/AcessoNegadoPage";
import { retornaUserPerfil } from "../../utils/Utils";
import { PerfilSistema } from "../../models/PerfilSistema";

function TabelaOriginalCopa2026() {
  const userPerfil = retornaUserPerfil();

  if (userPerfil != PerfilSistema.ADMIN) {
      return <AcessoNegadoPage />;
  }
  
  return (
    <>
      <div className={styles.folhaContainer}>
        <div className={styles.tituloImagem}>
          <img src={tituloTabela} />
        </div>
        <div className={styles.folha}>
          <TabelaOriginalJogosCopa2026/>
        </div>
      </div>
    </>
  );
};

export default TabelaOriginalCopa2026;
