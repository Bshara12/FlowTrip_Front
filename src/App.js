import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";
import OwnerRigester from "./Auth/OwnerRigester";
import Packages from "./Admin/Packages";
import PackageDetails from "./Component/PackageDetails";
import Requist from "./Admin/Requist";
import RequestDetails from "./Component/RequistDetails";
// <<<<<<< HEAD
import Owner from "./Admin/Owner";
// =======
import PackageElementDetails from "./Component/PackageElementDetails";
import Category from "./Admin/Category";
import Activity from "./Admin/Activity";
// >>>>>>> b92a6a1b9a83b2cffb53690aad610e7498c1da91

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
          <Route path="catigory" element={<Category/>}/>
          <Route path="activity" element={<Activity/>}/>
        </Route>
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/request/:id" element={<RequestDetails/>} />
        <Route path="/element-details" element={<PackageElementDetails/>} />

      </Route>
    </Routes>
  );
}

export default App;
