import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";
import OwnerRigester from "./Auth/OwnerRigester";
import Packages from "./Admin/Packages";
import PackageDetails from "./Component/PackageDetails";
import Requist from "./Admin/Requist";
import RequestDetails from "./Component/RequistDetails";
import Owner from "./Admin/Owner";

function App() {
  return (
    <Routes>
      <Route path="register" element={<Auth />} />
      <Route path="ownerrigester" element={<OwnerRigester />} />

      {/* Admin */}
      <Route>
        <Route path="Admin/dashbord" element={<DashBourd />}>
          <Route path="requist" element={<Requist />} />
          <Route path="packages" element={<Packages />} />
          <Route path="owners" element={<Owner />} />
        </Route>
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/request/:id" element={<RequestDetails/>} />
      </Route>
    </Routes>
  );
}

export default App;
