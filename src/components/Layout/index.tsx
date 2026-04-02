import { Outlet } from 'react-router-dom'
import * as styles from './styles.css'
import HeaderTop from '../HeaderTop'
import Footer from '../Footer'

export type Props = {
    modoBolao?: boolean;
    publicHeader?: boolean;
};

function Layout({ modoBolao, publicHeader }: Props) {
  return (
    <div className={styles.container}>
      <HeaderTop modoBolao={modoBolao} publicHeader={publicHeader}/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout