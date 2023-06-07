/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const server = "https://equran.id/api/v2/";

const quran: AxiosInstance = axios.create({
  baseURL: server,
});

const requestInterceptor: any = (config: AxiosRequestConfig) => {
  config.headers = {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    // Authorization: "Bearer " + tokenData,
    // lang: lang,
  };
  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

quran.interceptors.request.use(requestInterceptor);
quran.interceptors.response.use(responseInterceptor);

export default quran;
