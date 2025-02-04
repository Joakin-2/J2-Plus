document.addEventListener("DOMContentLoaded", function () {
    createCalendar();
    setTimeout(() => document.getElementById("loader-container").style.display = "none", 1000);
    restoreMarkedDays();
});

function createCalendar() {
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = ""; // Limpa o calendário antes de recriar

    const now = new Date();
    const ano = now.getFullYear();
    const mes = now.getMonth();

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const daysInMonth = new Date(ano, mes + 1, 0).getDate();
    const firstDayOfMonth = new Date(ano, mes, 1).getDay(); // Descobre em qual dia da semana começa o mês

    // Adicionar cabeçalhos dos dias da semana
    daysOfWeek.forEach(day => {
        const dayOfWeek = document.createElement("div");
        dayOfWeek.classList.add("day", "day-name");
        dayOfWeek.textContent = day;
        calendarContainer.appendChild(dayOfWeek);
    });

    // Adicionar espaços vazios antes do primeiro dia
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day", "empty-day");
        calendarContainer.appendChild(emptyDay);
    }

    // Adicionar os dias corretos do mês
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "day-number");
        day.textContent = i;
        day.dataset.day = i;
        day.addEventListener("click", toggleDay);
        calendarContainer.appendChild(day);
    }

    restoreMarkedDays();
}

function toggleDay(event) {
    const selectedDay = event.target;
    selectedDay.classList.toggle("selected");

    const dayNumber = selectedDay.dataset.day;
    saveMarkedDay(dayNumber);
    ganharXp(10);
}

function saveMarkedDay(dayNumber) {
    const now = new Date();
    const mesAno = `${now.getMonth()}-${now.getFullYear()}`; // Identificador único do mês
    let markedDays = JSON.parse(localStorage.getItem(`markedDays-${mesAno}`)) || [];

    const index = markedDays.indexOf(dayNumber);
    if (index === -1) markedDays.push(dayNumber);
    else markedDays.splice(index, 1);

    localStorage.setItem(`markedDays-${mesAno}`, JSON.stringify(markedDays));
}

function restoreMarkedDays() {
    const now = new Date();
    const mesAno = `${now.getMonth()}-${now.getFullYear()}`;
    const markedDays = JSON.parse(localStorage.getItem(`markedDays-${mesAno}`)) || [];

    markedDays.forEach(dayNumber => {
        const day = document.querySelector(`[data-day="${dayNumber}"]`);
        if (day) day.classList.add("selected");
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
