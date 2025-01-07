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
    restoremarkedDays2();
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
    // Obtenha os dias marcados armazenados ou inicialize um array vazio
    let markedDays2 = JSON.parse(localStorage.getItem("markedDays2")) || [];

    // Verifique se o dia já está marcado
    const index = markedDays2.indexOf(dayNumber);
    if (index === -1) {
        // Se não estiver marcado, adicione à lista
        markedDays2.push(dayNumber);
    } else {
        // Se estiver marcado, remova da lista
        markedDays2.splice(index, 1);
    }

    // Salve a lista de dias marcados de volta no localStorage
    localStorage.setItem("markedDays2", JSON.stringify(markedDays2));
}

function restoremarkedDays2() {
    // Obtenha os dias marcados armazenados
    const markedDays2 = JSON.parse(localStorage.getItem("markedDays2")) || [];

    // Para cada dia marcado, adicione a classe "selected"
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

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // Adicionar dias da semana ao calendário
    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayOfWeek = document.createElement("div");
        dayOfWeek.classList.add("day", "day-name");
        dayOfWeek.textContent = daysOfWeek[i];
        calendarContainer.appendChild(dayOfWeek);
    }

    // Obter o número real de dias no mês (você precisará ajustar isso)
    const daysInMonth = 30; // Substitua pelo número real de dias no mês

    // Adicionar dias do mês ao calendário
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "day-number");
        day.textContent = i;
        day.dataset.day = i; // Adicione o número do dia como um atributo de dados
        day.addEventListener("click", toggleDay);
        calendarContainer.appendChild(day);
    }
}
