import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import DashBourd from "./Admin/DashBourd";
import Packages from "./Admin/Packages";
import PackageDetails from "./Component/PackageDetails";
import Requist from "./Admin/Requist";
import RequestDetails from "./Component/RequistDetails";
import Owner from "./Admin/Owner";
import PackageElementDetails from "./Component/PackageElementDetails";
import Category from "./Admin/Category";
import Activity from "./Admin/Activity";
import SelectCountry from "./Auth/SelectCountry";
import CreateOwnerStep3 from "./Auth/CreateOwnerStep3";
import DashBoardVehiclyOwner from "./VehiclyOwner/DashBoardVehiclyOwner";
import Verification from "./Auth/Verification";
import OwnerCategoryList from "./Auth/OwnerCategoryList";
import OwnerDetails from "./Admin/OwnerDetails";
import RoomDetails from "./Admin/RoomDetails";
import Vehiclys from "./VehiclyOwner/Vehiclys";
import VehicleDetails from "./Component/VehicleDetails";
import CreateVehicle from "./VehiclyOwner/CreateVehicle";
import AddVehicleImages from "./VehiclyOwner/AddVehicleImages";

function App() {
  return (
    <Routes>
      <Route path="register" element={<Auth />} />
      <Route path="verification" element={<Verification />} />
      <Route path="/create-owner/step-1" element={<OwnerCategoryList />} />
      <Route path="/create-owner/step-2" element={<SelectCountry />} />
      <Route path="/create-owner/step-3" element={<CreateOwnerStep3 />} />

      {/* Admin */}
      <Route>
        <Route path="Admin/dashbord" element={<DashBourd />}>
          <Route path="requist" element={<Requist />} />
          <Route path="packages" element={<Packages />} />
          <Route path="owners" element={<Owner />} />
          <Route path="catigory" element={<Category />} />
          <Route path="activity" element={<Activity />} />
        </Route>
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/request/:id" element={<RequestDetails />} />
        <Route path="/element-details" element={<PackageElementDetails />} />
        <Route path="/owner_details/:id" element={<OwnerDetails />} />
        <Route path="/room-details/:id" element={<RoomDetails />} />
      </Route>

      {/* Vehicly Owner */}
      <Route path="VehiclyOwner/dashboard" element={<DashBoardVehiclyOwner />}>
        <Route path="vehiclys" element={<Vehiclys/>} />
      </Route>
      <Route path="/vehicle/:id" element={<VehicleDetails/>}/>
      <Route path="/create-vehicle" element={<CreateVehicle/>}/>
      <Route path="/vehicle/add-images/:id" element={<AddVehicleImages />} />
    </Routes>
  );
}

export default App;
