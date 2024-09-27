const apiKey = 'AIzaSyAvpvehwHv1RN-vwnmth-3asp0kF0z5kPg';  // Substitua com sua chave de API do Google Gemini
const apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Referências aos elementos
const inputText = document.getElementById('inputText');
const status = document.getElementById('status');

// Função para mostrar o status
function showTypingStatus() {
    status.textContent = 'Digitando...';
    status.style.display = 'block';
}

// Função para esconder o status
function hideTypingStatus() {
    status.style.display = 'none';
}

// Adiciona evento de 'input' para detectar quando o usuário começa a digitar
inputText.addEventListener('input', () => {
    // Se o campo de texto não estiver vazio, mostra o status
    if (inputText.value.trim() !== '') {
        showTypingStatus();
    } else {
        hideTypingStatus();
    }
});
// Função para alternar o menu
function toggleMenu() {
    const menu = document.getElementById('overlayMenu');
    const chat = document.querySelector('.chat');
    const isOpen = menu.classList.contains('open');
    
    menu.classList.toggle('open', !isOpen);
    chat.classList.toggle('shift', !isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Atualiza o scroll da página
    menu.setAttribute('aria-hidden', isOpen ? 'true' : 'false'); // Atualiza o status de acessibilidade
}

// Função para abrir e fechar o menu ao pressionar "ESC"
function handleEscapeKey(event) {
    if (event.key === "Escape") {
        const menu = document.getElementById('overlayMenu');
        if (menu.classList.contains('open')) {
            toggleMenu(); // Fecha o menu se estiver aberto
        }
    }
}

// Função para lidar com a tecla pressionada no campo de entrada
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage(); // Chama a função sendMessage() ao pressionar Enter
    }
}

// Adicionar um listener para a tecla "Escape"
document.addEventListener('keydown', handleEscapeKey);


// Função para falar um texto em português
function falar(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; // Define o idioma para português
    synth.speak(utterance);
}

// Mensagens de saudação inicial
const saudacoesIniciais = [
    "Preparando as coisas... Olá, estou à sua disposição!",
    "Aguarde um instante... Olá",
    "Iniciando o sistema... Pronto",
    "Preparando Configurações... Olá, estou à disposição!",
    "Carregando recursos... Olá, como posso ser útil?",
    "Aguarde um momento... Olá, estou aqui para ajudar!",
];
const saudacaoInicial = saudacoesIniciais[Math.floor(Math.random() * saudacoesIniciais.length)];
falar(saudacaoInicial);

// Recomendação inicial
const recomendacoes = [
    "Dica: Mantenha-se hidratado e faça pausas regulares.",
    "Dica: Lembre-se de alongar-se durante o trabalho.",
    "Dica: Organize sua agenda para aumentar a produtividade.",
    "Dica: Reserve um tempo para atividades que você gosta.",
    "Dica: Encontre tempo para relaxar e cuidar de si mesmo.",
    "Dica: Seja gentil consigo mesmo e com os outros.",
];
const recomendacao = recomendacoes[Math.floor(Math.random() * recomendacoes.length)];
document.getElementById('recomendacoes').innerText = recomendacao;

// Função para adicionar animação de piscar nos olhos
function piscarOlhos() {
    const olhoEsquerdo = document.getElementById('olhoEsquerdo');
    const olhoDireito = document.getElementById('olhoDireito');
    olhoEsquerdo.classList.add('piscando');
    olhoDireito.classList.add('piscando');
    setTimeout(() => {
        olhoEsquerdo.classList.remove('piscando');
        olhoDireito.classList.remove('piscando');
    }, 200);
}

// Piscar os olhos a cada 3 segundos
setInterval(piscarOlhos, 3000);

// Função para enviar mensagens
function sendMessage() {
    const inputText = document.getElementById('inputText').value;
    if (inputText.trim() === "") return;
    
    sendMessageToAPI(inputText);
}

// Função para enviar a mensagem para a API do Google Gemini
function sendMessageToAPI(message) {
    const status = document.getElementById('status');
    const inputText = document.getElementById('inputText');
    const sendButton = document.getElementById('sendButton');

    status.style.display = 'block';
    status.innerHTML = 'Carregando...';
    sendButton.disabled = true;
    sendButton.style.cursor = 'not-allowed';
    inputText.disabled = true;

    fetch(`${apiEndpoint}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'pt-BR'  // Adicione esta linha para especificar o idioma
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log('Resposta da API:', response);  // Adicionado para depuração
        if (response.candidates && response.candidates.length > 0) {
            let candidate = response.candidates[0];
            console.log('Primeiro candidato:', candidate);  // Adicionado para depuração
            console.log('Conteúdo do candidato:', candidate.content);  // Adicionado para depuração
            
            let content = candidate.content;
            let r = 'Texto não encontrado';
            if (content && content.parts && content.parts.length > 0) {
                let part = content.parts[0];
                r = part.text || 'Texto não encontrado';  // Ajuste conforme a estrutura real
            }
            
            showHistory(message, r);
            falar(r);
        } else {
            status.innerHTML = 'Resposta inesperada da API. Verifique o console para mais detalhes.';
        }
    })
    .catch(e => {
        console.log(`Error -> ${e}`);
        status.innerHTML = 'Erro, tente novamente mais tarde...';
    })
    .finally(() => {
        sendButton.disabled = false;
        sendButton.style.cursor = 'pointer';
        inputText.disabled = false;
        inputText.value = '';
    });
}

// Função para mostrar histórico de mensagens
function showHistory(message, response) {
    const historyBox = document.getElementById('chatArea');

    const boxMyMessage = document.createElement('div');
    boxMyMessage.className = 'message sent';
    const myMessage = document.createElement('p');
    myMessage.className = 'my-message';
    myMessage.innerHTML = message;
    boxMyMessage.appendChild(myMessage);
    historyBox.appendChild(boxMyMessage);

    const boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'message received';
    const chatResponse = document.createElement('p');
    chatResponse.className = 'response-message';
    chatResponse.innerHTML = response;
    boxResponseMessage.appendChild(chatResponse);
    historyBox.appendChild(boxResponseMessage);

    historyBox.scrollTop = historyBox.scrollHeight;
}

// Inicializa funções após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', handleEscapeKey);
    window.handleKeyPress = handleKeyPress;
    window.toggleMenu = toggleMenu;
});

document.addEventListener('DOMContentLoaded', async () => {
    await fetchTemperature();
    await fetchWeatherForecast();
    await fetchNews();
    await fetchStocks();
});

async function fetchTemperature() {
    const apiKey = 'bd2aa057407fb66d24136dab032d5bb8';
    const city = 'Jacupiranga';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar temperatura: ' + response.status);
        }
        const data = await response.json();
        document.getElementById('temperature').textContent = `${data.main.temp} °C`;
    } catch (error) {
        console.error(error);
        document.getElementById('temperature').textContent = 'Erro ao carregar temperatura.';
    }
}

async function fetchWeatherForecast() {
    const apiKey = 'bd2aa057407fb66d24136dab032d5bb8';
    const city = 'Jacupiranga';
    
    // Dicionário de traduções
    const translations = {
        'clear sky': 'céu limpo',
        'few clouds': 'poucas nuvens',
        'scattered clouds': 'nuvens esparsas',
        'broken clouds': 'nuvens fragmentadas',
        'shower rain': 'chuva rápida',
        'rain': 'chuva',
        'thunderstorm': 'tempestade',
        'snow': 'neve',
        'mist': 'neblina',
        'light rain': 'chuva leve',
        'moderate rain': 'chuva moderada',
        'heavy intensity rain': 'chuva intensa',
        'very heavy rain': 'chuva muito intensa',
        'extreme rain': 'chuva extrema',
        'light snow': 'neve leve',
        'heavy snow': 'neve intensa',
        'sleet': 'chuva congelada',
        'hail': 'granizo',
    };

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar previsão do tempo: ' + response.status);
        }
        const data = await response.json();
        const forecast = data.list;
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        // Variáveis para armazenar temperaturas e descrições
        let todayTemp = null;
        let tomorrowTemp = null;
        let todayDesc = '';
        let tomorrowDesc = '';

        forecast.forEach(item => {
            const forecastDate = new Date(item.dt_txt);
            if (forecastDate.getDate() === today.getDate() &&
                forecastDate.getMonth() === today.getMonth() &&
                forecastDate.getFullYear() === today.getFullYear()) {
                todayTemp = item.main.temp;
                todayDesc = translations[item.weather[0].description] || item.weather[0].description; // Tradução do clima
            } else if (forecastDate.getDate() === tomorrow.getDate() &&
                       forecastDate.getMonth() === tomorrow.getMonth() &&
                       forecastDate.getFullYear() === tomorrow.getFullYear()) {
                tomorrowTemp = item.main.temp;
                tomorrowDesc = translations[item.weather[0].description] || item.weather[0].description; // Tradução do clima
            }
        });

        // Formatação da saída
        // Hoje ${todayTemp} °C (${todayDesc}), Amanhã ${tomorrowTemp} °C (${tomorrowDesc})
        let forecastText = `Amanhã ${tomorrowTemp} °C (${tomorrowDesc})`;
        document.getElementById('weatherForecast').textContent = forecastText;
    } catch (error) {
        console.error(error);
        document.getElementById('weatherForecast').textContent = 'Erro ao carregar previsão do tempo.';
    }
}

async function fetchNews() {
    const apiKey = '0677968389214cdfa1fe6bff826d68b2';
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar notícias: ' + response.status);
        }
        const data = await response.json();
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = ''; // Limpar lista anterior

        if (data.articles) {
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                newsList.appendChild(li);
            });
        } else {
            newsList.innerHTML = '<li>Nenhuma notícia disponível.</li>';
        }
    } catch (error) {
        console.error(error);
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '<li>Erro ao carregar notícias.</li>';
    }
}

async function fetchStocks() {
    const apiKey = 'W4QWE2694N3QS20K';
    const symbols = ['IBOV', 'DXY'];
    const stocksList = document.getElementById('stocksList');
    stocksList.innerHTML = ''; // Limpar lista anterior

    for (const symbol of symbols) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar ações: ' + response.status);
            }
            const data = await response.json();
            const timeSeries = data['Time Series (1min)'];
            
            if (timeSeries) {
                const latestTime = Object.keys(timeSeries)[0];
                const li = document.createElement('li');
                li.textContent = `${symbol}: ${timeSeries[latestTime]['1. open']}`;
                stocksList.appendChild(li);
            } else {
                const li = document.createElement('li');
                li.textContent = `${symbol}: Dados não disponíveis.`;
                stocksList.appendChild(li);
            }
        } catch (error) {
            console.error(error);
            const li = document.createElement('li');
            li.textContent = `Erro ao carregar dados para ${symbol}.`;
            stocksList.appendChild(li);
        }
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const clock = document.getElementById('clock');
    clock.textContent = `${hours}:${minutes}`;
}

// Atualiza o relógio a cada minuto
setInterval(updateClock, 60000);
// Chama a função uma vez para não esperar um minuto
updateClock();
