import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Dashboard, Menu, Stock, Login } from "./routes";
import { Authentication, Unauthentication } from "./routes/helpers";
import { Default, SettingLayout } from "./layouts";
import {
  ProfileSetting,
  ManageUserSetting,
  ManageCustomerSetting,
  ReportInvoiceSetting,
  ReportStockSetting,
  ReportLifetimeSetting,
} from "./routes/settings";

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
          <Route
            path="/setting"
            element={
              <SettingLayout>
                <Outlet />
              </SettingLayout>
            }
          >
            <Route path="/setting/profile" element={<ProfileSetting />} />
            <Route
              path="/setting/manage-user"
              element={<ManageUserSetting />}
            />
            <Route
              path="/setting/manage-customer"
              element={<ManageCustomerSetting />}
            />
            <Route
              path="/setting/report-invoice"
              element={<ReportInvoiceSetting />}
            />
            <Route
              path="/setting/report-stock"
              element={<ReportStockSetting />}
            />
            <Route
              path="/setting/report-lifetime"
              element={<ReportLifetimeSetting />}
            />
            <Route
              path="/setting"
              element={<Navigate to="/setting/profile" />}
            />
            <Route
              path="/setting/*"
              element={<Navigate to="/setting/profile" />}
            />
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
