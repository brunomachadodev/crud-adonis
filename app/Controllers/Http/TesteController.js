"use strict";

const Env = use("Env");
const ActiveCampaign = require("activecampaign");

class TesteController {
  async ac({ request, response }) {
    let acAccount = "https://yoogatecnologia1626708042.api-us1.com";

    let ac = new ActiveCampaign(acAccount, Env.get("AC_API_TOKEN"));
    ac.debug = true;

    ac.credentials_test().then(
      function (result) {
        // successful request
        if (result.success) {
          console.log("AC success connection");
        } else {
          console.log("AC failed connection");
        }
      },
      function (result) {
        console.log(result);
        // request error
      }
    );

    let list = {
      email: "johndoe@google.com",
      first_name: "John",
      last_name: "Doe",
      phone: "7223224241",
    };

    var list_add = ac.api("contact/add", list);
    list_add.then(
      function (result) {
        // successful request
        console.log(result);
      },
      function (result) {
        // request error
      }
    );
  }
}

module.exports = TesteController;
