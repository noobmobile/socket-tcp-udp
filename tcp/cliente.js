const net = require("net");
const readline = require("readline");

const client = net.createConnection(5000, "127.0.0.1");

client.on("data", (data) => {
  console.log(`Resultado: ${data.toString()}`);
  console.log();
  perguntar();
});

client.on("error", (error) => {
  console.log("Error: ", error);
});

client.on("close", () => {});

const question = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar() {
  question.question("Digite o valor em reais a ser convertido: ", (valor) => {
    question.question("Digite a moeda a ser convertida: ", (moeda) => {
      client.write(`${moeda},${valor}`);
    });
  });
}

perguntar();
