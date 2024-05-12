import createSecureAxiosClient from "./SecuredAxiosInstanceProvider";

export const url = String(import.meta.env.VITE_BACKEND_URL);
export const defaultSecuredAxios = createSecureAxiosClient(url);
