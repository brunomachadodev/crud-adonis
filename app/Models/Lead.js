"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Lead extends Model {
  static get table() {
    return "leads";
  }

  static get primaryKey() {
    return "id";
  }
}

module.exports = Lead;
