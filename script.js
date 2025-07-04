
let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
const historico = document.getElementById("historico");
const saldoDisplay = document.getElementById("saldoDisplay");

function atualizarSaldo() {
  saldoDisplay.textContent = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  localStorage.setItem("saldo", saldo);
}

function adicionarHistorico(texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  historico.prepend(li);
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    atualizarSaldo();
    gerarGrafico();
  } else {
    alert("Preencha usuário e senha!");
  }
}

function depositar() {
  const valor = parseFloat(document.getElementById("valorEntrada").value);
  if (valor > 0) {
    saldo += valor;
    atualizarSaldo();
    adicionarHistorico(`Depósito de R$ ${valor.toFixed(2)}`);
  }
}

function sacar() {
  const valor = parseFloat(document.getElementById("valorSaque").value);
  if (valor > 0 && valor <= saldo) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico(`Saque de R$ ${valor.toFixed(2)}`);
  }
}

function fazerPix() {
  const chave = document.getElementById("pixChave").value;
  const valor = parseFloat(document.getElementById("valorPix").value);
  if (chave && valor > 0 && valor <= saldo) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico(`Pix de R$ ${valor.toFixed(2)} para ${chave}`);
  }
}

function investir() {
  const valor = 100;
  if (saldo >= valor) {
    saldo -= valor;
    atualizarSaldo();
    adicionarHistorico(`Investimento de R$ ${valor.toFixed(2)} em Galoins`);
  }
}

function gerarGrafico() {
  const ctx = document.getElementById("grafico").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Saldo em Galoins',
        data: [200, 400, 600, 800, 1000, 1200, saldo],
        borderColor: '#8b10ae',
        fill: false
      }]
    },
    options: {
      responsive: true
    }
  });
}
