"use strict";

const axios = require("axios");
const Config = use("Config");
const Yoogalead = use("App/Models/Yoogalead");

const config = {
  headers: {
    "Api-Token": Config.get("app.activecampaign.token"),
  },
};

const url = Config.get("app.activecampaign.endpoint");

class AcApi {
  async firstStep({ request, response }) {
    let data = request.all();

    let lead = new Yoogalead();
    lead.name = data.name;
    lead.email = data.email;
    lead.phone = data.phone;

    let random = Math.floor(Math.random() * 10000);

    // let query = {
    //   contacts: [
    //     {
    //       email: `${random}@gmail.com`,
    //       email: `${data.email}`,
    //       firstName: `${random}`,
    //       firstName:`${data.name}`,
    //       lastName: "Static Test",
    //       phone: `9999${random}`,
    //       phone: `${data.phone}`
    //     },
    //     {
    //       email: `${random}@outlook.com`,
    //       firstName: `${random}`,
    //       lastName: "Static Test",
    //       phone: `9999${random}`,
    //     },
    //   ],
    //   meta: {
    //     total: "2",
    //   },
    // };

    let queryContacts = {
      contacts: {
        email: `${data.email}`,
        firstName: `${data.name}`,
        phone: `${data.phone}`,
      },
    };

    let queryList = {
      contactList: {
        list: 2,
        contact: 1,
        status: 1,
      },
    };

    // Contact Create
    try {
      let res = await axios
        .post(`${url}/contacts`, queryContacts, config)
        .then((res) => {
          let contactId = res.data.contact.id;

          // console.log(`Status: ${res.status} - ${res.statusText} | `);
          // console.log("RES.DATA: " + res.data.data);
          // console.log("RES.HEADERS: " + { headers });
          // console.log("RES.CONFIG: " + response.config);
          console.log("[ActiveCampaign] Contact created! Id: " + contactId);

          axios
            .post(`${url}/contactLists`)
            .then()
            .catch((err) => {
              console.error("[ActiveCampaign] Create Contact failed! " + err);
            });
        })
        .catch((err) => {
          console.error("[ActiveCampaign] Create Contact failed! " + err);
          return response.send(err);
        });
    } catch (e) {
      console.error(e);
      return response.send(e);
    }
  }

  async secondStep({ request, response }) {
    // let url = Config.get("app.activecampaign.endpoint");

    let data = request.all();

    // Consulta no DB (pelo id que vem do pipefy)
    // let lead = await Lead.query().where("id", data.db_id).firstOrFail();

    let queryAccount = {
      account: {
        name: `${data.company}`,
      },
    };

    let contactEmail = "alice@bol.com";

    try {
      // Consult Contact by [email] filter and return
      let res = await axios
        .get(`${url}/contacts?filters[email]=${contactEmail}`, config)
        .then((res) => {
          let contactId = res.data.contacts[0].id;
          console.log("[Get Contact Id] Contact Id: " + contactId);

          // Create Account
          axios
            .post(`${url}/accounts`, queryAccount, config)
            .then((res) => {
              let accountId = res.data.account.id;
              console.log("[Create Account] Account Id: " + accountId);

              // Contact - Account association
              let queryAssociation = {
                accountContact: {
                  contact: `${contactId}`,
                  account: `${accountId}`,
                },
              };

              axios
                .post(`${url}/accountContacts`, queryAssociation, config)
                .then()
                .catch((err) => {
                  console.error(
                    "[ActiveCampaign] Account Association failed! " + err
                  );
                });
            })
            .catch((err) => {
              console.error("[ActiveCampaign] Create Account failed! " + err);
            });
        })
        .catch((err) => {
          console.error("[ActiveCampaign] Consult Contact failed! " + err);
        });
    } catch (e) {
      console.error(e);
      return response.send(e);
    }
  }

  async thirdStep({ request, response }) {
    let data = request.all();

    let queryCustomField = {
      contact: {
        fieldValues: [
          {
            field: "3",
            value: "50 a 100",
          },
          {
            field: "4",
            value: "Até R$ 5.000",
          },
          {
            field: "5",
            value: "Não",
          },
        ],
      },
    };

    try {
      let res = await axios
        .get(`${url}/contacts?filters[email]=${contactEmail}`, config)
        .then((res) => {
          let contactId = res.data.contacts[0].id;
          console.log("[Get Contact Id] Contact Id: " + contactId);

          axios.put(`${url}/contacts/${contactId}`);
        })
        .catch((err) => {
          console.error("[ActiveCampaign] Consult Contact failed! " + err);
        });
    } catch (e) {
      console.error(e);
      return response.send(e);
    }
  }

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
      console.error(e);
      return response.send(e);
    }
  }
}

module.exports = AcApi;
