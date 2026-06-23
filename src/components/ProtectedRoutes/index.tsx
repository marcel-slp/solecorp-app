import { Navigate, Outlet, useLocation } from "react-router-dom";
import ManutencaoPage from "../../pages/Erros/ManutencaoPage";
import { PerfilSistema } from "../../models/PerfilSistema";

const EM_MANUTENCAO = false;

export default function ProtectedRoute() {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

  const isLoggedIn =
    auth?.userId &&
    (auth?.rememberMe || (auth?.expiresAt && Date.now() < auth.expiresAt));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (EM_MANUTENCAO && auth.nomePerfil !== PerfilSistema.ADMIN) {
    return <ManutencaoPage />;
  }

  return <Outlet />;
}
