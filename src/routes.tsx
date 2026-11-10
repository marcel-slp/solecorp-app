import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { Home } from './pages/Home'
import Participantes from './pages/Participantes'
import Resumo from './pages/EventoPage/Resumo'
import Tabela from './pages/EventoPage/Tabela'
import Classificacao from './pages/EventoPage/Classificacao'
import Estatistica from './pages/EventoPage/Estatistica'
import Grafico from './pages/EventoPage/Grafico'
import { EventoPage } from './pages/EventoPage'
import EventosLista from './pages/EventosLista'
import { Inicio } from './pages/EventoPage/Inicio'
import ProtectedRoute from './components/ProtectedRoutes'
import { Login } from './pages/Login'
import { AlterarSenha } from './pages/AlterarSenha'
import EntidadesLista from './pages/EntidadesLista'
import GerenciarPerfil from './pages/GerenciarPerfil'
import GerenciarUsuarios from './pages/GerenciarUsuarios'
import { Registro } from './pages/Registro'
import NaoEncontradoPage from './pages/Erros/NaoEncontradoPage'

export function Router() {
  return (
    <Routes>
      <Route element={<Layout publicHeader />}>
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="alterar-senha" element={<AlterarSenha />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="entidades" element={<EntidadesLista />} />
          <Route path="participantes" element={<Participantes />} />
          <Route path="eventos" element={<EventosLista />} />
           <Route path="gerenciar-perfil" element={<GerenciarPerfil />} />
           <Route path="gerenciar-usuarios" element={<GerenciarUsuarios />} />
           <Route path="evento/:eventoId" element={<EventoPage />}>
             <Route path="inicio" element={<Inicio />} />
             <Route path="resumo" element={<Resumo />} />
             <Route path="tabela" element={<Tabela />} />
             <Route path="classificacao" element={<Classificacao />} />
             <Route path="estatistica" element={<Estatistica />} />
             <Route path="grafico" element={<Grafico />} />
           </Route>
        </Route>
      </Route>

      <Route path="*" element={<NaoEncontradoPage />} />
    </Routes>
  );
}