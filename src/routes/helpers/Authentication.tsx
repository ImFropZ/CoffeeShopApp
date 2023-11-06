import { Navigate, Outlet } from "react-router-dom";

function Authentication() {
  const isLogin = true;
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default Authentication;
