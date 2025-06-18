import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";
import OwnerRigester from "./Auth/OwnerRigester";

function App() {
  return (
    <Routes>
      <Route path="register" element={<Auth/>}/>
      <Route path="ownerrigester" element={<OwnerRigester/>}/>

      {/* Admin */}
      <Route>
        <Route  path="Dashboard" element={<DashBourd/>}/>
      </Route>

    </Routes>
  );
}

export default App;
