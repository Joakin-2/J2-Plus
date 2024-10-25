// Definição da função updateTotal
function updateTotal() {
    var total = 0;
    var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
    for (var i = 0; i < table.rows.length; i++) {
        var amount = parseFloat(table.rows[i].cells[2].textContent.replace("R$ ", "").replace(".", "").replace(",", ".")); // Convertendo o formato brasileiro para número
        total += amount;
    }
    document.getElementById("total-amount").textContent = "Total: R$ " + total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // Formata o total como moeda brasileira
}

// Definição da função addExpense
function addExpense(name, type, amount) {
    var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.textContent = name;
    cell2.textContent = type;
    cell3.textContent = "R$ " + amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // Formata o valor como moeda brasileira

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", function() {
        table.deleteRow(newRow.rowIndex - 1);
        updateTotal();
    });

    cell4.appendChild(deleteButton);

    updateTotal(); // Chama a função updateTotal após adicionar a despesa
}

// Função para salvar despesas no localStorage
function saveExpenses() {
    var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
    var expenses = [];

    for (var i = 0; i < table.rows.length; i++) {
        var cells = table.rows[i].cells;
        var expense = {
            name: cells[0].textContent,
            type: cells[1].textContent,
            amount: parseFloat(cells[2].textContent.replace("R$ ", "").replace(".", "").replace(",", "."))
        };
        expenses.push(expense);
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Despesas salvas:", expenses);
}

// Função para carregar despesas do localStorage
function loadExpenses() {
    var savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
        var expenses = JSON.parse(savedExpenses);
        var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];

        expenses.forEach(function(expense) {
            var newRow = table.insertRow();
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);

            cell1.textContent = expense.name;
            cell2.textContent = expense.type;
            cell3.textContent = "R$ " + expense.amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.addEventListener("click", function() {
                table.deleteRow(newRow.rowIndex - 1);
                updateTotal();
                saveExpenses(); // Salvar após excluir
            });

            cell4.appendChild(deleteButton);
        });

        updateTotal(); // Atualiza o total após carregar as despesas
    } else {
        console.log("Nenhuma despesa encontrada no localStorage.");
    }
}

// Evento para salvar despesas ao clicar no botão "Salvar"
document.getElementById("save-expenses").addEventListener("click", function() {
    saveExpenses();
});

document.addEventListener("DOMContentLoaded", function() {
    loadExpenses();
});

document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que a página seja recarregada

    var name = document.getElementById("expense-name").value;
    var type = document.getElementById("expense-type").value;
    var amount = parseFloat(document.getElementById("expense-amount").value);

    if (type === "saida") {
        amount *= -1; // Transforma o valor em negativo para saídas
    }

    addExpense(name, type, amount); // Chamada à função addExpense
    saveExpenses(); // Salva as despesas após adicionar uma despesa
});

document.getElementById("download-pdf").addEventListener("click", function() {
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    doc.text("Controle de Gastos", 10, 10);
    var today = new Date();
    var formattedDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    doc.text(`Data: ${formattedDate}`, 150, 10);

    var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
    var rows = table.getElementsByTagName("tr");

    var startX = 10;
    var startY = 30;

    // Criação de uma tabela para as entradas variáveis
    var entradaVariavelRows = [];

    // Criação de uma tabela para as entradas fixas
    var entradaFixaRows = [];

    // Criação de uma tabela para as saídas
    var saidaRows = [];

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var name = cells[0].textContent;
        var type = cells[1].textContent;
        var amount = parseFloat(cells[2].textContent.replace("R$ ", "").replace(".", "").replace(",", ".")); // Convertendo o formato brasileiro para número

        // Adiciona a linha à categoria apropriada
        if (type === "entrada-variavel") {
            entradaVariavelRows.push([name, amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})]);
        } else if (type === "entrada-fixa") {
            entradaFixaRows.push([name, amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})]);
        } else if (type === "saida") {
            saidaRows.push([name, amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})]);
        }
    }

    // Adiciona as tabelas ao PDF
    // Tabela de Entradas Variáveis
doc.autoTable({
    head: [["Entrada Variável", "Valor (R$)"]],
    body: entradaVariavelRows,
    styles: { 
        halign: 'center',  // Centraliza o conteúdo das células
        fillColor: '#825dff' // Define a cor de fundo da tabela
    }
});

// Tabela de Entradas Fixas
doc.autoTable({
    head: [["Entrada Fixa", "Valor (R$)"]],
    body: entradaFixaRows,
    styles: { 
        halign: 'center',
        fillColor: '#825dff' 
    }
});

// Tabela de Saídas
doc.autoTable({
    head: [["Saída", "Valor (R$)"]],
    body: saidaRows,
    styles: { 
        halign: 'center',
        fillColor: '#825dff' 
    }
});

    
    doc.save("Gastos.pdf");
});
