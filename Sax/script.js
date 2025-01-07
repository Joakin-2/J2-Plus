document.addEventListener("DOMContentLoaded", function () {

    // Criar o calendário
    createCalendar();

    // Remover a tela de loading após 1 segundo (1000 milissegundos)
    setTimeout(function () {
        document.getElementById("loader-container").style.display = "none";
    }, 1000);

    // Carregar as anotações salvas, se houver
    loadNotes();

    // Restaurar os dias marcados ao carregar a página
    restoreMarkedDays();
});

function toggleDay(event) {
    const selectedDay = event.target;
    selectedDay.classList.toggle("selected");

    // Adicione a lógica para salvar os dias marcados
    const dayNumber = selectedDay.dataset.day;
    saveMarkedDay(dayNumber);

    // Adiciona 10 XP sempre que um dia é marcado ou desmarcado
    ganharXp(10);

    // Exibe a mensagem "+10 XP" no HTML
    atualizarInterface();
}

function saveMarkedDay(dayNumber) {
    // Obtenha os dias marcados armazenados ou inicialize um array vazio
    let markedDays = JSON.parse(localStorage.getItem("markedDays")) || [];

    // Verifique se o dia já está marcado
    const index = markedDays.indexOf(dayNumber);
    if (index === -1) {
        // Se não estiver marcado, adicione à lista
        markedDays.push(dayNumber);
    } else {
        // Se estiver marcado, remova da lista
        markedDays.splice(index, 1);
    }

    // Salve a lista de dias marcados de volta no localStorage
    localStorage.setItem("markedDays", JSON.stringify(markedDays));
}

function restoreMarkedDays() {
    // Obtenha os dias marcados armazenados
    const markedDays = JSON.parse(localStorage.getItem("markedDays")) || [];

    // Para cada dia marcado, adicione a classe "selected"
    markedDays.forEach((dayNumber) => {
        const day = document.querySelector(`[data-day="${dayNumber}"]`);
        if (day) {
            day.classList.add("selected");
        }
    });
}

// Função para ganhar XP
function ganharXp(xp) {
    xpAtual += xp;
    if (xpAtual >= xpNecessario) {
        xpAtual -= xpNecessario;
        nivelAtual++;
        xpNecessario = 100 * (nivelAtual * nivelAtual);
        alert(`Parabéns! Você alcançou o nível ${nivelAtual}!`);
    }
    salvarProgresso();
    atualizarInterface();
}

// Função para salvar o progresso no localStorage
function salvarProgresso() {
    localStorage.setItem("nivelAtual", nivelAtual);
    localStorage.setItem("xpAtual", xpAtual);
}

// Função para atualizar a interface e exibir a mensagem "+10 XP"
function atualizarInterface() {
    const progressBar = document.getElementById("progress-bar");
    const nivelSpan = document.getElementById("nivel");
    const xpAtualSpan = document.getElementById("xp-atual");
    const xpNecessarioSpan = document.getElementById("xp-necessario");
    const mensagemXp = document.getElementById("mensagem-xp");

    if (nivelSpan && xpAtualSpan && xpNecessarioSpan && progressBar && mensagemXp) {
        nivelSpan.textContent = nivelAtual;
        xpAtualSpan.textContent = xpAtual;
        xpNecessarioSpan.textContent = xpNecessario;

        const progresso = (xpAtual / xpNecessario) * 100;
        progressBar.style.width = `${progresso}%`;
        progressBar.textContent = `${Math.round(progresso)}%`;

        // Exibe a mensagem "+10 XP"
        mensagemXp.textContent = "+10 XP";
        setTimeout(() => {
            mensagemXp.textContent = "";
        }, 2000);
    }
}

document.addEventListener("DOMContentLoaded", atualizarInterface);

function loadNotes() {
    // Verifique se há anotações salvas no localStorage
    const savedNotes = localStorage.getItem("musicPlaceNotes1");

    if (savedNotes) {
        // Se houver, atualize a área de anotações com as anotações salvas
        document.getElementById("notes1").value = savedNotes;
    }
}

document.getElementById("notes1").addEventListener("input", function () {
    // Salve as anotações sempre que houver uma alteração
    saveNotes();
});

function saveNotes() {
    // Obtenha o valor das anotações
    const notesValue = document.getElementById("notes1").value;

    // Salve as anotações no localStorage
    localStorage.setItem("musicPlaceNotes1", notesValue);
}

function createCalendar() {
    const calendarContainer = document.getElementById("calendar");

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // Adicionar dias da semana ao calendário
    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayOfWeek = document.createElement("div");
        dayOfWeek.classList.add("day", "day-name");
        dayOfWeek.textContent = daysOfWeek[i];
        calendarContainer.appendChild(dayOfWeek);
    }

    // Obter o número real de dias no mês (você precisará ajustar isso)
    const daysInMonth = 30;  // Substitua pelo número real de dias no mês

    // Adicionar dias do mês ao calendário
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "day-number");
        day.textContent = i;
        day.dataset.day = i;  // Adicione o número do dia como um atributo de dados
        day.addEventListener("click", toggleDay);
        calendarContainer.appendChild(day);
    }

    // Restaura os dias marcados ao criar o calendário
    restoreMarkedDays();
}

function showLessons(instrument) {
    // Lógica para exibir lições do instrumento
    alert(`Mostrando lições de ${instrument}`);
}

function showSheetMusic(instrument) {
    // Lógica para exibir partituras do instrumento
    alert(`Mostrando partituras de ${instrument}`);
}

function goHome() {
    // Redirecione para a página inicial ou execute a lógica desejada
    alert("Voltando para a Home");
    location.reload(); // Recarregue a página para simular o retorno à home
}
