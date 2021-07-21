"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LeadsSchema extends Schema {
  up() {
    this.create("leads", (table) => {
      table.increments();
      table.string("nome", 80).notNullable();
      table.string("sobrenome", 255).notNullable();
      table.string("email").notNullable().unique();
      table.string("telefone").notNullable().unique();

      table.timestamps();
    });
  }

  down() {
    this.drop("leads");
  }
}

module.exports = LeadsSchema;
