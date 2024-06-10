import axios from "axios";
import { boot } from "quasar/wrappers";
import baseUrl from "./URLs/BaseUrl";

const api = axios.create({
  baseURL: baseUrl,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { axios, api };
