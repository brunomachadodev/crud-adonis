"use strict";

// Exemplo de integração com API V1 ActiveCampaign

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

    let account = {
      email: `${data.email}`,
      first_name: `${data.name}`,
      last_name: `${data.last_name}`,
      phone: `${data.phone}`,
    };

    var list_add = ac.api("contact/add", account);
    list_add.then(
      function (result) {
        // successful request
        console.log("Deu certo! ", result);
      },
      function (result) {
        console.log("Falha no processo! ", result);
        // request error
      }
    );
  }
}

module.exports = AcController;
