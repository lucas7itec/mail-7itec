const ConfirmationMail = require("../jobs/ConfirmationMail");
const Queue = require("../../lib/Queue");

class MailController {
  async store(req, res) {
    const response = req.body;

    await Queue.add(ConfirmationMail.key, { response });

    return res.status(200).send("Email enviado com sucesso");
  }
}

module.exports = new MailController();
