import tituloTabela from "@/assets/images/tituloTabela.jpg";
import * as styles from "./styles.css";
// import { useEffect } from "react";
// import { palpitesStore } from "../../../stores/palpitesStore";
// import { retornaUserId } from "../../../utils/Utils";
import { useOutletContext } from "react-router-dom";
import { Bolao } from "../../../stores/bolaoStore";
import TabelaPalpitesJogosCopa2026 from "../../../components/TabelaPalpitesJogosCopa2026";

function PalpiteCopa2026() {
  const { bolao } = useOutletContext<{ bolao: Bolao }>();
  //const palpites = palpitesStore((state) => state.palpites);
  // const {palpitesUsuario , carregarPalpitesPorUsuario} = palpitesStore();

  // const userIdLogado = retornaUserId();

  // useEffect(() => {
  //   carregarPalpitesPorUsuario(bolao.id, userIdLogado);
  // }, [bolao.id, carregarPalpitesPorUsuario, userIdLogado]);

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
