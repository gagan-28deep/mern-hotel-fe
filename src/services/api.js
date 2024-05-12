import axios from "axios";
import createSecureAxiosClient from "./SecuredAxiosInstanceProvider";
import { defaultSecuredAxios } from "./DefaultSecuredAxiosInstance";

export const url = String(import.meta.env.VITE_BACKEND_URL);

const securedAxiosInstance = createSecureAxiosClient(url);