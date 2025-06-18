import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";

function App() {
  return (
    <Routes>
      <Route path="register" element={<Auth/>}/>

      {/* Admin */}
      <Route>
        <Route  path="Dashboard" element={<DashBourd/>}/>
      </Route>

    </Routes>
  );
}

export default App;
