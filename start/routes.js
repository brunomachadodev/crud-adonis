"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.resource("clientes", "ClienteController").apiOnly;

// Route.on("/").render("welcome");

Route.get("/", () => "Hello, Bruno");

Route.post("/ac", "AcController.yoogaApi");

Route.post("/teste", "TesteController.ac");
