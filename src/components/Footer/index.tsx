import { Image } from "@chakra-ui/icons";
import logoSolecorp from "@/assets/images/logosolecorp-2.jpg";
import * as styles from './styles.css';

export type FooterProps = {
    modoBolao?: boolean;
};

function Footer ({modoBolao}: FooterProps) {
  return (
    <div className={styles.footer}>
      <Image src={logoSolecorp} boxSize='30' alt="Logo" />

      <div className={styles.footerText}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          {modoBolao ? "Bolão Control" : "SoleCorp Sports Manager"}
        </div>
        <div style={{ fontSize: "10px" }}>
          Sistema Gerenciador de Competições Esportivas
        </div>
        <div style={{ fontSize: "10px" }}>
          Patente BR RS 10504-6 - Marca Registrada
        </div>
      </div>
    </div>
  );
};

export default Footer;
