import * as styles from "./styles.css";
import TabelasCriteriosPontuacao from "../../../components/TabelasCriteriosPontuacao";
import { BolaoRoles } from "../../../models/BolaoCopaDefault";
import { bolaoStore } from "../../../stores/bolaoStore";

export default function BolaoCriteriosPontuacao() {
  const { participanteBolaoLogado } = bolaoStore();

  const pontosEditaveisInterno = participanteBolaoLogado?.roleBolao === BolaoRoles.CRIADOR;
  
  return (
    <div className={styles.tableCriterioContainer}>
      <TabelasCriteriosPontuacao pontosEditaveis={pontosEditaveisInterno}/>
    </div>
  );
};