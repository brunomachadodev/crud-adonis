"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class YoogaleadsSchema extends Schema {
  up() {
    this.create("yoogaleads", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("phone", 255).notNullable();
      table.string("company", 255).notNullable();
      table.string("negocio", 255).notNullable();
      table.string("como_vendas", 255).notNullable();
      table.string("emite", 255).notNullable();
      table.string("vendas_dia", 255).notNullable();
      table.string("faturamento_mensal", 255).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("yoogaleads");
  }
}

module.exports = YoogaleadsSchema;
