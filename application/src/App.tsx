import { Routes, Route, Outlet } from "react-router-dom";
import { Dashboard, Menu, Stock, Setting } from "./routes";
import Default from "./layouts/Default";

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
