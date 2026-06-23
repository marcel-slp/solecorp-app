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
import BolaoLista from './pages/BolaoLista'
import TabelaOriginalCopa2026 from './pages/TabelaOriginalCopa2026'
import PalpiteCopa2026 from './pages/BolaoPage/PalpiteCopa2026'
import { BolaoPage } from './pages/BolaoPage'
import { InicioBolao } from './pages/BolaoPage/Inicio'
import BolaoClassificacao from './pages/BolaoPage/BolaoClassificacao'
import BolaoCriteriosPontuacao from './pages/BolaoPage/BolaoCriteriosPontuacao'
import BolaoConvite from './pages/BolaoConvite'
import GerenciarPerfil from './pages/GerenciarPerfil'
import GerenciarUsuarios from './pages/GerenciarUsuarios'
import { Registro } from './pages/Registro'
import BolaoRateioPremiacoes from './pages/BolaoPage/BolaoRateioPremiacoes'
import GerenciarBoloesAdmin from './pages/GerenciarBoloesAdmin'
import GerenciarJogadores from './pages/GerenciarJogadores'
import GerenciarSelecoes from './pages/GerenciarSelecoes'
import GerenciarPremiosIndividuais from './pages/GerenciarPremiosIndividuais'
import NaoEncontradoPage from './pages/Erros/NaoEncontradoPage'
import EscolherDispositivo from './pages/Mobile/EscolherDispositivo'
import BolaoListaMobile from './pages/Mobile/BolaoListaMobile'
import PalpiteCopa2026Mobile from './pages/Mobile/PalpiteCopa2026Mobile'
import { BolaoPageMobile } from './pages/Mobile/BolaoPageMobile'
import BolaoClassificacaoMobile from './pages/Mobile/BolaoClassificacaoMobile'

const modoBolao = true;

export function Router() {
  return (
    <Routes>
      <Route element={<Layout publicHeader />}>
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="alterar-senha" element={<AlterarSenha />} />
        <Route path="convite/bolao/:bolaoId" element={<BolaoConvite />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout modoBolao={modoBolao} />}>
          <Route path="escolher-dispositivo" element={<EscolherDispositivo />} />
          <Route path="home" element={<Home />} />
          <Route path="entidades" element={<EntidadesLista />} />
          <Route path="participantes" element={<Participantes />} />
          <Route path="eventos" element={<EventosLista />} />
          <Route path="inserir-placares-copa-2026" element={<TabelaOriginalCopa2026 />} />
           <Route path="gerenciar-perfil" element={<GerenciarPerfil />} />
           <Route path="gerenciar-usuarios" element={<GerenciarUsuarios />} />
           <Route path="gerenciar-boloes" element={<GerenciarBoloesAdmin />} />
           <Route path="gerenciar-jogadores" element={<GerenciarJogadores />} />
           <Route path="gerenciar-selecoes" element={<GerenciarSelecoes />} />
           <Route path="gerenciar-premios-individuais" element={<GerenciarPremiosIndividuais />} />
           <Route path="evento/:eventoId" element={<EventoPage />}>
             <Route path="inicio" element={<Inicio />} />
             <Route path="resumo" element={<Resumo />} />
             <Route path="tabela" element={<Tabela />} />
             <Route path="classificacao" element={<Classificacao />} />
             <Route path="estatistica" element={<Estatistica />} />
             <Route path="grafico" element={<Grafico />} />
           </Route>
          <Route path="boloes" element={<BolaoLista />} />
          <Route path="bolao/:bolaoId" element={<BolaoPage />}>
            <Route path="inicio" element={<InicioBolao />} />
            <Route path="palpite" element={<PalpiteCopa2026 />} />
            <Route path="classificacao" element={<BolaoClassificacao />} />
            <Route path="rateio" element={<BolaoRateioPremiacoes />} />
            <Route path="criterios-pontuacao-copa-2026" element={<BolaoCriteriosPontuacao />} />
          </Route>
        </Route>

        <Route path="/mobile" element={<Layout modoBolao={modoBolao} mobile />}>
          <Route path="boloes-mobile" element={<BolaoListaMobile />} />
          <Route path="bolao-mobile/:bolaoId" element={<BolaoPageMobile />}>
            <Route path="palpite-mobile" element={<PalpiteCopa2026Mobile />} />
            <Route path="classificacao-mobile" element={<BolaoClassificacaoMobile />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NaoEncontradoPage />} />
    </Routes>
  );
}