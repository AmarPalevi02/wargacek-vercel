import { HIDE_ALERT, SHOW_ALERT } from "./constans";

export const showAlert = (message, type,  onConfirm = null) => ({
   type: SHOW_ALERT,
   payload: { message, type, onConfirm }
});

export const hideAlert = () => ({ type: HIDE_ALERT });