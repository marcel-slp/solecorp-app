import { Navigate, Outlet, useLocation } from "react-router-dom";
import ManutencaoPage from "../../pages/Erros/ManutencaoPage";
import { PerfilSistema } from "../../models/PerfilSistema";
import { configuracoesStore } from "../../stores/configuracoesStore";

export default function ProtectedRoute() {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

  const isLoggedIn =
    auth?.userId &&
    (auth?.rememberMe || (auth?.expiresAt && Date.now() < auth.expiresAt));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const emManutencao =
    configuracoesStore((state) => state.configuracoes["modo_manutencao"]) === 1;

  if (emManutencao && auth.nomePerfil !== PerfilSistema.ADMIN) {
    return <ManutencaoPage />;
  }

  return <Outlet />;
}
