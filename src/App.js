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
import DashBoard2 from "./Accommodation/Dashboard";
import Profile from "./Accommodation/Profile";
import ShowRecords from "./Accommodation/ShowRecords";
import Offers from "./Accommodation/Offers";
import RoomsHome from "./Accommodation/RoomsHome";
import SubAdmin from "./Admin/SubAdmin";
import Users from "./Admin/Users";
import AddRoom from "./Accommodation/AddRoom";

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
          <Route path="subadmin" element={<SubAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="catigory" element={<Category />} />
          <Route path="activity" element={<Activity />} />
        </Route>
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/request/:id" element={<RequestDetails />} />
        <Route path="/element-details" element={<PackageElementDetails />} />
        <Route path="/owner_details/:id" element={<OwnerDetails />} />
      </Route>

      <Route path="Accommodation/dashboard" element={<DashBoard2 />}>
      <Route path="profile" element={<Profile/>}/>
      <Route path="records" element={<ShowRecords/>}/>
      <Route path="rooms" element={<RoomsHome/>}/>
      <Route path="offers" element={<Offers/>}/>
      </Route>


        <Route path="room-details/:id" element={<RoomDetails />} />
        <Route path="add-room" element={<AddRoom />} />
    
    
    </Routes>
  );
}

export default App;
