const btnNoite = document.getElementById("btn-noite");
const btnFundo = document.getElementById("btn-fundo");

const iframe = document.getElementById("background-video");
const videoLocal = document.getElementById("video-local");
const source = document.getElementById("background-source");

const loadingScreen = document.getElementById("loading-screen");

/* ---------------- ESTADO ---------------- */

let estado = "home";
let bloqueadoNoite = false;

/* ---------------- HOME ---------------- */

function abrirHome() {

    estado = "home";

    iframe.style.display = "none";


    videoLocal.src = "https://www.pexels.com/download/video/35730936/";
    videoLocal.style.display = "block";

    videoLocal.load();
    videoLocal.play();
}

/* ---------------- NOITE ---------------- */

function abrirNoite() {

    if (bloqueadoNoite) return;

    estado = "noite";
    bloqueadoNoite = true;

    iframe.style.display = "none";

    videoLocal.style.display = "block";

    source.src = "/Script/Sleep.mp4";

    videoLocal.load();
    videoLocal.play();

    loadingScreen.style.display = "flex";

    setTimeout(() => {

        loadingScreen.style.display = "none";
        bloqueadoNoite = false;

    }, 3000);
}

function verificarBotaoNoite() {

    const hora = new Date().getHours();

    if (hora >= 22 || hora < 7) {
        btnNoite.style.display = "block";
    } else {
        btnNoite.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    abrirHome();

    verificarBotaoNoite(); // <- IMPORTANTE

    updateClock();
    updateDate();
    getTemperature();

    setInterval(updateClock, 1000);
    setInterval(updateDate, 60000);
    setInterval(getTemperature, 600000);

    // atualiza o botão todo minuto
    setInterval(verificarBotaoNoite, 60000);
});

/* ---------------- FUNDO ---------------- */

function abrirFundo() {

    estado = "fundo";

    videoLocal.style.display = "none";

    iframe.style.display = "block";

    atualizarFundoAutomatico();
}

/* ---------------- TOGGLE NOITE ---------------- */

btnNoite.addEventListener("click", () => {

    if (estado === "noite") {
        abrirHome();
    } else {
        abrirNoite();
    }
});

/* ---------------- TOGGLE FUNDO ---------------- */

btnFundo.addEventListener("click", () => {

    if (estado === "fundo") {
        abrirHome();
    } else {
        abrirFundo();
    }
});

/* ---------------- FUNDO YOUTUBE ---------------- */

function atualizarFundoAutomatico() {

    const hora = new Date().getHours();

    if (hora >= 23 || hora < 6) {

        iframe.style.display = "none";

        videoLocal.src = "https://www.pexels.com/download/video/855205/";
        videoLocal.style.display = "block";

        videoLocal.load();
        videoLocal.play();

    } else {

        iframe.style.display = "none";

        videoLocal.src = "https://www.pexels.com/download/video/7762080/";
        videoLocal.style.display = "block";

        videoLocal.load();
        videoLocal.play();
    }
}

/* ---------------- RELÓGIO ---------------- */

function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0") + ":" +
        String(now.getSeconds()).padStart(2, "0");
}

/* ---------------- DATA ---------------- */

function updateDate() {

    const now = new Date();

    let data = now.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("date").textContent =
        data.replace("-feira", "");
}

/* ---------------- CLIMA ---------------- */

const apiKey = "bd2aa057407fb66d24136dab032d5bb8";
const city = "Jacupiranga";

async function getTemperature() {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
        );

        const data = await response.json();

        document.getElementById("temperature").textContent =
            Math.round(data.main.temp) + "°C";

        const icons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Snow: "❄️",
            Thunderstorm: "⛈️",
            Drizzle: "🌦️"
        };

        document.getElementById("weather-icon").textContent =
            icons[data.weather[0].main] || "🌥️";

    } catch (error) {
        console.error("Erro ao obter clima:", error);
    }
}

/* ---------------- INICIALIZAÇÃO ---------------- */

document.addEventListener("DOMContentLoaded", () => {

    abrirHome();

    updateClock();
    updateDate();
    getTemperature();

    setInterval(updateClock, 1000);
    setInterval(updateDate, 60000);
    setInterval(getTemperature, 600000);
});