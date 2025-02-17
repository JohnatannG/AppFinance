const registrationFormData = JSON.parse(localStorage.getItem("registrationFormData"));
const userEmail = registrationFormData.emailUser;

let pageDespesas = JSON.parse(localStorage.getItem(`FormDespesas_${userEmail}`)) || [];
const modalFormDespesas = document.getElementById("modalFormDespesas");

const mediaDiariaGastosDespesas = document.getElementById('mediaDiariaGastosDespesas');
const pesquisarDespesas = document.getElementById('pesquisarDespesas')
const totalDespesas = pageDespesas.reduce((acc, despesa) => acc + despesa.valorDespesas, 0);


window.addEventListener("load", () => {
    mostrarMediaDeGastos();
    dadosNaTabelaDaPaginaDespesas(pageDespesas);
});

const adicionarDespesas = document.getElementById("adicionarDespesas").addEventListener("click", function (){
    const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");

    formAdicionarDespesas.classList.remove("d-none");
    formAdicionarDespesas.classList.add("d-flex");
});

fecharModalDespesas.addEventListener("click", function () {
    const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");
  
    formAdicionarDespesas.classList.remove("d-flex");
    formAdicionarDespesas.classList.add("d-none");
});

modalFormDespesas.addEventListener("submit", function (evento) {
    evento.preventDefault();
  
    const nomeDespesas = document.getElementById("nomeDespesas").value;
    const pagamentoDespesas = document.getElementById('pagamentoDespesas').value;
    const descricaoDespesas = document.getElementById('descricaoDespesas').value;
    const valorDespesas = Number(document.getElementById("valorDespesas").value);
    const dataDespesas = document.getElementById("dataDespesas").value;
  
    const dadosDespesas = {
      nomeDespesas: nomeDespesas,
      pagamentoDespesas: pagamentoDespesas,
      descricaoDespesas: descricaoDespesas,
      valorDespesas: valorDespesas,
      dataDespesas: dataDespesas,
    };
  
    const editando = modalFormDespesas.getAttribute("data-editando");
    const index = modalFormDespesas.getAttribute("data-index");

    if (editando) {
        pageDespesas[index] = dadosDespesas;
        
        modalFormDespesas.removeAttribute("data-editando");
        modalFormDespesas.removeAttribute("data-index");
    } else{
        pageDespesas.push(dadosDespesas);
    }
  
    localStorage.setItem(`FormDespesas_${userEmail}`, JSON.stringify(pageDespesas));
    modalFormDespesas.reset();
    dadosNaTabelaDaPaginaDespesas();
    saldoAtualizado();
}); 

function mostrarMediaDeGastos(){
    mediaDespesas = totalDespesas / pageDespesas.length
    mediaDiariaGastosDespesas.textContent = mediaDespesas.toLocaleString("pt-br", {style: "currency", currency: "BRL",}) || 0
};

pesquisarDespesas.addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase().trim(); 

    if (searchValue === "") {
        dadosNaTabelaDaPaginaDespesas(pageDespesas);
    } else {
        const search = pageDespesas.filter((despesa) => {
            return despesa.descricaoDespesas.toLowerCase().includes(searchValue);
        });

        dadosNaTabelaDaPaginaDespesas(search); 
    }
});

function dadosNaTabelaDaPaginaDespesas(listaDespesas) {
    const tBodyTodasDespesas = document.getElementById("tBodyTodasDespesas");
    
    tBodyTodasDespesas.innerHTML = "";
  
    listaDespesas.forEach((despesa) =>  {
        const tr = document.createElement("tr");
        const acoesSvg = document.createElement("div");
        acoesSvg.classList.add('d-flex')
        acoesSvg.classList.add('d-flex')
        acoesSvg.classList.add('gap-4')
        acoesSvg.classList.add('cursor-pointer')
        acoesSvg.classList.add('border-table.d-flex')

        const tdData = document.createElement("td");
        const tdDescricao = document.createElement("td");
        const tdValor = document.createElement("td");
        const tdPagamento = document.createElement("td");
    
        const pen = document.createElement('svg');
        pen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`;

        const x = document.createElement('svg');
        x.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

        tdData.classList.add("border-table");
        tdDescricao.classList.add("border-table");
        tdValor.classList.add("border-table");
        tdValor.classList.add("text-red");
        tdPagamento.classList.add("border-table");
        acoesSvg.classList.add("border-table");
        
        tdData.textContent = despesa.dataDespesas;
        tdDescricao.textContent = despesa.descricaoDespesas;
        tdValor.textContent = despesa.valorDespesas.toLocaleString("pt-br", { style: "currency", currency: "BRL", });
        tdPagamento.textContent = despesa.pagamentoDespesas;
    
        acoesSvg.append(pen, x)
        tr.append(tdData, tdDescricao, tdValor, tdPagamento, acoesSvg );
        tBodyTodasDespesas.append(tr);


        pen.addEventListener('click', function(){
            openModalEditarDesepesas(despesa)
        })

    });
}

function openModalEditarDesepesas(despesa){
    document.getElementById("nomeDespesas").value = despesa.nomeDespesas;
    document.getElementById("pagamentoDespesas").value = despesa.pagamentoDespesas;
    document.getElementById("descricaoDespesas").value = despesa.descricaoDespesas;
    document.getElementById("valorDespesas").value = despesa.valorDespesas;
    document.getElementById("dataDespesas").value = despesa.dataDespesas;
    
    const formAdicionarDespesas = document.getElementById("formAdicionarDespesas");
    formAdicionarDespesas.classList.remove("d-none");
    formAdicionarDespesas.classList.add("d-flex");
    
    modalFormDespesas.setAttribute("data-editando", true);
    modalFormDespesas.setAttribute("data-index", despesa.indexOf(despesa));
}