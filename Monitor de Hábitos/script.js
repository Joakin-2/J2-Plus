document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const voltarBtn = document.getElementById('voltarBtn');
    const criarTelaModalBtn = document.getElementById('criarTelaModalBtn');
    const excluirHabitosBtn = document.getElementById('excluirHabitosBtn');
    const salvarHabitoBtn = document.getElementById('salvarHabito');
    const desmarcarHabitosBtn = document.getElementById('desmarcarHabitosBtn');
    const relogioElement = document.getElementById('relogio');
    const modal = document.getElementById('myModal');
    const programadosTextarea = document.getElementById('programados');

    // Exibir menu ao clicar no botão
    menuBtn.addEventListener('click', function() {
        menuOverlay.style.display = 'block';
    });

    // Fechar menu ao clicar no botão 'Voltar'
    voltarBtn.addEventListener('click', function() {
        menuOverlay.style.display = 'none';
    });

    // Abrir modal ao clicar em 'Adicionar Hábito'
    criarTelaModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Fechar modal ao clicar em 'Fechar'
    document.getElementById('fecharModal').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Redirecionar para outras páginas ao clicar nos botões correspondentes
    document.getElementById('habitosBtn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    document.getElementById('refeicoesBtn').addEventListener('click', function() {
        window.location.href = 'refeicoes.html';
    });

    // Função para criar um hábito
function criarHabito(textoHabito, periodo) {
    // Criar o elemento <li> para o hábito
    const novoHabito = document.createElement('li');
    novoHabito.textContent = textoHabito;

    // Determinar o container correto baseado no período
    let container;
    switch (periodo) {
        case 'manha':
            container = document.getElementById('manhaHabitos');
            break;
        case 'tarde':
            container = document.getElementById('tardeHabitos');
            break;
        case 'noite':
            container = document.getElementById('noiteHabitos');
            break;
        default:
            console.error(`Período inválido: ${periodo}`);
            return;
    }

    // Adicionar classe para permitir a estilização
    novoHabito.classList.add('habito');

    // Adicionar o hábito à lista apropriada
    if (container) {
        container.appendChild(novoHabito);
    } else {
        console.error(`Container de hábitos para ${periodo} não encontrado.`);
        return;
    }

    // Adicionar evento de clique para marcar como concluído
    novoHabito.addEventListener('click', function() {
        novoHabito.classList.toggle('concluido');

        // Salvar estado no localStorage
        salvarNoLocalStorage('habitos', { habito: textoHabito, periodo: periodo, concluido: novoHabito.classList.contains('concluido') });
    });

    // Verificar se o hábito já foi concluído anteriormente
    const habitosSalvos = JSON.parse(localStorage.getItem('habitos')) || [];
    const habitoSalvo = habitosSalvos.find(habito => habito.habito === textoHabito && habito.periodo === periodo);
    if (habitoSalvo && habitoSalvo.concluido) {
        novoHabito.classList.add('concluido');
    }
}


    // Evento para salvar hábito ao clicar no botão 'Salvar' do modal
    salvarHabitoBtn.addEventListener('click', function() {
        const novoHabitoTexto = document.getElementById('novoHabito').value;
        const periodoSelecionado = document.getElementById('periodoHabito').value;

        // Validar se o campo do hábito não está vazio
        if (novoHabitoTexto.trim() === '') {
            alert('Por favor, digite um hábito.');
            return;
        }

        // Chamar a função para criar o hábito no lugar correto
        criarHabito(novoHabitoTexto, periodoSelecionado);

        // Salvar no localStorage
        salvarNoLocalStorage('habitos', { habito: novoHabitoTexto, periodo: periodoSelecionado });

        // Fechar o modal após salvar
        modal.style.display = 'none';

        // Limpar o campo de texto do novo hábito
        document.getElementById('novoHabito').value = '';
    });

    // Evento para excluir todos os hábitos
    excluirHabitosBtn.addEventListener('click', function() {
        ['manha', 'tarde', 'noite'].forEach(periodo => {
            const habitosContainer = document.getElementById(`${periodo}Habitos`);
            if (habitosContainer) {
                habitosContainer.innerHTML = ''; // Limpa todos os elementos dentro do container
            } else {
                console.error(`Container de hábitos para ${periodo} não encontrado.`);
            }
        });

        // Limpar o localStorage
        localStorage.removeItem('habitos');
    });

    desmarcarHabitosBtn.addEventListener('click', function() {
        document.querySelectorAll('.caixa ul li.concluido').forEach(habito => {
            habito.classList.remove('concluido');
            // Atualizar no localStorage
            atualizarConcluidoLocalStorage(habito.textContent.trim(), false);
        });
    });
    
    // Função para atualizar o estado de concluído no localStorage
    function atualizarConcluidoLocalStorage(habitoTexto, concluido) {
        const habitosSalvos = JSON.parse(localStorage.getItem('habitos')) || [];
        const habitoIndex = habitosSalvos.findIndex(habito => habito.habito === habitoTexto);
        if (habitoIndex !== -1) {
            habitosSalvos[habitoIndex].concluido = concluido;
            localStorage.setItem('habitos', JSON.stringify(habitosSalvos));
        }
    }    

    // Atualizar o relógio a cada segundo
    function atualizarRelogio() {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const segundos = agora.getSeconds().toString().padStart(2, '0');
        const horario = `${horas}:${minutos}:${segundos}`;
        relogioElement.textContent = horario;
    }

    // Iniciar o relógio
    function iniciarRelogio() {
        atualizarRelogio();
        setInterval(atualizarRelogio, 1000);
    }

    iniciarRelogio();

    // Salvar texto do campo 'Programados' no localStorage ao digitar
    programadosTextarea.addEventListener('input', function() {
        localStorage.setItem('programados', this.value);
    });

    // Carregar texto do campo 'Programados' do localStorage ao carregar a página
    const programadosSalvos = localStorage.getItem('programados');
    if (programadosSalvos) {
        programadosTextarea.value = programadosSalvos;
    }

    // Carregar texto do campo 'O que não fazer' do localStorage ao carregar a página
    const anotacoesTextarea = document.getElementById('anotacoes');
    anotacoesTextarea.addEventListener('input', function() {
        localStorage.setItem('anotacoes', this.value);
    });

    const anotacoesSalvas = localStorage.getItem('anotacoes');
    if (anotacoesSalvas) {
        anotacoesTextarea.value = anotacoesSalvas;
    }

    // Salvar texto do campo 'O que melhorar' no localStorage ao digitar
    const anotacoesTextarea2 = document.getElementById('anotacoes2');
    anotacoesTextarea2.addEventListener('input', function() {
        localStorage.setItem('anotacoes2', this.value);
    });

    const anotacoesSalvas2 = localStorage.getItem('anotacoes2');
    if (anotacoesSalvas2) {
        anotacoesTextarea2.value = anotacoesSalvas2;
    }

    // Salvar texto do campo 'Anotações' no localStorage ao digitar
    const anotacoesTextarea3 = document.getElementById('anotacoes3');
    anotacoesTextarea3.addEventListener('input', function() {
        localStorage.setItem('anotacoes3', this.value);
    });

    const anotacoesSalvas3 = localStorage.getItem('anotacoes3');
    if (anotacoesSalvas3) {
        anotacoesTextarea3.value = anotacoesSalvas3;
    }

    // Carregar hábitos salvos do localStorage ao carregar a página
    const habitosSalvos = JSON.parse(localStorage.getItem('habitos')) || [];
    habitosSalvos.forEach(habito => {
        criarHabito(habito.habito, habito.periodo);
    });

    // Função para salvar hábito no localStorage
    function salvarNoLocalStorage(chave, valor) {
        const habitosSalvos = JSON.parse(localStorage.getItem(chave)) || [];
        // Verificar se já existe um hábito com o mesmo texto e período
        const index = habitosSalvos.findIndex(habito => habito.habito === valor.habito && habito.periodo === valor.periodo);
        if (index !== -1) {
            // Atualizar o estado de concluído
            habitosSalvos[index].concluido = valor.concluido;
        } else {
            // Adicionar novo hábito ao localStorage
            habitosSalvos.push(valor);
        }
        localStorage.setItem(chave, JSON.stringify(habitosSalvos));
    }    
});
