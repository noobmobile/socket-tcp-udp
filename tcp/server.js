const net = require("net");

const moedas = {
  EURO: 5.36,
  DOLAR: 4.94,
  LIBRA: 6.26,
  IENE: 0.033,
};

const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  socket.on("data", (data) => {
    const strData = data.toString();
    console.log(`Recebido: ${strData}`);

    const command = strData.split(",");
    const moeda = command[0].toUpperCase();
    const valor = parseFloat(command[1]);
    if (isNaN(valor)) {
      socket.write("Valor inválido");
      return;
    }
    if (!moedas[moeda]) {
      socket.write(
        `Moeda não encontrada. Moedas disponíveis: ${Object.keys(moedas).join(
          ", "
        )}`
      );
      return;
    }

    const result = valor / moedas[moeda];
    socket.write(
      `${valor} reais está valendo ${result.toFixed(2)} ${moeda.toLowerCase()}s`
    );
  });

  socket.on("end", () => {});

  socket.on("error", (error) => {});
});

server.on("error", (error) => {});

server.listen(5000, () => {
  console.log(`Servidor TCP rodando na porta: 5000`);
});
