// import tituloTabela from "@/assets/images/tituloTabela.jpg";
import * as styles from "./styles.css";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore";
import TabelaPalpitesJogosCopa2026Mobile from "../../../components/TabelaPalpitesJogosCopa2026Mobile";

function PalpiteCopa2026Mobile() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();

  return (
    <>
      <div className={styles.folhaContainer}>
        <div className={styles.folha}>
          <TabelaPalpitesJogosCopa2026Mobile bolaoId={bolao.id}/>
        </div>
      </div>
    </>
  );
};

export default PalpiteCopa2026Mobile;
