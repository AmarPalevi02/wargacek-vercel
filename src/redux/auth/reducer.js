import Cookies from "js-cookie";
import {
   USER_LOGIN,
   USER_LOGOUT
} from "./constans";


let initialState = Cookies.get('auth')
   ? JSON.parse(Cookies.get('auth'))
   : { token: null, username: null, email: null, role: null, id: null }


export default function reducer(state = initialState, action) {
   switch (action.type) {
      case USER_LOGIN:
         return {
            token: action.token,
            username: action.username,
            email: action.email,
            role: action.role,
            id: action.id
         }
      case USER_LOGOUT:
         return { ...state, token: null, username: '', email: '', role: '', id: '' }
      default:
         return state
   }
}