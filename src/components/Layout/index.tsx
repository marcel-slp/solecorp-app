import { Outlet } from 'react-router-dom'
import * as styles from './styles.css'
import HeaderTop from '../HeaderTop'
import Footer from '../Footer'

export type Props = {
    publicHeader?: boolean;
};

function Layout({ publicHeader }: Props) {
  return (
    <div className={styles.container}>
      <HeaderTop publicHeader={publicHeader} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout