import store from "./store";
import Cookies from "js-cookie";

let currentAuth;

function listener() {
   let previousAuth = currentAuth

   currentAuth = store.getState().auth;

   if (currentAuth !== previousAuth) {
      // Cookies.set("token", currentAuth.token || "", { expires: 7 / 24 });
      // Cookies.set("username", currentAuth.username || "", { expires: 7 / 24 });
      // Cookies.set("email", currentAuth.email || "", { expires: 7 / 24 });
      // Cookies.set("role", currentAuth.role || "", { expires: 7 / 24 });

      // Cookies.set("token", currentAuth.token || "", { expires: 2 / 1440 });
      // Cookies.set("username", currentAuth.username || "", { expires: 2 / 1440 });
      // Cookies.set("email", currentAuth.email || "", { expires: 2 / 1440 });
      // Cookies.set("role", currentAuth.role || "", { expires: 2 / 1440 });
      // Cookies.set("id", currentAuth.id || "", { expires: 2 / 1440 });
      Cookies.set(
         "auth",
         JSON.stringify({
            token: currentAuth.token || "",
            username: currentAuth.username || "",
            email: currentAuth.email || "",
            role: currentAuth.role || "",
            id: currentAuth.id || "",
         }),
         { expires: 7 / 24 } // 2 menit
      );

   } else {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("email");
      Cookies.remove("role");
      Cookies.remove("id");
   }
}

function listen() {
   store.subscribe(listener)
}

export { listen }