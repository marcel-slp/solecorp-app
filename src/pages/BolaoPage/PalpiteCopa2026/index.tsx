import tituloTabela from "@/assets/images/tituloTabela.jpg";
import * as styles from "./styles.css";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore";
import TabelaPalpitesJogosCopa2026 from "../../../components/TabelaPalpitesJogosCopa2026";

function PalpiteCopa2026() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();

  return (
    <>
      <div className={styles.folhaContainer}>
        <div className={styles.tituloImagem}>
          <img src={tituloTabela} />
        </div>
        <div className={styles.folha}>
          <TabelaPalpitesJogosCopa2026 bolaoId={bolao.id}/>
        </div>
      </div>
    </>
  );
};

export default PalpiteCopa2026;
