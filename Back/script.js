document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateClock, 1000);  // Atualiza o relógio a cada segundo
    updateClock();  // Atualiza o relógio imediatamente
    updateDate();   // Atualiza a data imediatamente
    getTemperature();  // Obtém a temperatura inicialmente
});

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-br', options);
    document.getElementById('date').textContent = formattedDate;
}

const apiKey = 'bd2aa057407fb66d24136dab032d5bb8'; // Substitua com a sua chave de API do OpenWeatherMap
const city = 'Jacupiranga'; // Substitua com o nome da cidade desejada

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getTemperature() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro ao obter a temperatura: ${response.status}`);
        }

        const data = await response.json();
        const temperaturaKelvin = data.main.temp;
        const temperaturaCelsius = (temperaturaKelvin - 273.15).toFixed(2); // Convertendo para Celsius e fixando duas casas decimais

        document.getElementById('temperature').textContent = `Temperatura: ${temperaturaCelsius}°C`;
    } catch (error) {
        console.error(`Erro ao obter a temperatura: ${error.message}`);
    }
}


// Define intervalos para atualizar a data e o relógio a cada minuto
setInterval(updateDate, 1000);
setInterval(getTemperature, 1000);
