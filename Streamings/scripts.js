document.addEventListener("DOMContentLoaded", function() {
    // Esconder a tela de carregamento após 2 segundos
    setTimeout(function() {
        document.getElementById("loading-screen").style.display = "none";
        document.querySelector("main").style.display = "block";
        document.body.style.overflow = "auto"; // Permitir rolagem
    }, 3000); // Tempo de espera em milissegundos (3 segundos)

    // Inicializar carrossel
    let slideIndex = 0;
    showSlides(slideIndex);

    // Trocar slide automaticamente a cada 1 minutos (60000 milissegundos)
    setInterval(function() {
        showSlides(++slideIndex);
    }, 60000); // 1 minutos
});

function openSite(url) {
    window.location.href = url;
}

function showSlides(index) {
    const slides = document.querySelectorAll('.carousel-slide img');
    const carouselContainer = document.querySelector('.carousel-slide');

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }

    // Aplica o fundo preto antes de mudar de slide
    carouselContainer.style.background = '#000';

    setTimeout(() => {
        // Muda o slide
        const offset = -slideIndex * 100 / slides.length; // Ajuste a largura do slide
        carouselContainer.style.transform = `translateX(${offset}%)`;

        // Adiciona a classe para animação de fade-in
        slides.forEach((slide, idx) => {
            if (idx === slideIndex) {
                slide.style.opacity = 0;
                setTimeout(() => {
                    slide.style.transition = 'opacity 2s ease-in-out';
                    slide.style.opacity = 1;
                }, 100); // Espera um pouco antes de iniciar a transição
            } else {
                slide.style.opacity = 0;
            }
        });

        // Remove o fundo preto após a transição
        setTimeout(() => {
            carouselContainer.style.background = 'transparent';
        }, 2000); // Tempo de espera antes de remover o fundo preto (2 segundos)
    }, 100); // Tempo de espera antes de aplicar o fundo preto (0.1 segundo)
}

function moveSlide(n) {
    // Adiciona a classe para animação de fade-out
    const slides = document.querySelectorAll('.carousel-slide img');
    slides.forEach(slide => {
        slide.style.transition = 'opacity 0.5s ease-in-out'; // Define a transição de opacidade
        slide.style.opacity = 0; // Define a opacidade inicial para 0
    });

    // Aguarda um pouco para a animação de fade-out
    setTimeout(() => {
        showSlides(slideIndex + n);

        // Remove a transição após a troca de slide
        setTimeout(() => {
            slides.forEach(slide => {
                slide.style.transition = 'none'; // Remove a transição
                slide.style.opacity = 1; // Restaura a opacidade para 1
            });
        }, 500); // Tempo de espera para a animação de opacidade (0.5s)
    }, 500); // Tempo de espera para a animação de opacidade (0.5s)
}

// Função para abrir o modal de seleção de perfil
function openProfileModal() {
    document.getElementById("profileModal").style.display = "block";
}

// Fechar o modal de seleção de perfil
function closeProfileModal() {
    document.getElementById("profileModal").style.display = "none";
}

// Abrir o modal de controle parental
function openParentalControl(profile) {
    document.getElementById("parentalControlModal").style.display = "block";
    const accessCodeInput = document.getElementById("accessCode");
    accessCodeInput.value = "";
    accessCodeInput.dataset.profile = profile;
    setTips(profile);
    document.getElementById("errorMessage").style.display = "none";
}

// Função chamada ao clicar em um botão de perfil
function openYouTube(profile) {
    console.log("Perfil selecionado:", profile);

    if (profile === 'perfil1') {
        window.open("joca/index.html", "_blank");
    } else if (profile === 'perfil2') {
        window.open("vick/index.html", "_blank");
    } else if (profile === 'perfil3' || profile === 'perfil4') {
        openParentalControl(profile);
    }
}

// Exibe dica de senha com base no perfil
function setTips(profile) {
    const tipsElement = document.getElementById("tips");
    if (profile === 'perfil3') {
        tipsElement.innerHTML = "Dica: Senha já conhecida.";
    } else if (profile === 'perfil4') {
        tipsElement.innerHTML = "Dica: A senha está relacionada aos animais de estimação.";
    } else {
        tipsElement.innerHTML = "";
    }
}

// Valida o código de acesso e redireciona
function validateCode() {
    const accessCode = document.getElementById("accessCode").value.trim().toLowerCase();
    const profile = document.getElementById("accessCode").dataset.profile;
    const modalContent = document.querySelector("#parentalControlModal .modal-content");

    let targetURL = null;

    if (profile === 'perfil3') {
        if (accessCode === "0709") {
            targetURL = "https://www.youtube.com/feed/you";
        } else if (accessCode === "jogo") {
            targetURL = "https://redecanaistv.dev/assistir-premiere-clubes-online-24-horas-ao-vivo_128696632.html";
        }
    } else if (profile === 'perfil4' && accessCode === "pets") {
        targetURL = "https://www.youtube.com/@KOTARO_OTTER";
    }

    if (targetURL) {
        modalContent.innerHTML = "<h2 style='color: #ff0000;'>Controle paternal</h2><div style='color: #00ff00; margin-top: 10px;'>Senha Correta</div>";
        setTimeout(() => {
             window.open(targetURL, "_blank");          // Abre o destino em nova aba
             window.location.href = "about:blank";      // Redireciona a aba atual
             window.close(); 
        }, 1000);
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}

// Fecha o modal de controle parental
function closeModal() {
    document.getElementById("parentalControlModal").style.display = "none";
}

// Fecha modais ao clicar fora deles
window.onclick = function(event) {
    if (event.target === document.getElementById("profileModal")) {
        closeProfileModal();
    }
    if (event.target === document.getElementById("parentalControlModal")) {
        closeModal();
    }
}

// Redirecionamento genérico
function openSite(url) {
    window.location.href = url;
}
