import { Routes, Route } from "react-router-dom";
import { Dashboard, Menu, Stock, Setting } from "./routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/menu" element={<Menu />}></Route>
      <Route path="/stock" element={<Stock />}></Route>
      <Route path="/setting" element={<Setting />}></Route>
    </Routes>
  );
}

export default App;
