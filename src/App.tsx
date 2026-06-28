import { HashRouter } from 'react-router-dom'
import { Router } from './routes'
import AppInitializer from './components/AppInitializer'

function App() {
  return (
    <HashRouter>
      <AppInitializer />
      <Router />
    </HashRouter>
  )
}

export default App
