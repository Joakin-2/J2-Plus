    // Definição da função updateTotal
    function updateTotal() {
        var total = 0;
        var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
        for (var i = 0; i < table.rows.length; i++) {
            var amountText = table.rows[i].cells[2].textContent;
            console.log("Valor bruto:", amountText); // Verifica o texto bruto da célula
            var amount = parseFloat(amountText.replace("R$ ", "").replace(".", "").replace(",", "."));
            console.log("Valor convertido:", amount); // Verifica o valor convertido
            if (!isNaN(amount)) {
                total += amount;
            } else {
                console.warn("Valor inválido na linha:", i + 1);
            }
        }
        document.getElementById("total-amount").textContent = "Total: R$ " + total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        console.log("Total atualizado:", total);
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

    // Função para salvar anotações no localStorage
    function saveNotes() {
        var notes = document.getElementById("notes").value;
        localStorage.setItem("notes", notes);
        console.log("Anotações salvas:", notes);
    }

    // Função para carregar anotações do localStorage
    function loadNotes() {
        var savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            document.getElementById("notes").value = savedNotes;
            console.log("Anotações carregadas:", savedNotes);
        } else {
            console.log("Nenhuma anotação encontrada no localStorage.");
        }
    }

    // Evento para salvar despesas ao clicar no botão "Salvar"
    document.getElementById("save-expenses").addEventListener("click", function() {
        saveExpenses();
    });
    document.getElementById("notes").addEventListener("input", function() {
        saveNotes(); // Salva as anotações sempre que o texto é alterado
    });


    document.addEventListener("DOMContentLoaded", function() {
        loadExpenses();
        loadNotes();
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
        saveNotes(); // Salva as anotações após adicionar uma despesa
    });

    document.getElementById("download-pdf").addEventListener("click", function() {
        var { jsPDF } = window.jspdf;
        var doc = new jsPDF();

        doc.text("Controle Financeiro", 10, 10);
        var today = new Date();
        var formattedDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
        doc.text(`Data: ${formattedDate}`, 150, 10);

        var table = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
        var rows = table.getElementsByTagName("tr");

        var startX = 10;
        var startY = 30;

        // Criação de uma tabela para as entradas variáveis
        var entradaVariavelRows = [];
        var entradaVariavelTotal = 0;

        // Criação de uma tabela para as entradas fixas
        var entradaFixaRows = [];
        var entradaFixaTotal = 0;

        // Criação de uma tabela para as saídas
        var saidaRows = [];
        var saidaTotal = 0;

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName("td");
            var name = cells[0].textContent;
            var type = cells[1].textContent;
            var amount = parseFloat(cells[2].textContent.replace("R$ ", "").replace(".", "").replace(",", ".")); // Convertendo o formato brasileiro para número

            // Adiciona a linha à categoria apropriada
            if (type === "entrada-variavel") {
                entradaVariavelRows.push([name, amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})]);
                entradaVariavelTotal += amount;
            } else if (type === "entrada-fixa") {
                entradaFixaRows.push([name, amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})]);
                entradaFixaTotal += amount;
            } else if (type === "saida") {
                saidaRows.push([name, amount.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})]);
                saidaTotal += amount;
            }
        }

        // Adiciona as tabelas ao PDF
    doc.autoTable({
        startY: startY, 
        head: [["Entrada Variável", "Valor (R$)"]],
        body: entradaVariavelRows,
        theme: 'grid', // Define o tema da tabela
        styles: { 
            halign: 'center',
            textColor: 'black'   // Cor do texto
        },
        headStyles: { 
            fillColor: '#6a43be', // Cor de fundo dos cabeçalhos
            textColor: '#ffffff'   // Cor do texto dos cabeçalhos
        }
    });
    var entradaVariavelTotalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total: R$ ${entradaVariavelTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, startX, entradaVariavelTotalY);

    doc.autoTable({
        startY: entradaVariavelTotalY + 20,
        head: [["Entrada Fixa", "Valor (R$)"]],
        body: entradaFixaRows,
        theme: 'grid',
        styles: { 
            halign: 'center',
            textColor: 'black'   // Cor do texto
        },
        headStyles: { 
            fillColor: '#6a43be', // Cor de fundo dos cabeçalhos
            textColor: '#ffffff'   // Cor do texto dos cabeçalhos
        }
    });
    var entradaFixaTotalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total: R$ ${entradaFixaTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, startX, entradaFixaTotalY);

    doc.autoTable({
        startY: entradaFixaTotalY + 20,
        head: [["Saída", "Valor (R$)"]],
        body: saidaRows,
        theme: 'grid',
        styles: { 
            halign: 'center',
            textColor: 'black'   // Cor do texto
        },
        headStyles: { 
            fillColor: '#6a43be', // Cor de fundo dos cabeçalhos
            textColor: '#ffffff'   // Cor do texto dos cabeçalhos
        }
    });
        var saidaTotalY = doc.lastAutoTable.finalY + 10;
        doc.text(`Total: R$ ${saidaTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, startX, saidaTotalY);

        var totalFinal = entradaVariavelTotal + entradaFixaTotal + saidaTotal;
        doc.text(`Total Final: R$ ${totalFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, startX, saidaTotalY + 20);

        // Adiciona as anotações ao PDF
        var notesText = document.getElementById("notes").value;
        if (notesText.trim() !== "") {
            doc.text("Anotações:", startX, saidaTotalY + 40);
            doc.text(notesText, startX, saidaTotalY + 50);
        }

        doc.save("Controle de Finanças.pdf");
    });
