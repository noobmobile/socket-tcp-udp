const udp = require("dgram");

const moedas = {
  EURO: 5.36,
  DOLAR: 4.94,
  LIBRA: 6.26,
  IENE: 0.033,
};

const server = udp.createSocket("udp4");

server.on("message", (data, info) => {
  const strData = data.toString();
  console.log(`Recebido: ${strData}`);

  const command = strData.split(",");
  const moeda = command[0].toUpperCase();
  const valor = parseFloat(command[1]);
  if (isNaN(valor)) {
    server.send("Valor inválido", info.port, info.address);
    return;
  }
  if (!moedas[moeda]) {
    server.send(
      `Moeda não encontrada. Moedas disponíveis: ${Object.keys(moedas).join(
        ", "
      )}`,
      info.port,
      info.address
    );
    return;
  }

  const result = valor / moedas[moeda];
  server.send(
    `${valor} reais está valendo ${result.toFixed(2)} ${moeda.toLowerCase()}s`,
    info.port,
    info.address
  );
});

server.on("close", function () {});

server.on("error", function () {});

server.bind(6000, () => {
  console.log(`Servidor UDP rodando na porta: 6000`);
});
