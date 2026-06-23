//import * as styles from "./styles.css";
import ErrorPage from "../../../components/ErrorPage";
import { GiGearHammer } from "react-icons/gi";

function ManutencaoPage() {
  return (
      <ErrorPage
          titulo={'Página em Manutenção'}
          texto={'Lamentamos, mas estamos temporariamente em manutenção. Voltaremos o mais breve possível'}
          botoes={[]}
          icone={GiGearHammer}
      />
  );
}

export default ManutencaoPage;