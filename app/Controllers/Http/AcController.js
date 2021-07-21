"use strict";

const Lead = use("App/Models/Lead");
const Env = use("Env");
const ActiveCampaign = require("activecampaign");

class AcController {
  async yoogaApi({ request, response }) {
    let data = request.all();

    // Organizando o que vai ser salvo na tabela do DB
    let lead = new Lead();

    lead.nome = data.name;
    lead.sobrenome = data.last_name;
    lead.email = data.email;
    lead.telefone = data.phone;

    // Insert
    try {
      await lead.save();
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // Active Campaign
    let acAccount = "https://yoogatecnologia1626708042.api-us1.com";

    let ac = new ActiveCampaign(acAccount, Env.get("AC_API_TOKEN"));
    ac.debug = true;

    //
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
      contact: {
        email: "johndoe@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "7223224241",
        fieldValues: [
          {
            field: "1",
            value: "The Value for First Field",
          },
          {
            field: "6",
            value: "2008-01-20",
          },
        ],
      },
    };
    // {
    //   account: {
    //     firstName: data.name,
    //     lastName: data.last_name,
    //     accountUrl: "google.com",
    //   },
    // };

    var list_add = ac.api("/contacts", list);
    list_add.then(
      function (result) {
        // successful request
        console.log("Connection successful");
      },
      function (result) {
        console.log("Erro: ", result);
        // request error
      }
    );
  }
}

module.exports = AcController;
