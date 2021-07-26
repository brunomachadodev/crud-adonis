"use strict";

const axios = require("axios");
const Config = use("Config");

class AcApi {
  async createContact({ request, response }) {
    // let data = request.all();
    // console.log(data);

    let url = Config.get("app.activecampaign.endpoint");

    let query = {
      contact: {
        email: "data.email",
        firstName: "data.name",
        lastName: "data.last_name",
        phone: "data.phone",
        fieldValues: [
          {
            field: "3",
            value: "Option 4",
          },
          {
            field: "4",
            value: "Option 3",
          },
          {
            field: "5",
            value: "Option 2",
          },
        ],
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
            temp = [res.data.data, { id: lead.id }];

            return response.send(temp);
          }
          console.log("[ActiveCampaign] Contact created!");
        })
        .catch((err) => {
          console.error(err);
          let temp = [{ nao: "funcionou" }, { id: 10 }];
          return response.send(temp);
        });
    } catch (e) {
      console.log(e);
      ///temp = [{ erro: "a" }, { id: 10 }];
      return response.send(e);
      //return response.send(temp);
    }
  }
}

module.exports = AcApi;
