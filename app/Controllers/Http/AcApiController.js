"use strict";

const axios = require("axios");
const Config = use("Config");

class AcApi {
  async firstStep({ request, response }) {
    // let data = request.all();

    let url = Config.get("app.activecampaign.endpoint");

    let random = Math.floor(Math.random() * 10000);

    let query = {
      contac,
    };

    let query = {
      contacts: [
        {
          email: `${random}@gmail.com`,
          firstName: `${random}`,
          lastName: "Static Test",
          phone: `9999${random}`,
        },
        {
          email: `${random}@outlook.com`,
          firstName: `${random}`,
          lastName: "Static Test",
          phone: `9999${random}`,
        },
      ],
      meta: {
        total: "2",
      },
    };

    let config = {
      headers: {
        "Api-Token": Config.get("app.activecampaign.token"),
      },
    };

    try {
      let res = await axios
        .post(`${url}/contacts`, query, config)
        .then((res) => {
          if (res.data && res.data.data) {
            let temp;
            temp = [res.data, { id: lead.id }];

            return response.send(temp);
          }
          console.log(`Status: ${res.status} - ${res.statusText} | `);
          console.log("RES.DATA: " + res.data.data);
          console.log("RES.HEADERS: " + { headers });
          console.log("RES.CONFIG: " + response.config);
          console.log("[ActiveCampaign] Contact created!");
        })
        .catch((err) => {
          console.error("[ActiveCampaign] Something is wrong! Read response.");
          // let temp = [{ nao: "funcionou" }, { id: 10 }];
          // Response dinâmica? O que esperar dela?
          return response.send(err);
        });
    } catch (e) {
      console.log(e);
      return response.send(e);
    }
  }

  async secondStep({ request, response }) {}

  async deleteCustomField({ request, response }) {
    let data = request.all();

    const url = `${Config.get("app.activecampaign.endpoint")}/fields/${
      data.fieldId
    }`;
    const options = {
      headers: {
        Accept: "application/json",
        "Api-Token": Config.get("app.activecampaign.token"),
      },
    };

    try {
      let res = await axios
        .delete(url, options)
        .then((res) => {
          if (res.data && res.data.data) {
            let temp;
            temp = [res.data.data, { id: lead.id }];

            return response.send(temp);
          }
          console.log("[ActiveCampaign] Field deleted");
        })
        .catch((err) => console.error("error:" + err));
    } catch (e) {
      console.log(e);
      return response.send(e);
    }
  }
}

module.exports = AcApi;
