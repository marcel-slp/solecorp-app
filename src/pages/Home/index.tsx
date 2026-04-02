import { getImagemSelecoesURL } from '../../utils/Utils';
import * as styles from './styles.css'
import { Image } from "@chakra-ui/icons";

export function Home() {
   return (
       <div>
           <Image
                src={getImagemSelecoesURL('pt_fundoadministrar.jpg')}
                alt="Logo"
                className={styles.backgroundImage}
            />
       </div>
     )
}