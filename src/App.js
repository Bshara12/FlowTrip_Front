import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";
import OwnerRigester from "./Auth/OwnerRigester";
import Packages from "./Admin/Packages";
import PackageDetails from "./Component/PackageDetails";
import Requist from "./Admin/Requist";
import RequestDetails from "./Component/RequistDetails";
import Owner from "./Admin/Owner";
import PackageElementDetails from "./Component/PackageElementDetails";
import Category from "./Admin/Category";
// <<<<<<< HEAD
import Activity from "./Admin/Activity";
import Verification from "./Auth/Verification";
import OwnerCategoryList from "./Auth/OwnerCategoryList";
import SelectCountry from "./Auth/SelectCountry";
import CreateOwnerStep3 from "./Auth/CreateOwnerStep3";
import DashBoardVehiclyOwner from "./VehiclyOwner/DashBoardVehiclyOwner";
// >>>>>>> b92a6a1b9a83b2cffb53690aad610e7498c1da91
// =======
// >>>>>>> 178f1a121999a1d3b59a6b51b061243f57819872

function App() {
  return (
    <Routes>
      <Route path="register" element={<Auth />} />
      <Route path="ownerrigester" element={<OwnerRigester />} />
      <Route path="verification" element={<Verification/>}/>
      <Route path="/create-owner/step-1" element={<OwnerCategoryList/>}/>
      <Route path="/create-owner/step-2" element={<SelectCountry />} />
      <Route path="/create-owner/step-3" element={<CreateOwnerStep3 />} />

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
{/* <<<<<<< HEAD */}
      </Route>

      {/* Vehicly Owner */}
      <Route path="VehiclyOwner/dashboard" element={<DashBoardVehiclyOwner/>}>

{/* ======= */}
        <Route path="/owner_details/:id" element={<OwnerDetails/>} />
        <Route path="/room-details/:id" element={<RoomDetails />} />
{/* >>>>>>> 178f1a121999a1d3b59a6b51b061243f57819872 */}
      </Route>
    </Routes>
  );
}

export default App;
