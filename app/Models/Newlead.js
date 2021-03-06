"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Newlead extends Model {
  static get table() {
    return "newlead";
  }

  static get primaryKey() {
    return "id";
  }
}

module.exports = Newlead;
