document.addEventListener("DOMContentLoaded", function () {
    // Criar o calendário
    createCalendar();

    // Remover a tela de loading após 1 segundo (1000 milissegundos)
    setTimeout(function () {
        const loaderContainer = document.getElementById("loader-container");
        if (loaderContainer) {
            loaderContainer.style.display = "none";
        }
    }, 1000);

    // Carregar as anotações salvas, se houver
    loadNotes();

    // Restaurar os dias marcados ao carregar a página
    restoreMarkedDays();

    // Recuperar dados salvos, se existirem
    const weight = localStorage.getItem('weight');
    const height = localStorage.getItem('height');

    if (weight !== null) {
        document.getElementById('weight').value = weight;
    }

    if (height !== null) {
        document.getElementById('height').value = height;
    }

    // Adicionar evento de submit ao formulário
    const weightHeightForm = document.getElementById('weight-height-form');
    if (weightHeightForm) {
        weightHeightForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que o formulário recarregue a página

            const weightValue = document.getElementById('weight').value;
            const heightValue = document.getElementById('height').value;

            // Salvar no localStorage
            localStorage.setItem('weight', weightValue);
            localStorage.setItem('height', heightValue);

            alert('Peso e altura salvos com sucesso!');
        });
    }

    // Adicionar evento de input ao elemento de notas
    const notesElement = document.getElementById("notes");
    if (notesElement) {
        notesElement.addEventListener("input", function () {
            // Salve as anotações sempre que houver uma alteração
            saveNotes();
        });
    }
});

function toggleDay(event) {
    const selectedDay = event.target;
    selectedDay.classList.toggle("selected");

    // Adicione a lógica para salvar os dias marcados
    const dayNumber = selectedDay.dataset.day;
    saveMarkedDay(dayNumber);
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

function loadNotes() {
    // Verifique se há anotações salvas no localStorage
    const savedNotes = localStorage.getItem("musicPlaceNotes");

    if (savedNotes) {
        // Se houver, atualize a área de anotações com as anotações salvas
        const notesElement = document.getElementById("notes");
        if (notesElement) {
            notesElement.value = savedNotes;
        }
    }
}

function saveNotes() {
    // Obtenha o valor das anotações
    const notesElement = document.getElementById("notes");
    if (notesElement) {
        const notesValue = notesElement.value;
        // Salve as anotações no localStorage
        localStorage.setItem("musicPlaceNotes", notesValue);
    }
}

function createCalendar() {
    const calendarContainer = document.getElementById("calendar");

    if (calendarContainer) {
        const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

        // Adicionar dias da semana ao calendário
        daysOfWeek.forEach(day => {
            const dayOfWeek = document.createElement("div");
            dayOfWeek.classList.add("day", "day-name");
            dayOfWeek.textContent = day;
            calendarContainer.appendChild(dayOfWeek);
        });

        // Obter o número real de dias no mês (ajuste conforme necessário)
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

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
}
