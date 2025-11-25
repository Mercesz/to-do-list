// Carregando as tarefas salvas ao iniciar
document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionar() {
    const taskInput = document.getElementById("task");
    const texto = taskInput.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    criarItem(texto);

    salvarTarefa(texto);

    taskInput.value = "";
    verificarListaVazia();
}

function criarItem(texto) {
    const list = document.getElementById("list");

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${texto}</span>
        <div class="actions">
            <button onclick="editar(this)"><i class="fa-solid fa-pen"></i></button>
            <button onclick="excluir(this)"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    list.appendChild(li);
}

function editar(botao) {
    const li = botao.parentElement.parentElement;
    const textoAtual = li.querySelector("span").textContent;

    const novoTexto = prompt("Editar tarefa:", textoAtual);

    if (novoTexto && novoTexto.trim() !== "") {
        li.querySelector("span").textContent = novoTexto;
        atualizarStorage();
    }
}

function excluir(botao) {
    botao.parentElement.parentElement.remove();
    atualizarStorage();
    verificarListaVazia();
}

/* ===== LOCAL STORAGE ===== */

function salvarTarefa(texto) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(texto);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach(t => criarItem(t));
    verificarListaVazia();
}

function atualizarStorage() {
    const itens = document.querySelectorAll("#list li span");
    const novasTarefas = [...itens].map(s => s.textContent);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
}

/* Mensagem quando lista estiver vazia */
function verificarListaVazia() {
    const vazio = document.getElementById("vazio");
    const list = document.getElementById("list");

    vazio.style.display = list.children.length === 0 ? "block" : "none";
}
