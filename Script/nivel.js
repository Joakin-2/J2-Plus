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
