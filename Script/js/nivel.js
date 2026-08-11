function ganharXp(xp) {
  const perfil = perfis[perfilAtivo];
  perfil.xp += xp;

  const xpNecessario = 100 * perfil.nivel * perfil.nivel;
  if (perfil.xp >= xpNecessario) {
    perfil.xp -= xpNecessario;
    perfil.nivel++;
    mostrarComemoracao(`Parabéns, ${perfil.nome} subiu para o nível ${perfil.nivel}!`);
  }

  localStorage.setItem("xp" + perfilAtivo, perfil.xp);
  localStorage.setItem("nivel" + perfilAtivo, perfil.nivel);
  atualizarInterface();
}

function atualizarInterface() {
  const perfil = perfis[perfilAtivo];
  const progressBar = document.getElementById("progress-bar");
  const nivelSpan = document.getElementById("nivel");
  const xpAtualSpan = document.getElementById("xp-atual");
  const xpNecessarioSpan = document.getElementById("xp-necessario");

  const xpNecessario = 100 * (perfil.nivel * perfil.nivel);

  if (nivelSpan && xpAtualSpan && xpNecessarioSpan && progressBar) {
    nivelSpan.textContent = perfil.nivel;
    xpAtualSpan.textContent = perfil.xp;
    xpNecessarioSpan.textContent = xpNecessario;

    const progresso = (perfil.xp / xpNecessario) * 100;
    progressBar.style.width = `${progresso}%`;
    progressBar.textContent = `${Math.round(progresso)}%`;
  }
}

function atualizarPerfil() {
  const perfil = perfis[perfilAtivo];

  perfil.nivel = parseInt(localStorage.getItem("nivel" + perfilAtivo)) || 1;
  perfil.xp = parseInt(localStorage.getItem("xp" + perfilAtivo)) || 0;

  const bioSalva = localStorage.getItem("bio" + perfilAtivo);
  if (bioSalva) perfil.bio = bioSalva;

  nomePerfil.textContent = perfil.nome;
  bioPerfil.value = perfil.bio;
  bioPerfil.disabled = perfilAtivo !== "Main";

  atualizarInterface(); // Atualiza a barra de progresso
}

function salvarProgresso() {
  localStorage.setItem("nivelAtual", nivelAtual);
  localStorage.setItem("xpAtual", xpAtual);
}

// Função para mostrar a comemoração no HTML
function mostrarComemoracao(mensagem) {
  const comemoracao = document.createElement("div");
  comemoracao.classList.add("comemoracao");
  comemoracao.textContent = mensagem;
  document.body.appendChild(comemoracao);

  // Remove a comemoração após 3 segundos
  setTimeout(() => {
    comemoracao.remove();
  }, 3000);
}

localStorage.setItem("nivel" + perfilAtivo, perfis[perfilAtivo].nivel);
localStorage.setItem("xp" + perfilAtivo, perfis[perfilAtivo].xp);

// Atualiza a interface ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarInterface);



// ===============================
// CONTADOR DE ÁGUA DIÁRIO
// ===============================

const LIMITE_LITROS = 4;

const adicionarLitroBtn = document.getElementById('adicionarLitroBtn');
const contadorDeLitros = document.getElementById('contadorDeLitros');
const aguaStat = document.getElementById('agua-stat');

// Data atual no formato YYYY-MM-DD
function obterDataHoje() {
    const agora = new Date();

    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}


// Carrega os dados da água
function carregarAgua() {

    const dataHoje = obterDataHoje();

    const dadosSalvos = JSON.parse(
        localStorage.getItem('estatisticaAgua')
    ) || {
        data: dataHoje,
        litros: 0
    };


    // Se for outro dia, reseta automaticamente
    if (dadosSalvos.data !== dataHoje) {

        dadosSalvos.data = dataHoje;
        dadosSalvos.litros = 0;

        localStorage.setItem(
            'estatisticaAgua',
            JSON.stringify(dadosSalvos)
        );
    }


    atualizarAgua(dadosSalvos.litros);
}


// Atualiza o contador e a estatística
function atualizarAgua(litros) {

    // Limita entre 0 e 4
    litros = Math.max(0, Math.min(litros, LIMITE_LITROS));

    // Contador principal
    if (contadorDeLitros) {
        contadorDeLitros.textContent =
            `${litros}/${LIMITE_LITROS} Litros`;
    }


    // Estatística em ML
    if (aguaStat) {
        aguaStat.textContent =
            litros * 1000;
    }
}


// Salva a quantidade de litros
function salvarAgua(litros) {

    const dados = {
        data: obterDataHoje(),
        litros: litros
    };

    localStorage.setItem(
        'estatisticaAgua',
        JSON.stringify(dados)
    );

    atualizarAgua(litros);
}


// Clique no botão de adicionar litro
if (adicionarLitroBtn) {

    adicionarLitroBtn.addEventListener('click', function () {

        const dataHoje = obterDataHoje();

        let dados = JSON.parse(
            localStorage.getItem('estatisticaAgua')
        ) || {
            data: dataHoje,
            litros: 0
        };


        // Verifica se mudou o dia
        if (dados.data !== dataHoje) {
            dados.data = dataHoje;
            dados.litros = 0;
        }


        // Máximo de 4 litros por dia
        if (dados.litros < LIMITE_LITROS) {

            dados.litros++;

            salvarAgua(dados.litros);

        } else {

            // Já atingiu os 4 litros
            atualizarAgua(LIMITE_LITROS);

            console.log('Limite diário de 4 litros atingido.');
        }
    });
}


// Carrega quando a página abre
carregarAgua();


// ===============================
// VERIFICAÇÃO AUTOMÁTICA DO NOVO DIA
// ===============================

// Caso a página fique aberta durante a virada do dia,
// verifica a cada 1 minuto se mudou a data.

setInterval(function () {

    const dataHoje = obterDataHoje();

    const dados = JSON.parse(
        localStorage.getItem('estatisticaAgua')
    );

    if (dados && dados.data !== dataHoje) {

        const novosDados = {
            data: dataHoje,
            litros: 0
        };

        localStorage.setItem(
            'estatisticaAgua',
            JSON.stringify(novosDados)
        );

        atualizarAgua(0);
    }

}, 60000);





function atualizarGymStat() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const key = `markedDays2-${currentMonth}-${currentYear}`;

    const markedDays2 = JSON.parse(
        localStorage.getItem(key)
    ) || [];

    const gymStat = document.getElementById("gym-stat");

    if (gymStat) {
        gymStat.textContent = markedDays2.length;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarGymStat();
});


function atualizarMelodyStat() {
    const now = new Date();
    const mesAno = `${now.getMonth()}-${now.getFullYear()}`;

    const markedDays = JSON.parse(
        localStorage.getItem(`markedDays-${mesAno}`)
    ) || [];

    const melodyStat = document.getElementById("melody-stat");

    if (melodyStat) {
        melodyStat.textContent = markedDays.length;
    }
}