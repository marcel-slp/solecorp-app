import * as styles from "./styles.css";
import ErrorPage from "../../../components/ErrorPage";
import { GiGearHammer } from "react-icons/gi";
import HeaderTop from "../../../components/HeaderTop";
import Footer from "../../../components/Footer";

function ManutencaoPage() {
  return (
      <div className={styles.container}>
      <HeaderTop modoBolao={true} publicHeader={true} mobile={false}/>
      <main className={styles.main}>
        <ErrorPage
          titulo={'Página em Manutenção'}
          texto={'Lamentamos, mas estamos temporariamente em manutenção. Voltaremos o mais breve possível'}
          botoes={[]}
          icone={GiGearHammer}
      />
      </main>
      <Footer modoBolao={true} mobile={false}/>
    </div>
      
  );
}

export default ManutencaoPage;