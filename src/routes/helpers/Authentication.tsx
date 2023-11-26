import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet } from "react-router-dom";

function Authentication() {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default Authentication;
