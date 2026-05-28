import { Link, useLocation } from "react-router-dom";
import * as styles from "./styles.css";
import { bolaoStore } from "../../stores/bolaoStore";

export default function HeaderNavMobile() {

  const { participanteBolaoLogado } = bolaoStore();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath.includes(path);

  const usuarioLogadoPalpiteHabilitado = participanteBolaoLogado?.habilitarPalpite ?? false;

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.navLinks}>
        <Link to="/mobile/boloes-mobile" className={styles.itemLink}>
          BOLÕES
        </Link>

        <Link to="./classificacao-mobile" className={styles.itemLink} style={{
          backgroundColor: isActive("classificacao") ? "rgb(5, 98, 39)" : "transparent",
        }}>
          CLASSIFICAÇÃO
        </Link>

        {usuarioLogadoPalpiteHabilitado && (
          <Link
            to={"./palpite-mobile"}
            className={styles.itemLink}
            style={{
              backgroundColor: isActive("palpite") ? "rgb(5, 98, 39)" : "transparent",
            }}
          >
            PALPITE
          </Link>
        )}
      </div>
    </div>
  );
}