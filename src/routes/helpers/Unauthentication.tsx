import { Navigate, Outlet } from "react-router-dom";

function Unauthentication() {
  const isLogin = true;
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
}

export default Unauthentication;
