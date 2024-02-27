const udp = require("dgram");
const readline = require("readline");

const client = udp.createSocket("udp4");

client.on("message", (data) => {
  console.log(`Resultado: ${data.toString()}`);
  console.log();
  perguntar();
});

client.on("error", (error) => {});

client.on("close", () => {});

const question = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar() {
  question.question("Digite o valor em reais a ser convertido: ", (valor) => {
    question.question("Digite a moeda a ser convertida: ", (moeda) => {
      client.send(`${moeda},${valor}`, 6000, "127.0.0.1");
    });
  });
}

perguntar();
