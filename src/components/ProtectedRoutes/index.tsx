import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

  const isLoggedIn =
    auth?.userId &&
    (
      auth?.rememberMe ||
      (auth?.expiresAt && Date.now() < auth.expiresAt)
    );

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}