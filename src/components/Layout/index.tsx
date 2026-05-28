import { Outlet } from 'react-router-dom'
import * as styles from './styles.css'
import HeaderTop from '../HeaderTop'
import Footer from '../Footer'

export type Props = {
    modoBolao?: boolean;
    publicHeader?: boolean;
    mobile?: boolean;
};

function Layout({ modoBolao, publicHeader, mobile }: Props) {
  return (
    <div className={styles.container}>
      <HeaderTop modoBolao={modoBolao} publicHeader={publicHeader} mobile={mobile}/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer modoBolao={modoBolao}/>
    </div>
  )
}

export default Layout