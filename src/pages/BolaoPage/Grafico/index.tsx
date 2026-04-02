import * as styles from "./styles.css.ts";
import tituloGrafico from "@/assets/images/tituloGrafico.jpg";
import { Image } from "@chakra-ui/react";

function Grafico() {
  return (
    <>
      <div className={styles.folhaContainer}>
        <div className={styles.tituloImagem}>
          <Image src={tituloGrafico} />
        </div>

        <div className={styles.folha}>Conteúdo da página GRÁFICO</div>
      </div>
    </>
  );
};

export default Grafico;
