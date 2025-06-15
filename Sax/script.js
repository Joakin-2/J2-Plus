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

// Função para abrir o modal
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    modal.style.display = 'flex';
}

// Função para fechar o modal
function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    modal.style.display = 'none';
}

// Fechar o modal se clicar fora do conteúdo
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

const notesTextarea2 = document.getElementById("notes1");
    const storageKey = "savedNotes2"; // Chave única para armazenar o conteúdo

    // Carrega o texto salvo no localStorage ao abrir a página
    window.onload = () => {
        const savedNotes2 = localStorage.getItem(storageKey);
        if (savedNotes2) {
            notesTextarea2.value = savedNotes2; // Preenche o textarea com o conteúdo salvo
        }
    };

    // Salva o conteúdo do textarea no localStorage automaticamente
    notesTextarea2.addEventListener("input", () => {
        localStorage.setItem(storageKey, notesTextarea2.value);
    });

    // Função para exportar o conteúdo como arquivo .txt
    function exportNotes() {
        const blob = new Blob([notesTextarea2.value], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "sax.txt";
        link.click();
    }

    // Função para importar um arquivo
    function importNotes() {
        const fileInput = document.createElement("input"); // Cria o elemento de input dinamicamente
        fileInput.type = "file";
        fileInput.accept = ".txt";
        fileInput.style.display = "none"; // Oculta o input
        document.body.appendChild(fileInput); // Adiciona temporariamente ao body

        // Quando um arquivo for selecionado
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    notesTextarea2.value = e.target.result; // Define o texto no textarea
                    localStorage.setItem(storageKey, e.target.result); // Salva no localStorage
                };
                reader.readAsText(file);
            }
        });

        fileInput.click(); // Abre o seletor de arquivos
        document.body.removeChild(fileInput); // Remove o input após o uso
    }

function redirecionar(destino) {
    switch (destino) {
        case 'Play':
            window.open('play.html');
            break;
        case 'Timer':
            window.open('Timers/timer.html');
            break;
        case 'Lições':
                window.open('https://youtu.be/arSPEDXQG-I?si=AbqnBjoEPqj4D3o9');
                window.open('https://promus.musica.ufrj.br/wp-content/uploads/2022/07/Omar-Pacheco-prod.-pedagogico-cadernobrasileiroparacontrabaixo.pdf');
                window.open('https://www.google.com.br/search?q=can+i+kick+it+bass&sca_esv=70821a11ccbed8f3&authuser=4&sxsrf=ACQVn0_s3qvTQTq84WxFpqq9Os4Y6LsD4A%3A1711309701419&source=hp&ei=hYMAZsveFs225OUPyJmIgAs&iflsig=ANes7DEAAAAAZgCRlYoDFsLXkKPhTQcZlyA_SbvZXw6Q&udm=&ved=0ahUKEwiLtee21Y2FAxVNG7kGHcgMArAQ4dUDCBU&uact=5&oq=can+i+kick+it+bass&gs_lp=Egdnd3Mtd2l6IhJjYW4gaSBraWNrIGl0IGJhc3MyBxAAGIAEGBMyBxAAGIAEGBMyCBAAGBYYHhgTMggQABgWGB4YEzIIEAAYFhgeGBMyCBAAGBYYHhgTMgoQABgWGB4YDxgTMggQABgWGB4YE0izwQFQAFifwAFwBngAkAEAmAGLAqABiBmqAQYwLjEyLje4AQPIAQD4AQGYAhmgApIbwgIIEC4YgAQYsQPCAgsQABiABBixAxiDAcICFBAuGIAEGIoFGLEDGIMBGMcBGNEDwgIFEAAYgATCAg4QLhiABBixAxjHARjRA8ICCxAuGIAEGLEDGIMBwgIIEAAYgAQYsQPCAhEQLhiABBixAxiDARjHARjRA8ICDhAuGMcBGLEDGNEDGIAEwgILEC4YgwEYsQMYgATCAg4QLhiABBiKBRixAxiDAcICBRAuGIAEwgIIEC4YgAQY1ALCAg4QABiABBiKBRixAxiDAcICDhAuGIAEGLEDGIMBGNQCwgIHEAAYgAQYCsICBhAAGBYYHsICBxAuGBMYgATCAgcQLhiABBgTmAMAkgcGNi4xMi43oAfSvgE&sclient=gws-wiz');
                break;
        case 'Lições-Cla':
                window.open('Partituras/clarinete.pdf');
                break;
        case 'Lições-Sax':
                window.open('Partituras/sax-alto.pdf');
                window.open('Partituras/sax-tenor.pdf');
                window.open('https://www.youtube.com/watch?v=8pvaCHGdBgk&list=WL&index=6&ab_channel=LanderSax');
                window.open('https://www.youtube.com/watch?v=mCm2xcsoVFE&list=WL&index=7&ab_channel=LanderSax');
                break;
        case 'Teclado':
            window.open('https://www.pianoeletronico.com.br/');
            break;
        case 'Compasso':
            window.open('Timers/compasso.html');
            break;
        case 'Partituras':
            window.open('https://j2plus.netlify.app/sax/partituras/');
            break;
        default:
            break;
    }
}