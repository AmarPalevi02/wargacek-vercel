import {
   USER_LOGIN,
   USER_LOGOUT
} from "./constans";
import Cookies from "js-cookie";

export const userLogin = (token, username, email, role, id) => {
   return {
      type: USER_LOGIN,
      token,
      username,
      email,
      role,
      id
   }
}

export const userLogout = () => {
   Cookies.remove("auth")
   localStorage.clear()

   return {
      type: USER_LOGOUT
   }
}