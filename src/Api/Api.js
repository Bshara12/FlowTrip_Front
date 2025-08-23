export const baseURL = `http://127.0.0.1:8000/api`;

//accommodationn api

export const ADD_ROOM = "AddRoom";

export const BLOCK_OWNER ="BlockOwner";

export const SHOW_OWNER ="ShowOwner";
export const SHOW_OFFERS ="ShowOffers";
export const SHOW_PROFILE ="ShowProfile";
export const SHOW_ALL_ROOMS ="ShowAllRooms";
export const SHOW_ROOM_RECORDS ="ShowRoomRecords";
export const SHOW_ACCOMMODATION_RECORDS ="ShowAccommodationRecords";

export const FILTER_NAME_ACCOMMODATIOM ="FilterNameAccommodation";


//auth api

export const WHO_AMI ="WhoAmI";
export const LOGOUT ="logout";


//admin api

export const ADD_CATIGORY ="addcatigory";
export const ADD_ACTIVITY ="addActivity";
export const CREATE_SUBADMIN="createSubAdmin";


export const SHOW_ROOM ="ShowRoom";
export const GET_ALL_UESER="getalluser";
export const GET_ALL_OWNERS ="GetAllOwners";
export const GET_ALL_PACKAGE ="getallpackage";
export const GET_ALL_REQUESTS ="GetAllRequests";
export const GET_ALL_ACTIVITY ="getAllActivity";
export const GET_ALL_SUBADMIN ="getAllSubAdmin";
export const GET_ALL_COUNTRIES ="GetAllCountries";
export const GET_ALL_OWNER_CATEGORIES ="GetAllOwnerCategories";

export const EDIT_ROOM ="EditRoom";
export const EDIT_REQUEST ="EditRequest";


export const DELETE_ROOM ="DeleteRoom";
export const REMOVE_SUBADMIN="removeSubAdmin";
export const DELETE_ACTIVITY ="deleteactivity";


export const FILTER_USERS="filterusers";
export const FILTER_SUBADMINS="filterSubAdmins";
export const ADMIN_SEARCH ="AdminSearch";

//airplane api

export const ADD_PLANE ="AddPlane";


export const GET_ALL_PLANES="GetAllPlanes";
export const GET_SINGLE_PLANE="GetSinglePlane";

export const EDIT_PLANE="EditPlane";

export const DELETE_PLANE="DeletePlane";

//vehiclyowner api

export const GET_ALL_PICTURE="getAllPicture";
export const GET_ALL_CAR_TYPES="GetAllCarTypes";
export const GET_ALL_VICLYFORUSER="getAllViclyForuser";
export const GET_ALL_ACCOMMODATION_TYPES="GetAllAccommodationTypes";

export const VEHICLE_OWNER="vehicleowner";


export const CREATE_VEHICLE="createVehicle";
export const CREATE_PICTURE_CAR="createPictureCar";

//component api

export const GET_PACKAGE="getPackage";
export const GET_VEHICLE_BYID="getVehicleById";

export const SHOW_REQUEST="ShowRequest";
export const ACCEPT_REQUEST="AcceptRequest";

export const DELETE_REQUEST="DeleteRequest";
export const DELETE_VEHICLY="deleteVehicly";
export const DELETE_PICTURE_CAR="deletePictureCar";

export const EDIT_VEHICLE="editVehicle";


//token
// User
// woYFIF0Vopo8MKTqDcQXw6C2vI2XBPke23dmVZ3sf6e6812e
// Admin
// rNQFdc49Ke2LQdhqxSipfH4X6PAfcrL9a8aTII6eecd56c35
// export const TOKEN = "woYFIF0Vopo8MKTqDcQXw6C2vI2XBPke23dmVZ3sf6e6812e";
export const TOKEN = localStorage.getItem("token");