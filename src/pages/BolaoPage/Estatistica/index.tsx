import * as styles from "./styles.css.ts";
import tituloEstatistica from "@/assets/images/tituloEstatistica.jpg";

function Estatistica() {
  return (
    <>
      <div className={styles.folhaContainer}>
        <div className={styles.tituloImagem}>
          <img src={tituloEstatistica} />
        </div>

        <div className={styles.folha}>Conteúdo da página ESTATÍSTICA</div>
      </div>
    </>
  );
};

export default Estatistica;
