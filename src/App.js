import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";
import OwnerRigester from "./Auth/OwnerRigester";
import Packages from "./Admin/Packages";
import PackageDetails from "./Component/PackageDetails";

function App() {
  return (
    <Routes>
      <Route path="register" element={<Auth />} />
      <Route path="ownerrigester" element={<OwnerRigester />} />

      {/* Admin */}
      <Route>
        <Route path="Admin/dashbord" element={<DashBourd />}>
          <Route path="packages" element={<Packages />} />
        </Route>
         <Route path="/package/:id" element={<PackageDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
