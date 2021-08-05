"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NewleadsSchema extends Schema {
  up() {
    this.create("newleads", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("phone", 255).notNullable();
      table.string("lead_step", 255);
      table.string("company", 255);
      table.string("negocio", 255);
      table.string("como_vendas", 255);
      table.string("emite", 255);
      table.string("vendas_dia", 255);
      table.string("faturamento_mensal", 255);
      table.string("tipo_teste", 255);
      table.timestamps();
    });
  }

  down() {
    this.drop("newleads");
  }
}

module.exports = NewleadsSchema;
