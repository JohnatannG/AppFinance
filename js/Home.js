const registrationFormData = JSON.parse(localStorage.getItem("registrationFormData"));
const userEmail = registrationFormData.emailUser;

let Despesas = JSON.parse(localStorage.getItem(`FormDespesas_${userEmail}`)) || [];
let Receitas = JSON.parse(localStorage.getItem(`FormReceitas_${userEmail}`)) || [];

if (!Array.isArray(Despesas)) {
  Despesas = [];
}

if (!Array.isArray(Receitas)) {
  Receitas = [];
}

/*ABRIR MODAL*/
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("Navbar");
  const toggleButton = document.getElementById("toggleNavbar");

  toggleButton.addEventListener("click", function () {
    navbar.classList.add('open')
    navbar.classList.remove("close");
  });
});


/*FECHAR MODAL*/
const fecharNavbar = document.getElementById('fecharNavbar').addEventListener('click', function(){
    const navbar = document.getElementById("Navbar");
    navbar.classList.remove('open')
    navbar.classList.add("close");
})


/*MOSTRAR SALDO NO CARD*/
const cardSaldoAtual = document.getElementById("cardSaldoAtual");
const saldoFormatado = registrationFormData.saldoUser.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
cardSaldoAtual.innerText = `${saldoFormatado}`;


/*SAIR DA CONTA*/
const LogOut = document.getElementById("LogOut");
LogOut.addEventListener("click", function () {
  const logOutModal = document.getElementById("logOutModal");
  logOutModal.classList.remove("d-none");
  logOutModal.classList.add("d-flex");
  logOutModal.classList.add("animate-fade");
});

const modalSair = document.getElementById("modalSair").addEventListener("click", function () {
  window.location.href = "https://app-finance-flame.vercel.app/pages/Login.html";
});
const modalCancelar = document.getElementById("modalCancelar").addEventListener("click", function () {
  logOutModal.classList.remove("d-flex");
  logOutModal.classList.add("d-none");
});


/*BUTTON ABRIR MODAL ADICIONAR DESPESAS*/
const adicionarDespesas = document.getElementById("adicionarDespesas").addEventListener("click", function () {
  const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");
  formAdicionarDespesas.classList.remove("d-none");
  formAdicionarDespesas.classList.add("d-flex");
});


/*BUTTON FECHAR MODAL ADICIONAR DESPESAS*/
const fecharModalDespesas = document.getElementById("fecharModalDespesas");
fecharModalDespesas.addEventListener("click", function () {
  const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");

  formAdicionarDespesas.classList.remove("d-flex");
  formAdicionarDespesas.classList.add("d-none");
});


/*MODAL ADICIONAR DESPESAS*/
const modalFormDespesas = document.getElementById("modalFormDespesas");
modalFormDespesas.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeDespesas = document.getElementById("nomeDespesas").value;
  const valorDespesas = Number(document.getElementById("valorDespesas").value);
  const dataDespesas = document.getElementById("dataDespesas").value;

  const dadosDespesas = {
    nomeDespesas: nomeDespesas,
    valorDespesas: valorDespesas,
    dataDespesas: dataDespesas,
  };

  Despesas.push(dadosDespesas);

  localStorage.setItem(`FormDespesas_${userEmail}`, JSON.stringify(Despesas));

  const totalDespesas = Despesas.reduce((acc, despesa) => acc + despesa.valorDespesas, 0);
  localStorage.setItem(`valorFormDespesas_${userEmail}`, JSON.stringify(totalDespesas));

  modalFormDespesas.reset();
  mostrarSaldoDespesas();
  dadosNaTabelaDespesas();
}); 


/*MOSTRAR VALOR NO CARD DESPESA*/
function mostrarSaldoDespesas() {
  const valorFormDespesas = JSON.parse(
    localStorage.getItem(`valorFormDespesas_${userEmail}`)
  );
  const totalDespesas = document.getElementById("totalDespesas");

  totalDespesas.textContent = `${valorFormDespesas.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
}

const adicionarReceitas = document.getElementById("adicionarReceitas").addEventListener("click", function () {
  const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");

  formAdicionarReceitas.classList.remove("d-none");
  formAdicionarReceitas.classList.add("d-flex");
});

const fecharModalReceitas = document.getElementById("fecharModalReceitas").addEventListener("click", function () {
  const formAdicionarReceitas = document.getElementById("formAdicionarReceitas");

  formAdicionarReceitas.classList.remove("d-flex");
  formAdicionarReceitas.classList.add("d-none");
});

const modalFormReceitas = document.getElementById("modalFormReceitas");
modalFormReceitas.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeReceitas = document.getElementById("nomeReceitas").value;
  const valorReceitas = Number(document.getElementById("valorReceitas").value);
  const dataReceitas = document.getElementById("dataReceitas").value;

  const dadosReceitas = {
    nomeReceitas: nomeReceitas,
    valorReceitas: valorReceitas,
    dataReceitas: dataReceitas,
  };

  Receitas.push(dadosReceitas);

  localStorage.setItem(`FormReceitas_${userEmail}`, JSON.stringify(Receitas));

  const totalReceitas = Receitas.reduce((acc, receita) => acc + receita.valorReceitas, 0);
  localStorage.setItem(`valorFormReceitas_${userEmail}`, JSON.stringify(totalReceitas));

  modalFormReceitas.reset();
  mostrarSaldoReceitas();
  saldoAtualAtualizadoReceitas();
  dadosNaTabelaReceitas()
});

function mostrarSaldoReceitas() {
  const valorFormReceitas = JSON.parse(localStorage.getItem(`valorFormReceitas_${userEmail}`)) || 0;
  const totalReceitas = document.getElementById("totalReceitas");

  totalReceitas.textContent = `${valorFormReceitas.toLocaleString("pt-br", {style: "currency", currency: "BRL",})}`;
}


function saldoAtualAtualizadoReceitas(){
  const valorFormReceitas = JSON.parse(localStorage.getItem(`valorFormReceitas_${userEmail}`)) || 0;
  let valorAtualizado = registrationFormData.saldoUser + valorFormReceitas
  
  const saldoFormatado = valorAtualizado.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
  cardSaldoAtual.innerText = `${saldoFormatado}`;
}

function saldoAtualAtualizadoDespesas(){
  const valorFormDespesas = JSON.parse(localStorage.getItem(`valorFormDespesas_${userEmail}`)) || 0;
  let valorAtualizado = registrationFormData.saldoUser - valorFormDespesas
  
  const saldoFormatado = valorAtualizado.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
  cardSaldoAtual.innerText = `${saldoFormatado}`;
}

window.addEventListener("load", () => {
  saldoAtualAtualizadoReceitas();
  mostrarSaldoReceitas();
  mostrarSaldoDespesas();
  saldoAtualAtualizadoDespesas();
  dadosNaTabelaDespesas();
  dadosNaTabelaReceitas();
});

function dadosNaTabelaDespesas() {
  const tBodyDespesas = document.getElementById("tBodyDespesas");
  const dadosDespesas = JSON.parse(localStorage.getItem(`FormDespesas_${userEmail}`)) || [];
  const ultimasDespesas = dadosDespesas.slice(-3);
  
  tBodyDespesas.innerHTML = "";

  ultimasDespesas.forEach((despesa) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    const tdDescricao = document.createElement("td");
    const tdValor = document.createElement("td");

    tdNome.classList.add("border-table");
    tdDescricao.classList.add("border-table");
    tdValor.classList.add("border-table");

    tdNome.textContent = despesa.nomeDespesas || "Nome não informado";
    tdValor.textContent = despesa.valorDespesas ? `R$ ${despesa.valorDespesas}` : "Valor não informado";
    tdDescricao.textContent = despesa.dataDespesas || "Sem descrição";

    tr.append(tdNome, tdDescricao, tdValor);
    tBodyDespesas.append(tr);
  });
}

function dadosNaTabelaReceitas() {
  const tBodyReceitas = document.getElementById("tBodyReceitas");
  const dadosReceitas = JSON.parse(localStorage.getItem(`FormReceitas_${userEmail}`)) || [];
  const ultimasReceitas = dadosReceitas.slice(-3);

  tBodyReceitas.innerHTML = "";
  
  ultimasReceitas.forEach((receita) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    const tdDescricao = document.createElement("td");
    const tdValor = document.createElement("td");

    tdNome.classList.add("border-table");
    tdDescricao.classList.add("border-table");
    tdValor.classList.add("border-table");

    tdNome.innerHTML = receita.nomeReceitas || "Nome não informado";
    tdValor.innerHTML = receita.valorReceitas ? `R$ ${receita.valorReceitas}` : "Valor não informado";
    tdDescricao.innerHTML = receita.dataReceitas || "Sem descrição";

    tr.append(tdNome, tdDescricao, tdValor);
    tBodyReceitas.append(tr);
  });
}