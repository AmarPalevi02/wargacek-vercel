import axios from "axios";
import Cookies from "js-cookie";
import handleError from "./handeleError";

import { configs } from "../configs/config";

axios.defaults.withCredentials = true;

export const getDatas = async (resource, params) => {
   try {
      const { token } = Cookies.get('auth')
         ? JSON.parse(Cookies.get('auth'))
         : {};

      const response = await axios.get(`${configs.base_url_dev}${configs.version}/${resource}`, {
         params,
         headers: {
            Authorization: `Bearer ${token}`
         },
          withCredentials: true,
          credentials: "include"
      })

      return response

   } catch (error) {
      return handleError(error)
   }
}

export const postData = async (payload, formData, resource) => {
   try {
      const { token } = Cookies.get('auth')
         ? JSON.parse(Cookies.get('auth'))
         : {};

      const response = await axios.post(
         `${configs.base_url_dev}${configs.version}/${resource}`,
         payload,
         {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': formData ? 'multipart/form-data' : 'application/json',
            },
            withCredentials: true
         }
      );

      return response;
   } catch (error) {
      return handleError(error)
   }
};


export const deleteData = async (resource) => {
   try {
      const { token } = Cookies.get("auth")
         ? JSON.parse(Cookies.get("auth"))
         : {};

      const response = await axios.delete(
         `${configs.base_url_dev}${configs.version}/${resource}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            withCredentials: true,
         }
      );

      return response;
   } catch (error) {
      return handleError(error);
   }
};
