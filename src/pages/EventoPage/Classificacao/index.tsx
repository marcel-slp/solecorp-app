import { useEventoNavigation } from "../../../context/EventoNavigationContext.tsx";
import TabelaClassificacao from "../../../components/TabelaClassificacao";
import * as styles from "./styles.css.ts";
import { Image } from "@chakra-ui/react";
import tituloClassificacao from "@/assets/images/tituloClassificacao.jpg";

function Classificacao() {
  const { 
    faseAtiva, 
    grupoAtivo, 
    modoGeral, 
    letraParaNome, 
    letraParaPlayer,
    letraParaSimbolo, 
    letraParaNomeEhPlaceholder, 
    tabelaPorGrupo
  } = useEventoNavigation();

  if (!tabelaPorGrupo[faseAtiva]) {
    return (
      <>
        <div className={styles.classificacaoContainer}>
          <div className={styles.tituloImagem}>
            <img src={tituloClassificacao} />
          </div>
          <div className={styles.folha}>
            <p>Classificação não disponível para esta fase.</p>
          </div>
        </div>
      </>
    );
  }

  if (!modoGeral && !tabelaPorGrupo[faseAtiva][grupoAtivo]) {
    return (
      <>
        <div className={styles.classificacaoContainer}>
          <div className={styles.tituloImagem}>
            <img src={tituloClassificacao} />
          </div>
          <div className={styles.folha}>
            <p>Classificação não disponível para esta fase e grupo.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.classificacaoContainer}>
        <div className={styles.tituloImagem}>
          <Image src={tituloClassificacao} />
        </div>
        <div className={styles.folha}>
          <TabelaClassificacao
            fase={faseAtiva}
            grupo={grupoAtivo}
            modoGeral={modoGeral}
            letraParaNome={letraParaNome}
            letraParaPlayer={letraParaPlayer}
            letraParaSimbolo={letraParaSimbolo} 
            letraParaNomeEhPlaceholder={letraParaNomeEhPlaceholder}
            tabelaPorGrupo={tabelaPorGrupo}
          />
        </div>
      </div>
    </>
  );
};

export default Classificacao;
