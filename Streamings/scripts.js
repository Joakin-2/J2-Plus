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
