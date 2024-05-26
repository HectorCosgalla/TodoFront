import { Notify } from "quasar";

import { api } from "../axios";

const CoreServices = (function () {
  function post(data) {
    api
      .post("/new", data)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        Notify.create({
          message: "Something went wrong!",
          icon: "warning",
          color: "negative",
          position: "bottom-left",
          timeout: 3000,
        });
      });
  }

  return {
    post: post,
  };
})();

export default CoreServices;
