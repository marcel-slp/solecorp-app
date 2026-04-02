// import { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";

// export default function ProtectedRoute() {
//   const navigate = useNavigate();
//   const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");
//   const isLoggedIn = auth.user && Date.now() < auth.expiresAt;

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login');
//     }
//   }, [isLoggedIn, navigate]);

//   return isLoggedIn ? <Outlet /> : null;
// }

import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth") ?? "{}");

  const isLoggedIn =
    auth?.userId && auth?.expiresAt && Date.now() < auth.expiresAt;

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