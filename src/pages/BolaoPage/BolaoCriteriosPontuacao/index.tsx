import * as styles from "./styles.css";
import TabelasCriteriosPontuacao from "../../../components/TabelasCriteriosPontuacao";
import { BolaoRoles } from "../../../models/BolaoCopaDefault";
import { bolaoStore } from "../../../stores/bolaoStore";
import { retornaUserPerfil } from "../../../utils/Utils";

export default function BolaoCriteriosPontuacao() {
  const { participanteBolaoLogado } = bolaoStore();

  const pontosEditaveisInterno = participanteBolaoLogado?.roleBolao === BolaoRoles.CRIADOR && retornaUserPerfil() !== 'a2b1c';
  
  return (
    <div className={styles.tableCriterioContainer}>
      <TabelasCriteriosPontuacao pontosEditaveis={pontosEditaveisInterno}/>
    </div>
  );
};