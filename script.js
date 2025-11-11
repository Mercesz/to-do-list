function adicionar() {
    //Variáveis
    let task = document.getElementById("task");
    let list = document.getElementById("list");

    let item = document.createElement("li");
    item.innerHTML = `
        <span>${task.value}</span>
        <div class="actions">
        <button onclick="editar(this)">✏️</button>
        <button onclick="excluir(this)">🗑️</button>
        </div>
    `;

    list.appendChild(item);

    task.value = "";
}

function editar(botao) {
    let item = botao.parentElement;
    let textoAtual = item.querySelector("span").textContent;

    let novoTexto = prompt("Editar tarefa: ", textoAtual);
    if (novoTexto !== null && novoTexto.trim() !== "") {
        item.querySelector("span").textContent = novoTexto;
    }
}

function excluir(botao) {
    let item = botao.parentElement;
    item.remove();
}