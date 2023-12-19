import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Menu, Stock, Login, ForgotPassword, VerifyCode } from "./routes";
import { Authentication } from "./routes/helpers";
import { Default, SettingLayout } from "./layouts";
import {
  ProfileSetting,
  ManageUserSetting,
  ManageCustomerSetting,
  GeneralSetting,
} from "./routes/settings";
import { InvoiceReport, StockReport } from "./routes/reports";
import { useEffect } from "react";
import {
  initCustomers,
  initStocks,
  initUser,
  loadFromLocalStorage,
} from "./redux";
import { useAppDispatch } from "./hooks/redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initUser()).then(() => {
      dispatch(initStocks());
      dispatch(initCustomers());
      dispatch(loadFromLocalStorage());
      navigate(-1);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Authentication />}>
        <Route
          path="/"
          element={
            <Default>
              <Outlet />
            </Default>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/report" element={<Outlet />}>
            <Route path="/report/invoice" element={<InvoiceReport />} />
            <Route path="/report/stock" element={<StockReport />} />
          </Route>
          <Route
            path="/setting"
            element={
              <SettingLayout>
                <Outlet />
              </SettingLayout>
            }
          >
            <Route path="/setting" element={<GeneralSetting />} />
            <Route path="/setting/profile" element={<ProfileSetting />} />
            <Route
              path="/setting/manage-user"
              element={<ManageUserSetting />}
            />
            <Route
              path="/setting/manage-customer"
              element={<ManageCustomerSetting />}
            />

            <Route path="/setting/*" element={<Navigate to="/setting" />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
    </Routes>
  );
}

export default App;
