"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Yoogalead extends Model {
  static get table() {
    return "yoogaleads";
  }

  static get primaryKey() {
    return "id";
  }
}

module.exports = Yoogalead;
