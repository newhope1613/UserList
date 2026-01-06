import EditUser from "../pages/EditUser/EditUser";
import ListOfUser from "../pages/ListOfUser/ListOfUser";
import { EDIT_USER, USERS } from "./consts";

export const publickRoutes = [
  {
    path: USERS,
    Component: ListOfUser,
  },
  {
    path: EDIT_USER,
    Component: EditUser,
  },
];
