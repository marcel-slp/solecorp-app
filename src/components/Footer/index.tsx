import { Image } from "@chakra-ui/icons";
import logoSolecorp from "@/assets/images/logosolecorp-2.jpg";
import * as styles from './styles.css';

export type FooterProps = {
    modoBolao?: boolean;
    mobile?: boolean;
};

function Footer ({ modoBolao, mobile=false }: FooterProps) {
  return (
    <>
    {!mobile && (
      <div className={styles.footer}>
      <Image src={logoSolecorp} boxSize='30' alt="Logo" />

      <div className={styles.footerText}
      >
        <div className={styles.footerTitle}>
          {modoBolao ? "Bolão Control" : "SoleCorp Sports Manager"}
        </div>
        <div className={styles.footerSubtitle}>
          Sistema Gerenciador de Competições Esportivas
        </div>
        <div className={styles.footerSubtitle}>
          Patente BR RS 10504-6 - Marca Registrada
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Footer;
