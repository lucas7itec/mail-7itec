const Mail = require("../../lib/Mail");

class ConfirmationMail {
  get key() {
    return "ConfirmationMail";
  }

  async handle({ data }) {
    const {
      nome,
      email,
      subject,
      IdSolicitante,
      contato,
      psl,
      transporte,
      tipoCarro,
      rid,
      prioridade,
      checkInData,
      checkInHora,
      checkOutData,
      checkOutHora,
      origem,
      outraOrigem,
      localPartida,
      destino,
      outroDestino,
      localChegada,
      obs,
      retorno,
      passageiro
    } = data.response;
    console.log("Fila executou!");

    await Mail.sendMail({
      to: `${email}`,
      subject: `${subject}`,
      template: "confirmation",
      context: {
        IdSolicitante,
        contato,
        psl,
        transporte,
        tipoCarro,
        rid,
        prioridade,
        checkInData,
        checkInHora,
        checkOutData,
        checkOutHora,
        origem,
        outraOrigem,
        localPartida,
        destino,
        outroDestino,
        localChegada,
        obs,
        retorno,
        passageiro
      }
    });
  }
}

module.exports = new ConfirmationMail();
