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
        <Route path="/owner_details/:id" element={<OwnerDetails/>} />
        <Route path="/room-details/:id" element={<RoomDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
