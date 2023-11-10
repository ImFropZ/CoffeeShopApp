import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Dashboard, Menu, Stock, Login } from "./routes";
import { Authentication, Unauthentication } from "./routes/helpers";
import { Default, SettingLayout } from "./layouts";
import {
  ProfileSetting,
  ManageUserSetting,
  ManageCustomerSetting,
  GeneralSetting,
} from "./routes/settings";
import { InvoiceReport, StockReport } from "./routes/reports";

function App() {
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
      <Route path="/" element={<Unauthentication />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
