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
            ganharXp(10);
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

    // Salvar texto do campo 'Metas' no localStorage ao digitar
const metasTextarea = document.getElementById('meta');
metasTextarea.addEventListener('input', function() {
    localStorage.setItem('metas', this.value);
});

// Carregar texto do campo 'Metas' do localStorage ao carregar a página
const metasSalvas = localStorage.getItem('metas');
if (metasSalvas) {
    metasTextarea.value = metasSalvas;
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

let data = {}; // Define globally

function exportNotes() {
    // Gather data from textareas
    const anotacoes = document.getElementById('anotacoes3').value;
    const meta = document.getElementById('meta').value;
    const programados = document.getElementById('programados').value;
    const melhorar = document.getElementById('anotacoes2').value;
    const naoFazer = document.getElementById('anotacoes').value;

    // Coleta os dados dos hábitos
    const manhaHabitos = document.getElementById('manhaHabitos').textContent.trim().split('\n');
    const tardeHabitos = document.getElementById('tardeHabitos').textContent.trim().split('\n');
    const noiteHabitos = document.getElementById('noiteHabitos').textContent.trim().split('\n');

    // Cria um array de objetos para representar os hábitos
    const habitos = [
        ...manhaHabitos.map(habito => ({ nome: habito, periodo: 'manha' })),
        ...tardeHabitos.map(habito => ({ nome: habito, periodo: 'tarde' })),
        ...noiteHabitos.map(habito => ({ nome: habito, periodo: 'noite' }))
    ];

    // Prepare data object
    const data = {
        anotacoes,
        meta,
        programados,
        melhorar,
        naoFazer,
        habitos
    };

    // Convert data to JSON string
    const jsonData = JSON.stringify(data);

    // Create a blob for the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Simulate a file download using FileSaver.js (if included)
    if (typeof window.saveAs === 'function') {
        window.saveAs(blob, 'habitos.json');
    } else {
        // Provide alternative download method if FileSaver.js is not available
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'habitos.json';
        link.click();
    }

    // Save to localStorage
    localStorage.setItem('habitosData', jsonData);
}

function importNotes() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                data = JSON.parse(event.target.result);

                // Log imported data
                console.log('Imported data:', data);

                // Update textareas with imported data
                document.getElementById('anotacoes3').value = data.anotacoes || '';
                document.getElementById('meta').value = data.meta || '';
                document.getElementById('programados').value = data.programados || '';
                document.getElementById('anotacoes2').value = data.melhorar || '';
                document.getElementById('anotacoes').value = data.naoFazer || '';

                // Save the imported data to localStorage
                localStorage.setItem('habitosData', JSON.stringify(data));
            } catch (error) {
                console.error('Erro ao importar dados:', error);
            }
        };

        reader.readAsText(file);
    });

    input.click();
}

function loadSavedData() {
    const savedData = localStorage.getItem('habitosData');
    if (savedData) {
        data = JSON.parse(savedData);

        // Log dos dados carregados
        console.log('Dados carregados:', data);

        // Preenche os campos com os dados carregados
        document.getElementById('anotacoes3').value = data.anotacoes || '';
        document.getElementById('meta').value = data.meta || '';
        document.getElementById('programados').value = data.programados || '';
        document.getElementById('anotacoes2').value = data.melhorar || '';
        document.getElementById('anotacoes').value = data.naoFazer || '';

        // Preenche os hábitos
        if (data.habitos) {
            data.habitos.forEach(habito => {
                const li = document.createElement('li');
                li.textContent = habito.nome;

                // Adiciona a classe 'concluido' se o hábito estiver marcado
                if (habito.concluido) {
                    li.classList.add('concluido');
                }

                // Adiciona o evento de clique para marcar/desmarcar
                li.addEventListener('click', () => {
                    li.classList.toggle('concluido');
                    saveHabitsState(); // Salva o estado atualizado
                });

                // Adiciona o hábito ao período correto
                if (habito.periodo === 'manha') {
                    document.getElementById('manhaHabitos').appendChild(li);
                } else if (habito.periodo === 'tarde') {
                    document.getElementById('tardeHabitos').appendChild(li);
                } else if (habito.periodo === 'noite') {
                    document.getElementById('noiteHabitos').appendChild(li);
                }
            });
        } else {
            console.log('Nenhum hábito encontrado.');
        }
    }
}

document.getElementById('desmarcarHabitosBtn').addEventListener('click', () => {
    // Seleciona todos os hábitos
    ['manhaHabitos', 'tardeHabitos', 'noiteHabitos'].forEach(periodoId => {
        const periodo = document.getElementById(periodoId);
        Array.from(periodo.children).forEach(li => {
            // Remove a classe 'concluido'
            li.classList.remove('concluido');
        });
    });

    // Atualiza o estado no localStorage
    saveHabitsState();

    console.log('Todos os hábitos foram desmarcados e salvos.');
});

function saveHabitsState() {
    // Atualiza os dados dos hábitos com o estado de "concluído"
    const habitos = [];

    ['manhaHabitos', 'tardeHabitos', 'noiteHabitos'].forEach(periodoId => {
        const periodo = document.getElementById(periodoId);
        Array.from(periodo.children).forEach(li => {
            habitos.push({
                nome: li.textContent,
                periodo: periodoId.replace('Habitos', '').toLowerCase(),
                concluido: li.classList.contains('concluido') // Verifica se está marcado
            });
        });
    });

    // Atualiza o objeto `data` e salva no localStorage
    data.habitos = habitos;
    localStorage.setItem('habitosData', JSON.stringify(data));
}

// Adicione estilos para itens marcados
const style = document.createElement('style');
style.textContent = `
    .concluido {
        text-decoration: line-through;
        color: gray;
    }
`;
document.head.appendChild(style);

// Chamar a função para carregar os dados ao carregar a página
window.onload = () => {
    loadSavedData();
};

function ganharXp(xp) {
    const xpGainElement = document.getElementById("xp-gain");
    xpGainElement.textContent = `+${xp} XP`;
    xpGainElement.style.display = "block";

    // Esconde a mensagem após 1.5 segundos
    setTimeout(() => {
        xpGainElement.style.display = "none";
    }, 1500);

    // Atualiza o progresso e a interface (já implementado no script externo)
    // Aqui você deve chamar `ganharXp` para processar o XP normalmente
}

document.addEventListener("DOMContentLoaded", function() {
    // Função para obter o dia da semana
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const hoje = new Date();
    const diaDaSemana = hoje.getDay(); // Retorna um número de 0 (Domingo) a 6 (Sábado)
    
    // Definir os hábitos para os dias específicos
    const habitos = {
        Segunda: { 
            Manha: ['Limpar Ouvido'], 
            Tarde: ['Se depile']
        },
        Quinta: { 
            Manha: ['Aparar barba', 'Limpar Ouvido'], 
            Tarde: ['Igreja']
        },
        Sexta: { 
            Tarde: ['Limpar Escritório'] 
        },
    };

    // Adicionar hábitos de acordo com o dia da semana
    function adicionarHabitos(dia) {
        const listaManha = document.getElementById("manhaHabitos");
        const listaTarde = document.getElementById("tardeHabitos");
        const listaNoite = document.getElementById("noiteHabitos");

        if (habitos[dia]) {
            // Adicionar hábitos para a manhã
            if (habitos[dia].Manha) {
                habitos[dia].Manha.forEach(habito => {
                    const li = document.createElement('li');
                    li.textContent = habito;
                    listaManha.appendChild(li);
                });
            }

            // Adicionar hábitos para a tarde
            if (habitos[dia].Tarde) {
                habitos[dia].Tarde.forEach(habito => {
                    const li = document.createElement('li');
                    li.textContent = habito;
                    listaTarde.appendChild(li);
                });
            }

            // Adicionar hábitos para a noite (se necessário no futuro)
            if (habitos[dia].Noite) {
                habitos[dia].Noite.forEach(habito => {
                    const li = document.createElement('li');
                    li.textContent = habito;
                    listaNoite.appendChild(li);
                });
            }
        }
    }

    // Verifica o dia e chama a função para adicionar os hábitos
    adicionarHabitos(diasSemana[diaDaSemana]);
});
