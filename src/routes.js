const Routes = require("express").Router();

const MailController = require("./app/controllers/MailController");

Routes.post("/mail", MailController.store);

module.exports = Routes;
