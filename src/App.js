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
import Activity from "./Admin/Activity";
import SelectCountry from "./Auth/SelectCountry";
import CreateOwnerStep3 from "./Auth/CreateOwnerStep3";
import Verification from "./Auth/Verification";
import OwnerCategoryList from "./Auth/OwnerCategoryList";
import OwnerDetails from "./Admin/OwnerDetails";
// import RoomDetails from "./Admin/RoomDetails";
import Vehiclys from "./VehiclyOwner/Vehiclys";
import VehicleDetails from "./Component/VehicleDetails";
import CreateVehicle from "./VehiclyOwner/CreateVehicle";
import AddVehicleImages from "./VehiclyOwner/AddVehicleImages";
import Tourism_company_DashBoard from "./Tourism Company/Tourism_company_DashBoard";
import PackagesTourism from "./Tourism Company/Packages";
import AddPackageElement from "./Component/AddPackageElement";
import AddPackageStep1 from "./Tourism Company/AddPackageStep1";
import TourismRecords from "./Tourism Company/TourismRecords";
import PackageRecords from "./Tourism Company/PackageRecords";
import FlightSearch from "./User/FlightSearch";
import FlightDetails from "./User/FlightDetails";
import FlightsList from "./User/FlightsList";
import ChatBot from "./User/ChatBot";
import TripForm from "./User/TripForm";

import RoomDetails from "./Accommodation/RoomDetails";
import DashBoard2 from "./Accommodation/Dashboard";
import Profile from "./Accommodation/Profile";
import ShowRecords from "./Accommodation/ShowRecords";
import Offers from "./Accommodation/Offers";
import RoomsHome from "./Accommodation/RoomsHome";
import SubAdmin from "./Admin/SubAdmin";
import Users from "./Admin/Users";
import AddRoom from "./Accommodation/AddRoom";
import Advanced from "./Accommodation/Advanced";
import Plans from "./Airline/plans";
import ShowAllPlans from "./Airline/Showallplans";
import PlanDetails from "./Airline/planditels";
import EditPlane from "./Airline/editplane";
import AddPlane from "./Airline/AddPlane";
import GetEvaluation from "./Airline/GetEvaluation";
import UserDashboard from "./User/UserDashboard";
import AccommodationFilter from "./User/AccommodationFilter";
import DashBoardVehiclyOwner from "./VehiclyOwner/DashBoardVehiclyOwner";
import TripSummary from "./User/TripSummary";
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
        <Route path="ownerrigester" element={<OwnerRigester />} />
        <Route path="plans" element={<Plans />}>
          <Route path="showallplans" element={<ShowAllPlans />} />
          <Route path="showallplans/:planeId" element={<PlanDetails />} />
          <Route path="/plans/edit/:planeId" element={<EditPlane />} />
          <Route path="/plans/add" element={<AddPlane />} />
          <Route path="getevaluation" element={<GetEvaluation />} />
        </Route>
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
        {/* Accommodation */}
        <Route path="Accommodation/dashboard" element={<DashBoard2 />}>
          <Route path="profile" element={<Profile />} />
          <Route path="records" element={<ShowRecords />} />
          <Route path="rooms" element={<RoomsHome />} />
          <Route path="offers" element={<Offers />} />
          <Route path="advanced" element={<Advanced />} />
        </Route>
        <Route path="room-details/:id" element={<RoomDetails />} />
        <Route path="add-room" element={<AddRoom />} />
        <Route path="catigory" element={<Category />} />
      </Route>

{/* <<<<<<< HEAD */}
      {/* Vehicly Owner */}
      <Route path="VehiclyOwner/dashboard" element={<DashBoardVehiclyOwner />}>
        <Route path="vehiclys" element={<Vehiclys />} />
      </Route>
      <Route path="/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/create-vehicle" element={<CreateVehicle />} />
      <Route path="/vehicle/add-images/:id" element={<AddVehicleImages />} />

      {/* Tourism company */}
      <Route
        path="TourismCompany/dashboard"
        element={<Tourism_company_DashBoard />}
      >
        <Route path="packages" element={<PackagesTourism />} />
        <Route path="records" element={<TourismRecords />} />
        <Route path="records/:id" element={<PackageRecords />} />
      </Route>
      <Route path="/add-package-element/:id" element={<AddPackageElement/>}/>
      <Route path="/add-package/step1" element={<AddPackageStep1 />} />


      {/* User */}
      <Route path="/flight-search" element={<FlightSearch />} />
      <Route path="/flight-details" element={<FlightDetails />} />
      <Route path="/flights-list" element={<FlightsList />} />
      <Route path="/chatBot" element={<ChatBot/>}/>
      <Route path="/trip" element={<TripForm/>}/>
      <Route path="/summary" element={<TripSummary />} />
      {/* User */}
      <Route path="User" element={<UserDashboard />}>
        <Route path="accommodation-filter" element={<AccommodationFilter/>}/>
      </Route>

      <Route path="/package/:id" element={<PackageDetails />} />
      <Route path="/request/:id" element={<RequestDetails />} />
      {/* <Route path="/element-details" element={<PackageElementDetails />} /> */}
    </Routes>
  );
}

export default App;
