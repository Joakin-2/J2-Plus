let nivelAtual = localStorage.getItem("nivelAtual") 
                 ? parseInt(localStorage.getItem("nivelAtual")) 
                 : 1;
let xpAtual = localStorage.getItem("xpAtual") 
              ? parseInt(localStorage.getItem("xpAtual")) 
              : 0;
let xpNecessario = 100 * (nivelAtual * nivelAtual);

function ganharXp(xp) {
  xpAtual += xp;
  if (xpAtual >= xpNecessario) {
    xpAtual -= xpNecessario;
    nivelAtual++;
    xpNecessario = 100 * (nivelAtual * nivelAtual);
    mostrarComemoracao(`Parabéns! Você alcançou o nível ${nivelAtual}!`);
  }
  salvarProgresso();
  atualizarInterface();
}

function atualizarInterface() {
  const progressBar = document.getElementById("progress-bar");
  const nivelSpan = document.getElementById("nivel");
  const xpAtualSpan = document.getElementById("xp-atual");
  const xpNecessarioSpan = document.getElementById("xp-necessario");

  if (nivelSpan && xpAtualSpan && xpNecessarioSpan && progressBar) {
    nivelSpan.textContent = nivelAtual;
    xpAtualSpan.textContent = xpAtual;
    xpNecessarioSpan.textContent = xpNecessario;

    const progresso = (xpAtual / xpNecessario) * 100;
    progressBar.style.width = `${progresso}%`;
    progressBar.textContent = `${Math.round(progresso)}%`;
  }
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

// Atualiza a interface ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarInterface);
