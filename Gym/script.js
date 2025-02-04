document.addEventListener("DOMContentLoaded", function () {
    // Criar o calendário
    createCalendar();

    // Remover a tela de loading após 5 segundos (5000 milissegundos)
    setTimeout(function () {
        document.getElementById("loader-container").style.display = "none";
    }, 1000);

    // Carregue as anotações salvas, se houver
    loadNotes();

    // Restaurar os dias marcados ao carregar a página
    restoreMarkedDays2();
});

function toggleDay(event) {
    const selectedDay = event.target;
    selectedDay.classList.toggle("selected");

    // Adicione a lógica para salvar os dias marcados
    const dayNumber = selectedDay.dataset.day;
    saveMarkedDay(dayNumber);

    // Adiciona 10 XP sempre que um dia é marcado ou desmarcado
    ganharXp(10);
}

function saveMarkedDay(dayNumber) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const key = `markedDays2-${currentMonth}-${currentYear}`;

    let markedDays2 = JSON.parse(localStorage.getItem(key)) || [];
    const index = markedDays2.indexOf(dayNumber);

    if (index === -1) {
        markedDays2.push(dayNumber);
    } else {
        markedDays2.splice(index, 1);
    }

    localStorage.setItem(key, JSON.stringify(markedDays2));
}

function restoreMarkedDays2() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const key = `markedDays2-${currentMonth}-${currentYear}`;

    const markedDays2 = JSON.parse(localStorage.getItem(key)) || [];

    markedDays2.forEach((dayNumber) => {
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

// Função para atualizar a interface
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

// Função para salvar as anotações no localStorage
function saveNotes() {
    const notes = document.getElementById('notesgym').value;
    localStorage.setItem('notesgym', notes);
}

// Carregar as anotações salvas do localStorage, se existirem
function loadNotes() {
    const savedNotes = localStorage.getItem('notesgym');

    if (savedNotes) {
        document.getElementById('notesgym').value = savedNotes;
    }
}

// Adicionar evento para salvar automaticamente as anotações ao digitar
document.getElementById('notesgym').addEventListener('input', function() {
    saveNotes();
});

// Carregar as anotações ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    loadNotes();
});


document.getElementById("notesgym").addEventListener("input", function () {
    // Salve as anotações sempre que houver uma alteração
    saveNotes();
});

// Adiciona eventos para salvar automaticamente peso e altura
document.getElementById('weight').addEventListener('input', function() {
    salvarPeso(this.value);
});

document.getElementById('height').addEventListener('input', function() {
    salvarAltura(this.value);
});

// Funções para salvar peso e altura
function salvarPeso(peso) {
    localStorage.setItem('peso', peso); // Salva o peso no localStorage
}

function salvarAltura(altura) {
    localStorage.setItem('altura', altura); // Salva a altura no localStorage
}

// Carregar valores salvos do localStorage, se existirem
document.addEventListener('DOMContentLoaded', function() {
    var pesoSalvo = localStorage.getItem('peso');
    var alturaSalva = localStorage.getItem('altura');

    if (pesoSalvo !== null) {
        document.getElementById('weight').value = pesoSalvo;
    }

    if (alturaSalva !== null) {
        document.getElementById('height').value = alturaSalva;
    }
});

function createCalendar() {
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = ""; // Limpa o calendário

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Obter o primeiro dia do mês e o número de dias no mês
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Criar cabeçalho com os dias da semana
    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayOfWeek = document.createElement("div");
        dayOfWeek.classList.add("day", "day-name");
        dayOfWeek.textContent = daysOfWeek[i];
        calendarContainer.appendChild(dayOfWeek);
    }

    // Adicionar espaços vazios para alinhar os dias corretamente
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day", "empty");
        calendarContainer.appendChild(emptyDay);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "day-number");
        day.textContent = i;
        day.dataset.day = i;
        day.addEventListener("click", toggleDay);
        calendarContainer.appendChild(day);
    }

    // Restaurar os dias marcados depois de criar o calendário
    restoreMarkedDays2();
}

// Verifica quando o mês muda e reinicia o calendário automaticamente
setInterval(function () {
    const now = new Date();
    const storedMonth = localStorage.getItem("lastMonth") || -1;

    if (storedMonth != now.getMonth()) {
        localStorage.setItem("lastMonth", now.getMonth());
        createCalendar(); // Recria o calendário para o novo mês
    }
}, 60000); // Verifica a cada 60 segundos