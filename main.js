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

// Função para exibir status de carregamento
function updateStatus(message) {
    const status = document.getElementById('status');
    status.style.display = 'block';
    status.innerHTML = message;
}

// Função para enviar a mensagem para a API do Google Gemini
function sendMessageToAPI(message) {
  //const status = document.getElementById('status');
  const inputText = document.getElementById('inputText');
  const sendButton = document.getElementById('sendButton');

  sendButton.disabled = true;
  sendButton.style.cursor = 'not-allowed';
  inputText.disabled = true;

  fetch(`${apiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-BR'  // Adiciona a especificação do idioma
      },
      body: JSON.stringify({
          contents: [
              {
                  parts: [
                      { text: message }
                  ]
              }
          ]
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
      }
      return response.json();
  })
  .then(response => {
      console.log('Resposta da API:', response);
      
      // Verifica se 'candidates' existe e tem conteúdo
      if (response && response.candidates && response.candidates.length > 0) {
          let candidate = response.candidates[0];
          console.log('Primeiro candidato:', candidate);
          let content = candidate.content;
          let r = 'Texto não encontrado';
          
          if (content && content.parts && content.parts.length > 0) {
              let part = content.parts[0];
              r = part.text || 'Texto não encontrado';
              
              // Verificando se o conteúdo parece ser código
              if (isCode(r)) {
                  r = formatCode(r); // Formata o código com sintaxe adequada
              }
          }

          // Quando a resposta for recebida, esconder "digitando..."
          updateStatus('');

          showHistory(message, r);
          falar(r);
      } else {
          updateStatus('Resposta inesperada da API. Verifique o console para mais detalhes.');
      }
  })
  .catch(e => {
      console.log(`Error -> ${e}`);
      updateStatus('Erro, tente novamente mais tarde...');
  })
  .finally(() => {
      sendButton.disabled = false;
      sendButton.style.cursor = 'pointer';
      inputText.disabled = false;
  });
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
        // Adicionando mais traduções
        'drizzle': 'chuvisco',
        'overcast clouds': 'nuvens densas',
        'fog': 'névoa',
        'sand': 'areia',
        'dust': 'poeira',
        'volcanic ash': 'cinza vulcânica',
        'squalls': 'rajadas',
        'tornado': 'tornado'
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
        // let forecastText = `Hoje ${todayTemp} °C (${todayDesc})`;
        let forecastText = `${todayTemp} °C (${todayDesc})`;
        document.getElementById('weatherForecast').textContent = forecastText;
    } catch (error) {
        console.error(error);
        document.getElementById('weatherForecast').textContent = 'Erro ao carregar previsão do tempo.';
    }
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

const ativos = [
    {
        "tickerSymbol": "WINM24",
        "side": "compra",
        "marketName": "Futuros",
        "tradeQuantity": 2,
        "priceValue": 120000.0,
        "tradeDateTime": "2024-11-26T08:30:00Z",
        "previousValue": 130115.0 // Valor de referência do Mini-Índice
    },
    {
        "tickerSymbol": "WDOZ24",
        "side": "venda",
        "marketName": "Futuros",
        "tradeQuantity": 5,
        "priceValue": 5125.0,
        "tradeDateTime": "2024-11-26T09:15:00Z",
        "previousValue": 5800.0 // Valor de referência do Mini Dólar
    }
];

// Função para adicionar os ativos à lista
function fetchStocks() {
    const lista = document.getElementById('stocksList');
    lista.innerHTML = ''; // Limpa a lista (para remover o "Carregando...")

    // Adiciona os ativos à lista
    ativos.forEach(ativo => {
        const priceChange = ativo.priceValue - ativo.previousValue;
        const percentageChange = (priceChange / ativo.previousValue) * 100;
        const direction = priceChange > 0 ? 'subindo' : 'caindo';
        const li = document.createElement('li');
        li.textContent = `${ativo.tickerSymbol}: (${direction} ${Math.abs(percentageChange).toFixed(2)}%)`;
        // li.textContent = `${ativo.tickerSymbol} - ${ativo.side} - ${ativo.marketName} - ${ativo.tradeQuantity} contratos a ${ativo.priceValue} (${direction} ${Math.abs(percentageChange).toFixed(2)}%)`;
        lista.appendChild(li);
    });
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

// Camera
document.addEventListener('DOMContentLoaded', () => {
    let isCameraActive = false; // Controle para saber se a câmera está ativa
    let currentStream = null;  // Referência para o stream da câmera, para poder parar a câmera depois
  
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('Facial/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('Facial/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('Facial/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('Facial/models')
    ]).then(startVideo);
  
    // Função para alternar entre abrir e fechar a câmera
    document.getElementById('openCamera').addEventListener('click', function() {
      const cameraOptions = document.getElementById('cameraOptions');
      const cameraModal = document.getElementById('cameraModal');
      
      if (isCameraActive) {
        // Fechar a câmera e parar o stream
        if (currentStream) {
          const tracks = currentStream.getTracks();
          tracks.forEach(track => track.stop()); // Parar todos os tracks de vídeo
        }
        cameraModal.style.display = 'none'; // Fechar o modal
        isCameraActive = false; // Atualizar o estado da câmera
      } else {
        // Mostrar as opções de câmeras
        cameraOptions.style.display = 'block';
        
        // Obter dispositivos de mídia (câmeras)
        navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const cameraList = document.getElementById('cameraList');
            cameraList.innerHTML = ''; // Limpar a lista antes de adicionar novas opções
            
            // Adicionar cada câmera como uma opção na lista
            videoDevices.forEach((device, index) => {
              const listItem = document.createElement('li');
              listItem.textContent = device.label || `Câmera ${index + 1}`;
              listItem.style.padding = '5px 10px';
              listItem.style.cursor = 'pointer';
              
              // Adicionar evento de clique para selecionar a câmera
              listItem.addEventListener('click', () => {
                openCameraModal(device.deviceId);
                cameraOptions.style.display = 'none'; // Fechar a lista após selecionar a câmera
              });
              
              cameraList.appendChild(listItem);
            });
          })
          .catch(err => console.error('Erro ao listar dispositivos de mídia: ', err));
          
        isCameraActive = true; // A câmera agora está ativa
      }
    });
  
    // Função para abrir o modal e iniciar a câmera selecionada
    function openCameraModal(cameraId) {
      const cameraModal = document.getElementById('cameraModal');
      const closeModalCamera = document.getElementById('closeModalCamera');
      
      // Exibe o modal
      cameraModal.style.display = 'block';
      
      // Fecha o modal quando clicar no 'X'
      closeModalCamera.addEventListener('click', () => {
        cameraModal.style.display = 'none';
      });
      
      // Iniciar a câmera selecionada
      const video = document.getElementById('video');
      const constraints = {
        video: { deviceId: cameraId ? { exact: cameraId } : undefined }
      };
      
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          video.srcObject = stream;
          currentStream = stream;  // Salvar o stream para poder parar depois
        })
        .catch(err => console.error('Erro ao acessar a câmera: ', err));
  
      video.addEventListener('play', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        document.body.append(canvas);
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
  
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
            inputSize: 160,
            scoreThreshold: 0.5
          }))
            .withFaceLandmarks()
            .withFaceExpressions();
  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 1000);
      });
    }
  
    // Função para iniciar o vídeo (caso a câmera padrão seja escolhida)
    function startVideo() {
      const video = document.getElementById('video');
      if (!video) {
        console.error('Elemento de vídeo não encontrado!');
        return;
      }
  
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(err => console.error('Erro ao acessar a câmera padrão: ', err));
  
      video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
  
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
            inputSize: 160,
            scoreThreshold: 0.5
          }))
            .withFaceLandmarks()
            .withFaceExpressions();
  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 1000);
      });
    }
  });  

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
        createSnowflakes(); // Flocos de neve para o inverno
    }
}

// Funções específicas de cada estação (você já tem funções como "createSnowflakes" e "createConfetti")
function createSpringFlowers() {
    // Adicionar flores ou outros elementos visuais para a primavera
    const numFlowers = 50;
    for (let i = 0; i < numFlowers; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.textContent = '🌸'; // Símbolo de flor
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = Math.random() * 5 + 5 + 's';
        document.body.appendChild(flower);
    }
}

function createSunshine() {
    // Criar um efeito de sol para o verão
    const sunEffect = document.createElement('div');
    sunEffect.classList.add('sunshine');
    document.body.appendChild(sunEffect);
}

function createFallingLeaves() {
    // Efeito de folhas caindo no outono
    const numLeaves = 50;
    for (let i = 0; i < numLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.textContent = '🍂';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 5 + 5 + 's';
        document.body.appendChild(leaf);
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

// Dados dos perfis
const perfis = {
  Joaquim: {
    nome: "Joaquim",
    bio: "O Criador e Investidor",
    nivel: localStorage.getItem("nivelAtual") || 1,
    xp: localStorage.getItem("xpAtual") || 0,
  },
  Main: {
    nome: "Main",
    bio: "Perfil principal",
    nivel: 0,  // O perfil Main não tem níveis
    xp: 0,     // O perfil Main não tem XP
  },
};

// Recupera a escolha de perfil do localStorage, ou usa "Joaquim" por padrão
let perfilAtivo = localStorage.getItem("perfilAtivo") || "Joaquim";

// Atualiza a tela de perfil com os dados do perfil ativo
function atualizarPerfil() {
  const perfil = perfis[perfilAtivo];
  nomePerfil.textContent = perfil.nome;
  bioPerfil.value = perfil.bio;
  
  // Se o perfil for "Main", pode desabilitar ou ocultar algo relacionado a nível e XP (opcional)
  if (perfilAtivo === "Main") {
    bioPerfil.disabled = false; // Exemplo de como habilitar/alterar UI
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
  const perfilJSON = JSON.stringify(perfil);
  const blob = new Blob([perfilJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${perfil.nome}.json`;
  link.click();
  URL.revokeObjectURL(url);
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
          // Atualiza o perfil ativo com os dados importados
          perfis[perfilAtivo] = { ...perfis[perfilAtivo], ...dadosImportados };
          localStorage.setItem("nivelAtual", perfis[perfilAtivo].nivel);
          localStorage.setItem("xpAtual", perfis[perfilAtivo].xp);
          atualizarPerfil();
          alert("Perfil importado com sucesso!");
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
  perfilAtivo = event.target.value; // Seleciona o perfil de acordo com a opção escolhida
  localStorage.setItem("perfilAtivo", perfilAtivo); // Armazena o perfil ativo no localStorage
  atualizarPerfil(); // Atualiza a tela com o novo perfil
});

// Define um intervalo para exibir a notificação a cada 10 minutos (600.000 ms)
setInterval(createPeriodicNotification, 10 * 60 * 1000); // 10 minutos em milissegundos

// Inicializa o perfil ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  // Define a escolha do perfil no dropdown de acordo com o perfil ativo
  perfilSelector.value = perfilAtivo;
  atualizarPerfil(); // Atualiza o perfil ativo ao carregar a página
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
    { name: "Paula", month: 10, day: 24 },
    { name: "Adeir", month: 9, day: 7 }
  ];

  const specialEvents = [
    { name: "Independência do Brasil", month: 9, day: 7 },
    { name: "Natal", month: 12, day: 25 },
    { name: "Ano Novo", month: 1, day: 1 },
  ];

  let currentYear = new Date().getFullYear();

  function renderCalendar() {
    yearDisplay.textContent = currentYear;
    calendarGrid.innerHTML = '';
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    months.forEach((month, index) => {
      const monthDiv = document.createElement('div');
      monthDiv.textContent = month;
      monthDiv.addEventListener('click', () => renderDaysInMonth(index, currentYear, month));
      calendarGrid.appendChild(monthDiv);
    });
  }

  function renderDaysInMonth(monthIndex, year, monthName) {
    calendarGrid.innerHTML = ''; // Limpa o grid atual
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Obtém a quantidade de dias no mês
    const title = document.createElement('div');
    title.textContent = `${monthName} ${year}`;
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    calendarGrid.appendChild(title);

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
      dayDiv.style.border = '1px solid #ccc';
      dayDiv.style.padding = '10px';
      dayDiv.style.margin = '5px';
      dayDiv.style.display = 'inline-block';
      dayDiv.style.cursor = 'pointer';

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
    backButton.addEventListener('click', renderCalendar);
    calendarGrid.appendChild(backButton);
  }

  calenButton.addEventListener('click', () => {
    calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
    renderCalendar();
  });

  prevYear.addEventListener('click', () => {
    currentYear--;
    renderCalendar();
  });

  nextYear.addEventListener('click', () => {
    currentYear++;
    renderCalendar();
  });

  renderCalendar();
});
