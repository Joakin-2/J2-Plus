const apiKey = 'AIzaSyAvpvehwHv1RN-vwnmth-3asp0kF0z5kPg';  // Substitua com sua chave de API do Google Gemini
const apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const apiKey2 = 'bd2aa057407fb66d24136dab032d5bb8'; // Sua chave de API
const city = 'Jacupiranga'; // A cidade para a qual você deseja buscar a previsão do tempo
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey2}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Exibe os dados da resposta da API
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });


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

// Função para detectar o comando e abrir um site
function detectCommand(event) {
  const inputText = document.getElementById('inputText');
  const message = inputText.value.trim();

  if (message === '/modulos') {
      // Abre o site desejado
      window.open('Módulos/index.html', '_blank'); // Substitua pelo URL do site que deseja abrir
      inputText.value = ''; // Limpa o campo de entrada após a execução do comando
  }
}

// Adiciona um evento de 'input' ao campo de texto
document.getElementById('inputText').addEventListener('input', detectCommand);

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

function toggleMenu2() {
    const menu = document.getElementById('overlayMenu2');
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
        const menu1 = document.getElementById('overlayMenu');
        const menu2 = document.getElementById('overlayMenu2');

        if (menu1.classList.contains('open')) {
            toggleMenu(); // Fecha o menu se estiver aberto
        } else if (menu2.classList.contains('open')) {
            toggleMenu2(); // Fecha o segundo menu se estiver aberto
        }
    }
}

// Adicione o listener para o evento de tecla
document.addEventListener('keydown', handleEscapeKey);

// Função para lidar com a tecla pressionada no campo de entrada
function handleKeyPress(event) {
    const inputText = document.getElementById('inputText');

    if (event.key === 'Enter' && event.shiftKey) {
        // Adiciona uma nova linha
        event.preventDefault(); // Previne o comportamento padrão de Enter
        inputText.value += '\n'; // Adiciona uma nova linha no valor da entrada de texto
    } else if (event.key === 'Enter' && !event.shiftKey) {
        // Envia a mensagem
        event.preventDefault();  // Impede a ação padrão de enviar um formulário (se houver)
        sendMessage();  // Chama a função sendMessage() para enviar a mensagem
    }
}

// Adiciona o listener para a tecla "Enter" e "Shift + Enter"
document.getElementById('inputText').addEventListener('keypress', handleKeyPress);

// Exemplo da função sendMessage para enviar a mensagem
function sendMessage() {
  const inputText = document.getElementById('inputText');
  const message = inputText.value.trim(); // Captura o valor e remove espaços desnecessários

  if (message === "") return; // Se a mensagem estiver vazia, não faz nada

  // Exibir "digitando..." antes de enviar
  updateStatus('Digitando...');

  // Envia a mensagem para a API
  sendMessageToAPI(message);

  // Limpa o campo de entrada após o envio
  inputText.value = '';

  console.log("Mensagem enviada: ", message); // Registra no console a mensagem enviada
}

// Exemplo de função para lidar com a tecla "Escape" (opcional)
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        document.getElementById('inputText').value = ''; // Limpa o campo de entrada ao pressionar "Escape"
    }
}

// Adicionar um listener para a tecla "Escape"
document.addEventListener('keydown', handleEscapeKey);

// Função para falar um texto em português
function falar(texto) {
    const synth = window.speechSynthesis;
    synth.cancel(); // evita sobreposição/repetição

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    let jaFalou = false;

    function escolherVoz() {
        if (jaFalou) return;
        jaFalou = true;

        const vozes = synth.getVoices();

        const vozFeminina = vozes.find(voz =>
            voz.name.includes("Francisca")//||
            //voz.name.includes("Thalita")
        );

        utterance.voice = vozFeminina || vozes.find(v => v.lang === 'pt-BR');
        synth.speak(utterance);

        synth.onvoiceschanged = null; // remove o listener
    }

    if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = escolherVoz;
    } else {
        escolherVoz();
    }
}

// Saudação
const saudacoesIniciais = [
    "Preparando as coisas... Olá, estou à sua disposição!",
    "Aguarde um instante... Olá",
    "Iniciando o sistema... Pronto",
    "Preparando configurações... Olá, estou à disposição!",
    "Carregando recursos... Olá, como posso ser útil?",
    "Aguarde um momento... Olá, estou aqui para ajudar!"
];

const saudacaoInicial =
    saudacoesIniciais[Math.floor(Math.random() * saudacoesIniciais.length)];

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

// Função para exibir status de carregamento
function updateStatus(message) {
    const status = document.getElementById('status');
    status.style.display = 'block';
    status.innerHTML = message;
}

// Variável global para armazenar o histórico de mensagens
let messageHistory = [];

async function sendMessage() {
    const inputText = document.getElementById('inputText');
    const message = inputText.value.trim();

    if (!message) return; // Não envia mensagem vazia

    // Adiciona a mensagem do usuário ao histórico
    addMessageToChat(message, 'user');

    // Limpa o input
    inputText.value = '';

    // Envia ao API
    await sendMessageToAPI(message);
}

// Função para enviar a mensagem à API
async function sendMessageToAPI(message) {
    const sendButton = document.getElementById('sendButton');
    const inputText = document.getElementById('inputText');

    sendButton.disabled = true;
    sendButton.style.cursor = 'not-allowed';
    inputText.disabled = true;

    try {
        // Prepara o corpo com o histórico
        const messages = messageHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
        // Adiciona a nova mensagem do usuário
        messages.push({ role: 'user', content: message });

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'Sem resposta';

        // Adiciona a resposta ao histórico
        addMessageToChat(reply, 'bot');

        // Atualiza o histórico para o próximo ciclo
        messageHistory.push({ role: 'assistant', content: reply });

    } catch (e) {
        console.error('Erro ao chamar a API:', e);
        addMessageToChat('Erro ao se comunicar com a API.', 'bot');
    } finally {
        // Restaura o botão
        sendButton.disabled = false;
        sendButton.style.cursor = 'pointer';
        document.getElementById('inputText').disabled = false;
        // Rola para o final da conversa
        scrollChatToBottom();
    }
}

// Função para adicionar uma mensagem na interface
function addMessageToChat(content, role) {
    const chatArea = document.getElementById('chatArea');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (role === 'user') {
        messageDiv.classList.add('my-message');
    } else {
        messageDiv.classList.add('response-message');
    }

    messageDiv.textContent = content;
    chatArea.appendChild(messageDiv);
}

// Função para rolar para o final
function scrollChatToBottom() {
    const chatArea = document.getElementById('chatArea');
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Função para atualizar a resposta na interface do usuário
function updateLastResponse(response) {
    const responseElement = document.getElementById('chatArea'); // ID do elemento de resposta
    if (responseElement) {
        responseElement.textContent = response;
    }
}

// Função para identificar se o texto é código
function isCode(text) {
    const codePatterns = [
        /```[\s\S]*```/,
        /<\s*script.*>/,
        /\bfunction\b|\bconst\b|\blet\b|\bvar\b/,
        /\bdef\b|\bclass\b/
    ];
    
    return codePatterns.some(pattern => pattern.test(text));
}

// Função para formatar o código com marcação HTML
function formatCode(code) {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
}

// Função para escapar caracteres especiais em HTML
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<>"'`]/g, function (char) {
        return `&#${char.charCodeAt(0)};`;
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

    // Exibe a resposta formatada
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
    // await fetchNews();
    await exibirCotacoes();
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

let effectsActive2 = true;  // Controla se os efeitos estão ativos ou não

// Função para alternar os efeitos de clima
function toggleWeatherEffects() {
  if (effectsActive2) {
    // Desativa os efeitos de clima
    deactivateRainEffect();
    deactivateCloudEffect();
  } else {
    // Ativa os efeitos de clima de acordo com o clima atual
    const weatherElement = document.getElementById('weatherForecast');
    const weatherDescription = weatherElement ? weatherElement.innerText : '';
    
    if (weatherDescription.includes('chuva') || weatherDescription.includes('drizzle') || weatherDescription.includes('shower')) {
      activateRainEffect();
    }
    
    if (weatherDescription.includes('nuvens') || weatherDescription.includes('clouds')) {
      activateCloudEffect();
    }
  }
  
  // Alterna o estado
  effectsActive2 = !effectsActive2;
}

// Adicionando o event listener para o botão de alternância
document.getElementById('toggleEffectButton2').addEventListener('click', toggleWeatherEffects);

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
      'drizzle': 'chuvisco',
      'overcast clouds': 'nuvens densas',
      'fog': 'névoa',
      'sand': 'areia',
      'dust': 'poeira',
      'volcanic ash': 'cinza vulcânica',
      'squalls': 'rajadas',
      'tornado': 'tornado'
  };

  // Dicionário de ícones correspondentes ao clima
  const weatherIcons = {
    'clear sky': 'fas fa-sun',
    'few clouds': 'fas fa-cloud-sun',
    'scattered clouds': 'fas fa-cloud-sun',
    'broken clouds': 'fas fa-cloud',
    'shower rain': 'fas fa-cloud-showers-heavy',
    'rain': 'fas fa-cloud-rain',
    'thunderstorm': 'fas fa-bolt',
    'snow': 'fas fa-snowflake',
    'mist': 'fas fa-smog',
    'light rain': 'fas fa-cloud-rain',
    'moderate rain': 'fas fa-cloud-rain',
    'heavy intensity rain': 'fas fa-cloud-showers-heavy',
    'very heavy rain': 'fas fa-cloud-showers-heavy',
    'extreme rain': 'fas fa-cloud-showers-heavy',
    'light snow': 'fas fa-snowflake',
    'heavy snow': 'fas fa-snowflake',
    'sleet': 'fas fa-cloud-meatball',
    'hail': 'fas fa-cloud-meatball',
    'drizzle': 'fas fa-cloud-drizzle',
    'overcast clouds': 'fas fa-cloud',
    'fog': 'fas fa-smog',
    'sand': 'fas fa-sand',
    'dust': 'fas fa-dust',
    'volcanic ash': 'fas fa-cloud',
    'squalls': 'fas fa-wind',
    'tornado': 'fas fa-tornado'
  };

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const translatedDescription = translations[weatherDescription] || weatherDescription;

      // Atualizando o conteúdo do parágrafo
      const weatherElement = document.getElementById('weatherForecast');
      const weatherIconElement = document.getElementById('weatherIcon');
      
      // Atualizando a descrição do clima
      weatherElement.innerHTML = `Clima: ${translatedDescription}`;

      // Definindo o ícone correspondente
      const iconClass = weatherIcons[weatherDescription] || 'fas fa-cloud';
      weatherIconElement.className = iconClass; // Definindo a classe do ícone

      // Verificando se é um clima de chuva e ativando o efeito de chuva
      if (weatherDescription.includes('rain') || weatherDescription.includes('drizzle') || weatherDescription.includes('shower')) {
        activateRainEffect(); // Ativando o efeito de chuva
        deactivateCloudEffect(); // Garantindo que o efeito de nuvens será removido
      } else {
        deactivateRainEffect(); // Desativando o efeito de chuva
      }

      // Verificando se é um clima com nuvens e ativando o efeito de nuvens
      if (weatherDescription.includes('clouds') || weatherDescription.includes('nuvens')) {
        activateCloudEffect(); // Ativando o efeito de nuvens
      } else {
        deactivateCloudEffect(); // Removendo as nuvens
      }

    } else {
      const weatherElement = document.getElementById('weatherForecast');
      weatherElement.innerHTML = 'Erro ao obter os dados do clima. Tente novamente mais tarde.';
    }
  } catch (error) {
    const weatherElement = document.getElementById('weatherForecast');
    weatherElement.innerHTML = 'Erro na requisição: ' + error;
  }
}

// Função para ativar o efeito de chuva
function activateRainEffect() {
  for (let i = 0; i < 100; i++) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(raindrop);
  }
}

// Função para desativar o efeito de chuva
function deactivateRainEffect() {
  const raindrops = document.querySelectorAll('.raindrop');
  raindrops.forEach(raindrop => raindrop.remove());
}

// Função para ativar o efeito de nuvens
function activateCloudEffect() {
  for (let i = 0; i < 5; i++) { // Número de nuvens a serem criadas
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    cloud.style.width = `${Math.random() * 200 + 150}px`; // Largura variável para as nuvens
    cloud.style.height = `${Math.random() * 50 + 30}px`; // Altura variável para as nuvens
    cloud.style.top = `${Math.random() * 50 + 10}%`; // Posição Y aleatória
    cloud.style.animationDuration = `${Math.random() * 20 + 30}s`; // Duração aleatória da animação
    document.body.appendChild(cloud);
  }
}

// Função para desativar o efeito de nuvens
function deactivateCloudEffect() {
  const clouds = document.querySelectorAll('.cloud');
  clouds.forEach(cloud => cloud.remove());
}

async function fetchNews() {
    const apiKeyNews = '0677968389214cdfa1fe6bff826d68b2';
    const urlNews = `https://newsapi.org/v2/everything?q=brasil&apiKey=${apiKeyNews}`; // Mudança para o endpoint "everything"
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '<li>Carregando notícias...</li>'; // Placeholder enquanto carrega

    try {
        const response = await fetch(urlNews);
        const data = await response.json();

        // Limpa a lista de notícias
        newsList.innerHTML = '';

        if (data.status === 'ok' && data.articles.length > 0) {
            // Preenche a lista com as notícias
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${article.title}</strong><br>
                    <a href="${article.url}" target="_blank">Leia mais</a>
                `;
                newsList.appendChild(li);
            });
        } else {
            newsList.innerHTML = '<li>Sem notícias disponíveis no momento.</li>';
        }
    } catch (error) {
        console.error('Erro ao buscar as notícias:', error);
        newsList.innerHTML = '<li>Erro ao carregar as notícias. Tente novamente mais tarde.</li>';
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const clock = document.getElementById('clock');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
// Chama imediatamente
updateClock();

async function fetchCotacaoDolar() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    const cotacaoAtual = parseFloat(data.USDBRL.bid);
    return {
        atual: cotacaoAtual,
        anterior: cotacaoAtual // não tem variação, só mostra 0%
    };
}

    async function fetchIbovespa() {
        const response = await fetch('https://brapi.dev/api/quote/^BVSP?token=oHx6DYAv1hWwoZMYxKqmgs');
        const data = await response.json();
        const ibov = data.results?.[0]?.regularMarketPrice;
        return ibov || null;
    }

    async function exibirCotacoes() {
        const ibovespaItem = document.getElementById('ibovespaItem');
        const dolarItem = document.getElementById('dolarItem');

        try {
            const [dolarData, ibovespa] = await Promise.all([
                fetchCotacaoDolar(),
                fetchIbovespa()
            ]);

            const { atual, anterior } = dolarData;
            const variacao = atual - anterior;
            const variacaoPorcento = (variacao / anterior) * 100;
            const classe = variacao >= 0 ? 'positivo' : 'negativo';

            const ibovFormatado = ibovespa ? ibovespa.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'indisponível';

            ibovespaItem.textContent = `Ibovespa: ${ibovFormatado}`;
            dolarItem.innerHTML = `Dólar - R$ ${atual.toFixed(2)} <span class="${classe}">(${Math.abs(variacaoPorcento).toFixed(2)}%)</span>`;
        } catch (error) {
            console.error('Erro ao carregar cotações:', error);
            ibovespaItem.textContent = 'Ibovespa - erro ao carregar';
            dolarItem.textContent = 'Dólar - erro ao carregar';
        }
    }

    document.addEventListener('DOMContentLoaded', exibirCotacoes);

// Camera
document.addEventListener('DOMContentLoaded', () => {
  let isCameraActive = false;
  let currentStream = null;
  let labeledDescriptors = [];
  let modelsLoaded = false;

  const video = document.getElementById('video');
  const cameraModal = document.getElementById('cameraModal');
  const cameraOptions = document.getElementById('cameraOptions');
  const openCameraBtn = document.getElementById('openCamera');

  // Tornar modal arrastável
  (() => {
    const modal = cameraModal;
    const modalContent = document.querySelector('.modal-content');
    let offsetX = 0, offsetY = 0, isDragging = false;

    modalContent.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - modal.offsetLeft;
      offsetY = e.clientY - modal.offsetTop;
      document.body.style.cursor = 'move';
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) {
        modal.style.left = `${e.clientX - offsetX}px`;
        modal.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.cursor = 'default';
    });
  })();

  // Carregar modelos e descritor Joaquim
  async function loadModelsAndDescriptor() {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('Script/Facial/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('Script/Facial/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('Script/Facial/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('Script/Facial/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('Script/Facial/models'), // ✅ ESSENCIAL
    ]);
    await loadJoaquimDescriptor();
    modelsLoaded = true;
  }  

  async function loadJoaquimDescriptor() {
    const img = await faceapi.fetchImage('Script/Facial/joaquim.jpg');
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      console.error("Não foi possível detectar o rosto na imagem de Joaquim.");
      return;
    }

    const descriptor = new faceapi.LabeledFaceDescriptors('Joaquim', [detection.descriptor]);
    labeledDescriptors.push(descriptor);
  }

  // Abrir câmera
  openCameraBtn.addEventListener('click', async () => {
    if (isCameraActive) {
      // Desligar câmera
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
      }
      cameraModal.style.display = 'none';
      openCameraBtn.classList.remove('fa-eye');
      openCameraBtn.classList.add('fa-camera');
      cameraOptions.style.display = 'none';
      isCameraActive = false;
    } else {
      // Ativar câmera
      if (!modelsLoaded) await loadModelsAndDescriptor();

      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const cameras = devices.filter(d => d.kind === 'videoinput');
          const cameraList = document.getElementById('cameraList');
          cameraList.innerHTML = '';
          cameras.forEach((device, i) => {
            const li = document.createElement('li');
            li.textContent = device.label || `Câmera ${i + 1}`;
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
              startCamera(device.deviceId);
              cameraOptions.style.display = 'none';
            });
            cameraList.appendChild(li);
          });
          cameraOptions.style.display = 'block';
        });

      openCameraBtn.classList.remove('fa-camera');
      openCameraBtn.classList.add('fa-eye');
      isCameraActive = true;
    }
  });

  // Função para iniciar a câmera
  function startCamera(deviceId) {
    navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } }
    }).then(stream => {
      video.srcObject = stream;
      currentStream = stream;
      cameraModal.style.display = 'block';
      startDetection();
    }).catch(err => console.error(err));
  }

  // Fechar modal
  document.getElementById('closeModalCamera').addEventListener('click', () => {
    cameraModal.style.display = 'none';
  });

  // Face detection + reconhecimento
  function startDetection() {
    video.onloadedmetadata = () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.appendChild(canvas);
  
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);
  
      let lastRun = 0;
      const intervalMs = 1000;
  
      async function detectionLoop(timestamp) {
        if (timestamp - lastRun >= intervalMs) {
          lastRun = timestamp;
  
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 160 }))
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptors();
  
          const resized = faceapi.resizeResults(detections, displaySize);
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
  
          faceapi.draw.drawDetections(canvas, resized);
          faceapi.draw.drawFaceLandmarks(canvas, resized);
          faceapi.draw.drawFaceExpressions(canvas, resized);
  
          if (labeledDescriptors.length > 0) {
            const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
            resized.forEach(det => {
              const match = matcher.findBestMatch(det.descriptor);
              const box = det.detection.box;
              const drawBox = new faceapi.draw.DrawBox(box, { label: match.label });
              drawBox.draw(canvas);
            });
          }
        }
  
        requestAnimationFrame(detectionLoop);
      }
  
      requestAnimationFrame(detectionLoop);
    };
  }  
});

  let currentSeason = '';

  // Função para verificar a estação atual e ativar efeitos
  function checkSeason() {
    const today = new Date();
    const month = today.getMonth(); // Mês atual (0-11)
    const day = today.getDate();    // Dia atual (1-31)

    let seasonMessage = '';
    let seasonEffect = '';

    // Verifica o primeiro dia de cada estação

    // Primavera: 22 de setembro a 21 de dezembro
    if (month === 8 && day === 22) {
      seasonMessage = "🌸 Bem-vindo à Primavera! 🌼";
      seasonEffect = "spring";
      seasonNotification = "Lembrete: Hoje é o primeiro dia da Primavera!";
    }
    // Verão: 22 de dezembro a 20 de março
    else if (month === 11 && day === 22) {
      seasonMessage = "☀️ É Verão! Aproveite o calor! 🌴";
      seasonEffect = "summer";
      seasonNotification = "Lembrete: Hoje é o primeiro dia do Verão!";
    }
    // Outono: 21 de março a 20 de junho
    else if (month === 2 && day === 21) {
      seasonMessage = "🍂 Outono chegou! O ar fresco está no ar. 🍁";
      seasonEffect = "autumn";
      seasonNotification = "Lembrete: Hoje é o primeiro dia do Outono!";
    }
    // Inverno: 21 de junho a 21 de setembro
    else if (month === 5 && day === 21) {
      seasonMessage = "❄️ Inverno chegou! Prepare-se para o frio! 🧣";
      seasonEffect = "winter";
      seasonNotification = "Lembrete: Hoje é o primeiro dia do Inverno!";
    }

    // Se for o primeiro dia da estação, exibe a mensagem e ativa o efeito
    if (seasonMessage) {
        document.getElementById('Text').innerText = seasonMessage;
        document.getElementById('Message').style.display = 'block'; // Exibe a mensagem
        activateSeasonEffect(seasonEffect);

        // Adiciona a notificação de estação
        notifications.push(seasonNotification);
        document.getElementById("notificationCount").innerText = notifications.length;
    }
    currentSeason = seasonEffect;
}

function checkSeason2() {
  const today = new Date();
  const month = today.getMonth(); // Mês atual (0-11)
  const day = today.getDate();    // Dia atual (1-31)

  let seasonMessage = '';
  let seasonEffect = '';
  
  // Definindo a data do primeiro e último dia de cada estação
  const firstDays = {
      spring: { month: 8, day: 23 },
      summer: { month: 11, day: 23 },
      autumn: { month: 2, day: 22 },
      winter: { month: 5, day: 22 }
  };
  
  const lastDays = {
      spring: { month: 11, day: 21 },
      summer: { month: 2, day: 20 },
      autumn: { month: 5, day: 20 },
      winter: { month: 8, day: 21 }
  };

  const seasons = ['spring', 'summer', 'autumn', 'winter'];

  // Verifica em qual estação estamos com base na data de hoje
  for (let season of seasons) {
      let firstDay = firstDays[season];
      let lastDay = lastDays[season];

      // Verifica se estamos dentro da estação (depois do primeiro dia, antes do último dia)
      if (
        (month === firstDay.month && day >= firstDay.day) ||
        (month > firstDay.month && month < lastDay.month) ||
        (month === lastDay.month && day <= lastDay.day)
    ) {
        if (season === 'spring') {
            seasonEffect = "spring";
        } else if (season === 'summer') {
            seasonEffect = "summer";
        } else if (season === 'autumn') {
            seasonEffect = "autumn";
        } else if (season === 'winter') {
            seasonEffect = "winter";
        }

        // Exibe o efeito da estação
        activateSeasonEffect(seasonEffect);

        // Notificação com o nome das estações traduzido para português
        let seasonNameInPortuguese;
        if (season === 'spring') {
            seasonNameInPortuguese = 'Primavera';
        } else if (season === 'summer') {
            seasonNameInPortuguese = 'Verão';
        } else if (season === 'autumn') {
            seasonNameInPortuguese = 'Outono';
        } else if (season === 'winter') {
            seasonNameInPortuguese = 'Inverno';
        }

        // Adiciona a notificação com a estação traduzida
        notifications.push(`Lembrete: Estamos no meio do ${seasonNameInPortuguese}!`);
        document.getElementById("notificationCount").innerText = notifications.length;

        break; // Sai do loop assim que encontrar a estação correta
    }
  }
  currentSeason = seasonEffect;
}

// Variável para controlar os efeitos criados (deve ser definida globalmente)
let activeEffects = []; // Inicializa o array global para armazenar os elementos criados

// Variável para controlar se o efeito da estação está ativado ou não
let isEffectActive = true;

// Adiciona o event listener para o botão
document.getElementById('toggleEffectButton').addEventListener('click', toggleSeasonEffect);

function toggleSeasonEffect() {
    // Se o efeito estiver ativo, desative-o
    if (isEffectActive) {
        // Remove a classe da estação (efeito)
        document.body.classList.remove('spring', 'summer', 'autumn', 'winter');
        
        // Remove os elementos criados para o efeito visual
        removeActiveEffects();

        // Esconde a mensagem da estação
        document.getElementById('Message').style.display = 'none';

        // Altera o ícone ou estilo do botão para refletir a mudança
        document.getElementById('toggleEffectButton').innerHTML = '<i class="fas fa-leaf"></i>';

    } else {
        // Caso o efeito esteja desativado, ativa-o de novo
        activateSeasonEffect(currentSeason); // 'currentSeason' precisa ser a estação ativa no momento

        // Exibe a mensagem da estação
        //document.getElementById('Message').style.display = 'block';

        // Altera o ícone ou estilo do botão
        document.getElementById('toggleEffectButton').innerHTML = '<i class="fas fa-leaf"></i>';
    }

    // Alterna o estado da variável que controla se o efeito está ativo ou não
    isEffectActive = !isEffectActive;
}

// Função para remover todos os efeitos ativos da página
function removeActiveEffects() {
    // Remove todos os elementos criados para os efeitos
    activeEffects.forEach(effect => {
        document.body.removeChild(effect);
    });
    activeEffects = []; // Limpa a lista de efeitos
}

// Função para ativar o efeito visual de cada estação
function activateSeasonEffect(season) {
    // Remove todos os efeitos de estação anteriores
    document.body.classList.remove('spring', 'summer', 'autumn', 'winter');

    // Adiciona o efeito correspondente à estação
    document.body.classList.add(season);

    // Dependendo da estação, você pode adicionar diferentes animações ou mudanças de fundo
    if (season === 'spring') {
        createSpringFlowers(); // Cria flores ou algo relacionado à primavera
    } else if (season === 'summer') {
        createSunshine(); // Efeito de sol e calor para o verão
    } else if (season === 'autumn') {
        createFallingLeaves(); // Folhas caindo para o outono
    } else if (season === 'winter') {
        createSnowflakes2(); // Flocos de neve para o inverno
    }
}

// Funções específicas de cada estação (você já tem funções como "createSnowflakes" e "createConfetti")
function createSpringFlowers() {
    const numFlowers = 50;
    for (let i = 0; i < numFlowers; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.textContent = '🌸'; // Símbolo de flor
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = Math.random() * 5 + 5 + 's';
        document.body.appendChild(flower);
        activeEffects.push(flower); // Adiciona ao controle de efeitos ativos
    }
}

function createSunshine() {
    const sunEffect = document.createElement('div');
    sunEffect.classList.add('sunshine');
    document.body.appendChild(sunEffect);
    activeEffects.push(sunEffect); // Adiciona ao controle de efeitos ativos
}

function createFallingLeaves() {
    const numLeaves = 50;
    for (let i = 0; i < numLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.textContent = '🍂';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 5 + 5 + 's';
        document.body.appendChild(leaf);
        activeEffects.push(leaf); // Adiciona ao controle de efeitos ativos
    }
}

function createSnowflakes2() {
  const numSnowflakes = 60; // Número de flocos de neve

  for (let i = 0; i < numSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.textContent = '❄'; // Símbolo de floco de neve

      // Definindo uma posição aleatória para cada floco
      snowflake.style.left = Math.random() * 100 + 'vw'; // Aleatório de 0 a 100% da largura da tela
      snowflake.style.animationDuration = Math.random() * 5 + 5 + 's'; // Animação entre 5s e 10s
      snowflake.style.animationDelay = Math.random() * 5 + 's'; // Delay entre 0s e 5s

      // Adiciona o floco de neve ao corpo da página
      document.body.appendChild(snowflake);
      activeEffects.push(snowflake); // Adiciona ao controle de efeitos ativos
  }
}

// Função que calcula a data 15 dias antes de uma data (sem ano)
function calculateReminderDate(month, day) {
  const currentYear = new Date().getFullYear();  // Usa o ano atual
  const reminderDate = new Date(currentYear, month, day); // Cria a data de notificação
  reminderDate.setDate(reminderDate.getDate() - 15); // Subtrai 15 dias
  return reminderDate;
}

// Função para extrair o mês e o dia de uma data
function getMonthAndDay(date) {
  return { month: date.getMonth(), day: date.getDate() };
}

// Armazenar notificações (array de objetos)
let notifications = [];

// Datas importantes (sem ano, apenas mês e dia)
const importantDates = [
  { name: "Páscoa", month: 3, day: 20 },  // Páscoa (mês 3, dia 20) - exemplo sem o ano
  { name: "Natal", month: 11, day: 25 },  // Natal (mês 11, dia 25)
  // Adicione outras datas importantes conforme necessário
];

// Função para verificar se a data atual é 15 dias antes de algum feriado
function checkForUpcomingHolidays() {
  const today = new Date();
  const todayMonthAndDay = getMonthAndDay(today);
  let notificationCount = 0;
  
  importantDates.forEach(holiday => {
    const reminderDate = calculateReminderDate(holiday.month, holiday.day);  // Usa mês e dia
    const holidayMonthAndDay = { month: holiday.month, day: holiday.day };
    const reminderMonthAndDay = getMonthAndDay(reminderDate);

    // Verifica se hoje é 15 dias antes de algum feriado (compara apenas mês e dia)
    if (todayMonthAndDay.month === reminderMonthAndDay.month && todayMonthAndDay.day === reminderMonthAndDay.day) {
      // Adiciona a notificação à lista
      notifications.push(`Lembrete: Faltam 15 dias para ${holiday.name}!`);
      notificationCount++;
    }
  });

  // Atualiza o contador de notificações
  document.getElementById("notificationCount").innerText = notificationCount;
}

// Função para criar notificações relevantes a cada 10 minutos
function createPeriodicNotification() {
  // Mensagens de notificação personalizadas
  const notificationsMessages = [
      "⏰ Hora de dar uma pausa! Levante-se e movimente-se! 🚶",    // Lembrete de pausa
      "💧 Beba água! Seu corpo precisa de hidratação!",             // Lembrete de hidratação
      "📅 Lembre-se de revisar suas metas do dia! Está indo bem!"  // Lembrete de metas
  ];

  // Escolhe uma mensagem aleatória
  const randomMessage = notificationsMessages[Math.floor(Math.random() * notificationsMessages.length)];

  // Adiciona a notificação ao array de notificações
  notifications.push(randomMessage);

  // Atualiza o contador de notificações
  document.getElementById("notificationCount").innerText = notifications.length;

  // Exibe a notificação na interface (caso o modal esteja aberto)
  if (document.getElementById("notificationModal").style.display === 'block') {
      const notificationList = document.getElementById("notificationList");
      const li = document.createElement("li");
      li.textContent = randomMessage;
      notificationList.appendChild(li);
  }
}

// Função para abrir o modal e mostrar as notificações
function openModalNotificar() {
  const notificationList = document.getElementById("notificationList");
  notificationList.innerHTML = '';  // Limpa a lista atual

  // Adiciona cada notificação à lista no modal
  notifications.forEach(notification => {
    const li = document.createElement("li");
    li.textContent = notification;
    notificationList.appendChild(li);
  });

  // Exibe o modal
  document.getElementById("notificationModal").style.display = 'block';
}

// Função para fechar o modal
function closeModalNotify() {
  document.getElementById("notificationModal").style.display = 'none';
}

// Verifica as notificações diariamente
setInterval(checkForUpcomingHolidays, 24 * 60 * 60 * 1000);

// Adiciona o evento de clique no ícone de notificação
document.getElementById("notificationButton").addEventListener("click", openModalNotificar);

// Verifica as notificações ao carregar a página
document.addEventListener("DOMContentLoaded", checkForUpcomingHolidays);

// Função para limpar as notificações
function clearNotifications() {
  notifications = [];  // Limpa o array de notificações
  document.getElementById("notificationList").innerHTML = '';  // Limpa a lista no modal
  document.getElementById("notificationCount").innerText = '0';  // Reseta o contador
}

// Adiciona o evento de clique no botão "Limpar Notificações"
document.getElementById("clearNotificationsBtn").addEventListener("click", clearNotifications);

// Seleciona elementos
const perfilBtn = document.getElementById("perfil-btn");
const perfilContainer = document.getElementById("perfil-container");
const fecharBtn = document.getElementById("fechar-btn");
const importarBtn = document.getElementById("importar-btn");
const exportarBtn = document.getElementById("exportar-btn");
const nomePerfil = document.getElementById("nome-perfil");
const bioPerfil = document.getElementById("bio-perfil");
const perfilSelector = document.getElementById("perfil-selector"); // O dropdown para seleção de perfil

// Atualiza a tela de perfil com os dados do perfil ativo
function atualizarPerfil() {
  const perfil = perfis[perfilAtivo];

  // Recupera a bio salva no localStorage (se houver)
  const bioSalva = localStorage.getItem("bio" + perfilAtivo);
  if (bioSalva) {
    perfil.bio = bioSalva;
  }

  nomePerfil.textContent = perfil.nome;
  bioPerfil.value = perfil.bio;

  if (perfilAtivo === "Main") {
    bioPerfil.disabled = false;
  }
}

// Exibir e ocultar a tela de perfil
perfilBtn.addEventListener("click", () => {
  atualizarPerfil();
  perfilContainer.style.display = "flex";
});

fecharBtn.addEventListener("click", () => {
  perfilContainer.style.display = "none";
});

// Função de exportar perfil (JSON)
exportarBtn.addEventListener("click", () => {
  const perfil = perfis[perfilAtivo];

  // Atualiza dados do DOM no perfil
  perfil.bio = bioPerfil.value;

  const notesBox = document.getElementById('notesBox');
  if (notesBox) {
    perfil.notesLer = notesBox.value;
  }

  const musicPlaceNotesBox = document.getElementById('musicPlaceNotes1'); // Supondo que o id seja 'musicPlaceNotes1'
  if (musicPlaceNotesBox) {
    perfil.musicPlaceNotes1 = musicPlaceNotesBox.value; // Captura o conteúdo da área de notas do musicPlace
  }

  const gymNotesBox = document.getElementById('gymNotes'); // Supondo que o id seja 'gymNotes'
  if (gymNotesBox) {
    perfil.gymNotes = gymNotesBox.value; // Captura o conteúdo da área de notas do gym
  }

  const notasBox = document.getElementById('notas');
  if (notasBox) {
    perfil.notas = notasBox.value;
  }

  const programadosTextarea = document.getElementById('programados');
  if (programadosTextarea) {
    perfil.programados = programadosTextarea.value;
  }

  const anotacoesTextarea = document.getElementById('anotacoes');
  if (anotacoesTextarea) {
    perfil.anotacoes = anotacoesTextarea.value;
  }

  const squadFilesBox = document.getElementById("squadFiles");
  if (squadFilesBox) {
    perfil.squadFiles = squadFilesBox.value;
  }

  // Inclui as reclamações no perfil
  perfil.complaints = perfis[perfilAtivo].complaints;

  // Atualiza localStorage
  localStorage.setItem("bio" + perfilAtivo, perfil.bio);
  if (perfil.notesLer) {
    localStorage.setItem("notes-ler-" + perfilAtivo, perfil.notesLer);
  }

  // Gera JSON para download
  const perfilJSON = JSON.stringify(perfil, null, 2);
  const blob = new Blob([perfilJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${perfil.nome}.json`;

  document.body.appendChild(link);
  setTimeout(() => {
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
});

// Função de importar perfil
importarBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const dadosImportados = JSON.parse(e.target.result);

          // Atualiza os dados do perfil
          perfis[perfilAtivo] = { ...perfis[perfilAtivo], ...dadosImportados };

          // Salva dados no localStorage
          if (dadosImportados.bio)
            localStorage.setItem("bio" + perfilAtivo, dadosImportados.bio);

          if (dadosImportados.notesLer)
            localStorage.setItem("notes-ler-" + perfilAtivo, dadosImportados.notesLer);

          if (dadosImportados.musicPlaceNotes1)
            localStorage.setItem("musicPlaceNotes1-" + perfilAtivo, dadosImportados.musicPlaceNotes1);

          if (dadosImportados.gymNotes)
            localStorage.setItem("gymNotes-" + perfilAtivo, dadosImportados.gymNotes); // Salva as anotações de gym

          if (dadosImportados.notas)
            localStorage.setItem("notas-" + perfilAtivo, dadosImportados.notas);

          if (dadosImportados.programados)
            localStorage.setItem("programados-" + perfilAtivo, dadosImportados.programados);

          if (dadosImportados.anotacoes)
            localStorage.setItem("anotacoes-" + perfilAtivo, dadosImportados.anotacoes);

          if (dadosImportados.squadFiles) {
            localStorage.setItem("squadFiles-" + perfilAtivo, dadosImportados.squadFiles);
          }

          // Atualiza as reclamações no localStorage
          if (dadosImportados.complaints) {
            localStorage.setItem("complaints-" + perfilAtivo, JSON.stringify(dadosImportados.complaints));
          }

          if (dadosImportados.nivel !== undefined)
            localStorage.setItem("nivel" + perfilAtivo, dadosImportados.nivel);

          if (dadosImportados.xp !== undefined)
            localStorage.setItem("xp" + perfilAtivo, dadosImportados.xp);

          atualizarPerfil(); // Atualiza a interface
          alert("Perfil importado com sucesso!");
          setTimeout(() => location.reload(), 500); // Recarrega após 0,5 segundo
        } catch (error) {
          alert("Erro ao importar o perfil.");
        }
      };
      reader.readAsText(file);
    }
  });
  input.click();
});

// Atualiza os dados do perfil ao editar a bio
bioPerfil.addEventListener("input", () => {
  const perfil = perfis[perfilAtivo];
  perfil.bio = bioPerfil.value;
  // Atualiza a localStorage também se necessário
  localStorage.setItem("bio" + perfilAtivo, perfil.bio);
});

// Quando o usuário mudar a seleção no dropdown, alteramos o perfil ativo
perfilSelector.addEventListener("change", (event) => {
  perfilAtivo = event.target.value;
  localStorage.setItem("perfilAtivo", perfilAtivo);

  // Atualiza os dados do perfil e da interface (XP, nível, progresso etc.)
  atualizarPerfil();
  atualizarInterface();

  const complaints = JSON.parse(localStorage.getItem("complaints-" + perfilAtivo)) || [];
  loadComplaints(complaints);
});

function atualizarPerfil() {
  const perfil = perfis[perfilAtivo];

  // Exibe ou esconde o botão "Squad" dependendo do perfil
  const squadBtn = document.getElementById('squad-btn');
  if (perfilAtivo === "Joaquim") {
    squadBtn.style.display = "block"; // Mostra o botão para o perfil "Joaquim"
  } else {
    squadBtn.style.display = "none"; // Esconde o botão para os outros perfis
  }

  perfil.nivel = parseInt(localStorage.getItem("nivel" + perfilAtivo)) || 1;
  perfil.xp = parseInt(localStorage.getItem("xp" + perfilAtivo)) || 0;

  const bioSalva = localStorage.getItem("bio" + perfilAtivo);
  if (bioSalva) perfil.bio = bioSalva;

  const notesBox = document.getElementById("notesBox");
if (notesBox) {
  notesBox.value = perfis[perfilAtivo].notesLer || "";
}

// Carrega as reclamações
  const complaints = JSON.parse(localStorage.getItem("complaints-" + perfilAtivo)) || [];
  loadComplaints(complaints);
  
const musicPlaceNotesBox = document.getElementById("musicPlaceNotes1"); // Aqui o id pode ser diferente
  if (musicPlaceNotesBox) {
    // Carrega as anotações específicas do musicPlace
    musicPlaceNotesBox.value = perfil.musicPlaceNotes1 || "";
  }

  const gymNotesBox = document.getElementById("gymNotes"); // Aqui o id pode ser diferente
  if (gymNotesBox) {
    // Carrega as anotações do gym
    gymNotesBox.value = perfil.gymNotes || "";
  }

  const notasBox = document.getElementById("notas");
  if (notasBox) {
    notasBox.value = perfil.notas || "";
  }

  const programadosBox = document.getElementById("programados");
  if (programadosBox) {
    programadosBox.value = localStorage.getItem("programados-" + perfilAtivo) || "";
  }

  const anotacoesBox = document.getElementById("anotacoes");
  if (anotacoesBox) {
    anotacoesBox.value = localStorage.getItem("anotacoes-" + perfilAtivo) || "";
  }

  const squadFilesBox = document.getElementById("squadFiles");
  if (squadFilesBox) {
    squadFilesBox.value = localStorage.getItem("squadFiles-" + perfilAtivo) ||"";
  }

  nomePerfil.textContent = perfil.nome;
  bioPerfil.value = perfil.bio;
  bioPerfil.disabled = perfilAtivo !== "Main";
}

// Define um intervalo para exibir a notificação a cada 10 minutos (600.000 ms)
setInterval(createPeriodicNotification, 10 * 60 * 1000); // 10 minutos em milissegundos

// Inicializa o perfil ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  perfilSelector.value = perfilAtivo; // Mostra o perfil ativo
  // Carregar as reclamações ao carregar a página
  const complaints = JSON.parse(localStorage.getItem("complaints-" + perfilAtivo)) || [];
  loadComplaints(complaints);
  atualizarPerfil();
  createPeriodicNotification();
});

document.addEventListener("DOMContentLoaded", () => {
  const calenButton = document.querySelector('.calenbutton');
  const calendar = document.getElementById('calendar');
  const calendarGrid = document.getElementById('calendarGrid');
  const yearDisplay = document.getElementById('year');
  const prevYear = document.getElementById('prevYear');
  const nextYear = document.getElementById('nextYear');

  if (!calenButton || !calendar || !calendarGrid || !yearDisplay || !prevYear || !nextYear) {
    console.error("Um ou mais elementos esperados estão ausentes no DOM!");
    return;
  }

  const birthdays = [
    { name: "Pipoca", month: 1, day: 24 },
    { name: "Joaquim", month: 2, day: 5 },
    { name: "Joaquim Batismo", month: 2, day: 22 },
    { name: "Vitória", month: 6, day: 4 },
    { name: "Adeir", month: 9, day: 7 },
    { name: "Paula", month: 10, day: 24 },

    { name: "J2+", month: 9, day: 2 },   // 2 Setembro 2024
    { name: "J2: Nova", month: 5, day: 12 },   // 12 Maio 2023
    { name: "Rhafael", month: 5, day: 31 },  // 31 Maio 2025
    { name: "Miguel", month: 3, day: 10 },// 10 Março 2025
    { name: "Kalton", month: 6, day: 27 } // 27 Junho 2025
  ];

  const specialEvents = [
    { name: "Independência do Brasil", month: 9, day: 7 },
    { name: "Natal", month: 12, day: 25 },
    { name: "Ano Novo", month: 1, day: 1 },
    { name: "Carnaval", month: 2, day: 17 },
    { name: "Sexta-feira Santa", month: 4, day: 18 },
    { name: "Tiradentes", month: 4, day: 21 },
    { name: "Dia do Trabalho", month: 5, day: 1 },
    { name: "Festa de Nossa Senhora Aparecida", month: 10, day: 12 },
    { name: "Proclamação da República", month: 11, day: 15 },
    { name: "Finados", month: 11, day: 2 },
    { name: "Dia da Consciência Negra", month: 11, day: 20 },
    { name: "Dia dos Namorados", month: 6, day: 12 },

    // Eventos pessoais
    { name: "Casamento dos Pais (Civil)", month: 11, day: 14 },
    { name: "Casamento dos Pais (Religioso)", month: 11, day: 15 },
    { name: "Formatura do Joaquim", month: 12, day: 16 }, // de 2025

    // Eventos móveis
    { name: "Páscoa", type: "movel", rule: "domingo de páscoa" },
    { name: "Sexta-feira 13", type: "movel", rule: "sexta-feira dia 13" },
    { name: "Dia da Bíblia", type: "movel", rule: "2º domingo de dezembro" },
    
    // Vésperas
    { name: "Véspera de Natal", month: 12, day: 24 },
    { name: "Véspera de Ano Novo", month: 12, day: 31 },

      // Datas comemorativas
      { name: "Dia Internacional da Mulher", month: 3, day: 8 },
      { name: "Dia das Crianças", month: 10, day: 12 },
      { name: "Dia do Homem", month: 7, day: 15 },

      // Datas móveis
      { name: "Dia das Mães", type: "movel", rule: "2º domingo de maio" },
      { name: "Dia dos Pais", type: "movel", rule: "2º domingo de agosto" },
];

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth(); // Mês atual (0 = Janeiro, 1 = Fevereiro, ...)

  function renderDaysInMonth(monthIndex, year, monthName) {
    calendarGrid.innerHTML = ''; // Limpa o grid atual
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Obtém a quantidade de dias no mês
    const title = document.createElement('div');
    title.textContent = `${monthName} ${year}`;
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    calendarGrid.appendChild(title);
  
    // Obtém a data atual
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // O mês atual (0 = Janeiro, 1 = Fevereiro, ...)
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
      dayDiv.style.border = '1px solid #ccc';
      dayDiv.style.padding = '10px';
      dayDiv.style.margin = '5px';
      dayDiv.style.display = 'inline-block';
      dayDiv.style.cursor = 'pointer';
  
      // Verifica se é o dia atual
      if (monthIndex === currentMonth && day === currentDay) {
        dayDiv.style.backgroundColor = '#825dff'; // Cor de fundo especial para o dia atual
        dayDiv.style.fontWeight = 'bold'; // Pode aplicar negrito no texto também
      }
  
      // Verifica se é um aniversário ou evento especial
      const birthday = birthdays.find(b => b.month === monthIndex + 1 && b.day === day);
      const event = specialEvents.find(e => e.month === monthIndex + 1 && e.day === day);
  
      if (birthday) {
        dayDiv.style.backgroundColor = '#6e9bff'; // Destaca o dia com cor
        dayDiv.textContent += ` 🎉 ${birthday.name}`;
      }
  
      if (event) {
        dayDiv.style.backgroundColor = '#9877f1'; // Destaca o dia com cor diferente
        dayDiv.textContent += ` ✨ ${event.name}`;
      }
  
      dayDiv.addEventListener('click', () => {
        let message = `Dia ${day} de ${monthName}, ${year}`;
        if (birthday) message += ` - Aniversário de ${birthday.name}`;
        if (event) message += ` - Evento especial: ${event.name}`;
        alert(message);
      });
  
      calendarGrid.appendChild(dayDiv);
    }

    const backButton = document.createElement('button');
    backButton.textContent = "Voltar";
    backButton.style.padding = '10px';
    backButton.style.cursor = 'pointer';
    backButton.addEventListener('click', renderCalendar2);
    calendarGrid.appendChild(backButton);
  }

  function renderCalendar() {
    yearDisplay.textContent = currentYear;
    calendarGrid.innerHTML = '';
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
    // Exibe os meses de forma simples, com o clique para ver os dias
    months.forEach((month, index) => {
      const monthDiv = document.createElement('div');
      monthDiv.textContent = month;
      if (index === currentMonth) {
        monthDiv.style.fontWeight = 'bold'; // Destaque para o mês atual
        monthDiv.style.backgroundColor = '#825dff'; // Cor de fundo para destaque
      }
      monthDiv.addEventListener('click', () => renderDaysInMonth(index, currentYear, month));
      calendarGrid.appendChild(monthDiv);
    });
  
    // Exibe diretamente os dias do mês atual
    renderDaysInMonth(currentMonth, currentYear, months[currentMonth]);
  }
  
  function renderCalendar2() {
    yearDisplay.textContent = currentYear;
    calendarGrid.innerHTML = '';
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
    // Exibe os meses de forma simples, com o clique para ver os dias
    months.forEach((month, index) => {
      const monthDiv = document.createElement('div');
      monthDiv.textContent = month;
      if (index === currentMonth) {
        monthDiv.style.fontWeight = 'bold'; // Destaque para o mês atual
        monthDiv.style.backgroundColor = '#825dff'; // Cor de fundo para destaque
      }
      monthDiv.addEventListener('click', () => renderDaysInMonth(index, currentYear, month));
      calendarGrid.appendChild(monthDiv);
    });
  }

  calenButton.addEventListener('click', () => {
    calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
    renderCalendar();
  });

  prevYear.addEventListener('click', () => {
    currentYear--;
    renderCalendar2();
  });

  nextYear.addEventListener('click', () => {
    currentYear++;
    renderCalendar2();
  });

  renderCalendar();
});

const olhoEsquerdo = document.getElementById("olhoEsquerdo");
const olhoDireito = document.getElementById("olhoDireito");
const container = document.getElementById('container');
const risadas = ['haha', 'ha', 'ha ha', 'HaHa'];

const olhoEsquerdo2 = document.getElementById('olhoEsquerdo2');
const olhoDireito2 = document.getElementById('olhoDireito2');

container2.addEventListener('mouseenter', () => {
    criarRisadinha();
});

container2.addEventListener('mousemove', () => {
    criarRisadinha();
});

function criarRisadinha() {
    const risadinha = document.createElement('div');
    risadinha.className = 'risadinha';
    risadinha.textContent = risadas[Math.floor(Math.random() * risadas.length)];

    // Posicionamento aleatório dentro do container
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    risadinha.style.left = `${x}%`;
    risadinha.style.top = `${y}%`;

    container.appendChild(risadinha);

    // Ativar os olhos extras
    olhoEsquerdo2.style.display = 'block';
    olhoDireito2.style.display = 'block';

    // Remover risadinha e desativar os olhos extras após 2 segundos
    setTimeout(() => {
        risadinha.remove();
        olhoEsquerdo2.style.display = 'none';
        olhoDireito2.style.display = 'none';
    }, 2000);
}

let seguindoMouse = false;
let posicaoInicial = { x: olhoEsquerdo.offsetLeft, y: olhoEsquerdo.offsetTop };  // Armazena a posição inicial dos olhos

// Função para simular o piscar
function piscar() {
    olhoEsquerdo.style.transition = "height 0.1s ease-in";
    olhoDireito.style.transition = "height 0.1s ease-in";
    olhoEsquerdo.style.height = "5px";
    olhoDireito.style.height = "5px";

    setTimeout(() => {
        olhoEsquerdo.style.transition = "height 0.3s ease-out";
        olhoDireito.style.transition = "height 0.3s ease-out";
        olhoEsquerdo.style.height = "70px";
        olhoDireito.style.height = "70px";
    }, 100);
}

// Pisca a cada 5 segundos
setInterval(piscar, 5000);

// Função para alternar o comportamento de seguir o mouse
function toggleSeguirMouse() {
    seguindoMouse = !seguindoMouse;

    if (seguindoMouse) {
        // Inicia o movimento para seguir o mouse
        document.addEventListener('mousemove', seguirMouse);
    } else {
        // Para o movimento
        document.removeEventListener('mousemove', seguirMouse);
        // Reinicia a posição dos olhos suavemente
        resetarPosicaoOlhos();
    }
}

// Função que move os olhos para a posição do mouse
function seguirMouse(event) {
  const avatarRect = container.getBoundingClientRect();
  const eyeRadiusX = olhoEsquerdo.offsetWidth / 2;
  const eyeRadiusY = olhoEsquerdo.offsetHeight / 2;

  const mouseX = event.clientX - avatarRect.left;
  const mouseY = event.clientY - avatarRect.top;

  const maxDistance = 30;

  function moverOlhoIndependente(olho) {
      const olhoRect = olho.getBoundingClientRect();
      const olhoCenterX = olhoRect.left + olho.offsetWidth / 2 - avatarRect.left;
      const olhoCenterY = olhoRect.top + olho.offsetHeight / 2 - avatarRect.top;

      let dx = mouseX - olhoCenterX;
      let dy = mouseY - olhoCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > maxDistance) {
          const ratio = maxDistance / distance;
          dx *= ratio;
          dy *= ratio;
      }

      olho.style.transition = "transform 0.1s ease-out";
      olho.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  moverOlhoIndependente(olhoEsquerdo);
  moverOlhoIndependente(olhoDireito);
}

const avatarLink = document.querySelector('.avatar-link');
const avatar = document.getElementById('container');

avatar.addEventListener('mouseleave', () => {
    if (seguindoMouse) {
        resetarPosicaoOlhos();
    }
});

avatarLink.addEventListener('mouseleave', () => {
    if (seguindoMouse) {
        resetarPosicaoOlhos();
    }
});

// Função para resetar a posição dos olhos suavemente com margin-left: 10px
function resetarPosicaoOlhos() {
  // Restaura a posição inicial dos olhos com transição suave e desloca 10px para a esquerda
  olhoEsquerdo.style.transition = "transform 0.5s ease-out";
  olhoDireito.style.transition = "transform 0.5s ease-out";

  const deslocamentoX = -41; // Desloca para a esquerda

  olhoEsquerdo.style.transform = `translate(${posicaoInicial.x + deslocamentoX}px, ${posicaoInicial.y}px)`;
  olhoDireito.style.transform = `translate(${posicaoInicial.x + deslocamentoX}px, ${posicaoInicial.y}px)`;
}

// Adiciona o evento de clique para alternar entre seguir e parar de seguir o mouse
container.addEventListener('click', toggleSeguirMouse);

// Lista de reclamações (carregada do localStorage, se houver)
let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

function closeComplaintForm() {
  document.getElementById('complaintForm').style.display = 'none';
  document.getElementById('addComplaintBtn').style.display = 'inline-block';
  document.getElementById('complaintForm').reset(); // limpa os campos do formulário (opcional)
}

// Função para mostrar o formulário de reclamação
function saveToLocalStorage(complaints) {
  const perfilAtivo = localStorage.getItem("perfilAtivo") || "Main";
  localStorage.setItem(`complaints-${perfilAtivo}`, JSON.stringify(complaints));
}

// Função para carregar as reclamações do perfil ativo
function loadComplaints() {
  const perfilAtivo = localStorage.getItem("perfilAtivo") || "Main";
  const complaints = JSON.parse(localStorage.getItem(`complaints-${perfilAtivo}`)) || [];

  const complaintsList = document.getElementById('complaintsList');
  complaintsList.innerHTML = '';

  complaints.forEach(complaint => {
    const complaintElement = document.createElement('div');
    complaintElement.classList.add('complaint-item');
    complaintElement.innerHTML = `
      <h3>${complaint.subject}</h3>
      <p><strong>${complaint.name}</strong></p>
      <p>${complaint.message}</p>
    `;
    complaintsList.appendChild(complaintElement);
  });
}

// Função para adicionar uma nova reclamação
document.getElementById('complaintForm').onsubmit = function(event) {
  event.preventDefault();

  const perfilAtivo = localStorage.getItem("perfilAtivo") || "Main";
  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  let complaints = JSON.parse(localStorage.getItem(`complaints-${perfilAtivo}`)) || [];

  complaints.push({
    id: complaints.length + 1,
    name,
    subject,
    message
  });

  saveToLocalStorage(complaints);
  loadComplaints();

  document.getElementById('complaintForm').reset();
  document.getElementById('complaintForm').style.display = 'none';
  document.getElementById('addComplaintBtn').style.display = 'inline-block';
};

// Atualiza as reclamações quando o perfil for alterado
document.getElementById('perfil-selector').addEventListener('change', function() {
  const perfilAtivo = this.value;
  localStorage.setItem("perfilAtivo", perfilAtivo);
  loadComplaints(); // Isso agora funcionará corretamente
});

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os botões
  const switchBtn = document.getElementById("switch-btn");
  const miguelBtn = document.getElementById("miguel-btn");
  const rafaBtn = document.getElementById("rafa-btn");

  // Adiciona evento de clique no botão de troca
  switchBtn.addEventListener("click", () => {
    // Alterna a classe 'active' entre os botões
    miguelBtn.classList.toggle("active");
    rafaBtn.classList.toggle("active");

    // Alterna a classe 'hidden' entre os botões
    miguelBtn.classList.toggle("hidden");
    rafaBtn.classList.toggle("hidden");
  });
});

// Função para mostrar a seção do idioma selecionado
function showLanguage(language) {
    var languages = ['english', 'spanish', 'libras'];

    // Esconde todas as seções
    languages.forEach(function(lang) {
        document.getElementById(lang).style.display = 'none';
    });

    // Exibe a seção do idioma escolhido
    document.getElementById(language).style.display = 'block';
}
