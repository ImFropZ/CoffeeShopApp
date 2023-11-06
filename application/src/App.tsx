import { Routes, Route, Outlet } from "react-router-dom";
import { Dashboard, Menu, Stock, Setting, Login } from "./routes";
import Default from "./layouts/Default";
import { Authentication } from "./routes/helpers";
import Unauthentication from "./routes/helpers/Unauthentication";

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
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/stock" element={<Stock />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
        </Route>
      </Route>
      <Route path="/" element={<Unauthentication />}>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
