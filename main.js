const apiKey = 'AIzaSyAvpvehwHv1RN-vwnmth-3asp0kF0z5kPg';  // Substitua com sua chave de API do Google Gemini
const apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

document.addEventListener('DOMContentLoaded', function() {
    // Função para abrir e fechar o menu ao pressionar "ESC"
    document.addEventListener('keydown', function(event) {
        var overlayMenu = document.getElementById('overlayMenu');
        if (event.key === "Escape") {
            if (overlayMenu.style.display === 'flex') {
                overlayMenu.style.display = 'none';
            } else {
                overlayMenu.style.display = 'flex';
            }
        }
    });

    // Função para lidar com a tecla pressionada no campo de entrada
    window.handleKeyPress = function(event) {
        if (event.key === 'Enter') {
            sendMessage(); // Chama a função sendMessage() ao pressionar Enter
        }
    }

    // Função para falar um texto em português
    function falar(texto) {
        var synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; // Define o idioma para português
        synth.speak(utterance);
    }

    // Mensagens de saudação inicial
    var saudacoesIniciais = [
        "Preparando as coisas... Olá, estou à sua disposição!",
        "Aguarde um instante... Olá",
        "Iniciando o sistema... Pronto",
        "Preparando Configurações... Olá, estou à disposição!",
        "Carregando recursos... Olá, como posso ser útil?",
        "Aguarde um momento... Olá, estou aqui para ajudar!",
    ];

    // Escolha aleatoriamente uma saudação inicial
    var saudacaoInicial = saudacoesIniciais[Math.floor(Math.random() * saudacoesIniciais.length)];
    falar(saudacaoInicial);

    // Recomendação inicial
    var recomendacoes = [
        "Dica de Hoje: Mantenha-se hidratado e faça pausas regulares.",
        "Sugestão: Lembre-se de alongar-se durante o trabalho.",
        "Dica: Organize sua agenda para aumentar a produtividade.",
        "Lembrete: Reserve um tempo para atividades que você gosta.",
        "Ação: Encontre tempo para relaxar e cuidar de si mesmo.",
        "Recomendação: Seja gentil consigo mesmo e com os outros.",
    ];

    // Escolha aleatoriamente uma recomendação
    var recomendacao = recomendacoes[Math.floor(Math.random() * recomendacoes.length)];
    document.getElementById('recomendacoes').innerText = recomendacao;

    // Função para adicionar animação de piscar nos olhos
    function piscarOlhos() {
        var olhoEsquerdo = document.getElementById('olhoEsquerdo');
        var olhoDireito = document.getElementById('olhoDireito');
        olhoEsquerdo.classList.add('piscando');
        olhoDireito.classList.add('piscando');
        setTimeout(function() {
            olhoEsquerdo.classList.remove('piscando');
            olhoDireito.classList.remove('piscando');
        }, 200);
    }

    // Piscar os olhos a cada 3 segundos
    setInterval(piscarOlhos, 3000);

    // Função para enviar mensagens
    window.sendMessage = function() {
        var inputText = document.getElementById('inputText').value;
        if (inputText.trim() === "") return;
        
        // Enviar a mensagem para a API
        sendMessageToAPI(inputText);
    }

    // Função para enviar a mensagem para a API do Google Gemini
    function sendMessageToAPI(message) {
        var status = document.getElementById('status');
        var inputText = document.getElementById('inputText');
        var sendButton = document.getElementById('sendButton');

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
                
                // Acesse o array `parts` dentro de `content`
                let content = candidate.content;
                let r = 'Texto não encontrado';
                if (content && content.parts && content.parts.length > 0) {
                    // Extraia o texto do primeiro item em `parts`
                    let part = content.parts[0];
                    r = part.text || 'Texto não encontrado';  // Ajuste conforme a estrutura real
                }
                
                // Mostrar a mensagem do usuário e a resposta
                showHistory(message, r);
                
                // Falar a resposta
                falar(r);
                
                status.style.display = 'none';
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

    function showHistory(message, response) {
        var historyBox = document.getElementById('chatArea');

        // Minha mensagem
        var boxMyMessage = document.createElement('div');
        boxMyMessage.className = 'message sent';

        var myMessage = document.createElement('p');
        myMessage.className = 'my-message';
        myMessage.innerHTML = message;

        boxMyMessage.appendChild(myMessage);
        historyBox.appendChild(boxMyMessage);

        // Mensagem de resposta
        var boxResponseMessage = document.createElement('div');
        boxResponseMessage.className = 'message received';

        var chatResponse = document.createElement('p');
        chatResponse.className = 'response-message';
        chatResponse.innerHTML = response;

        boxResponseMessage.appendChild(chatResponse);
        historyBox.appendChild(boxResponseMessage);

        // Levar scroll para o final
        historyBox.scrollTop = historyBox.scrollHeight;
    }

    // Função para alternar o menu
    window.toggleMenu = function() {
        var overlayMenu = document.getElementById('overlayMenu');
        overlayMenu.style.display = overlayMenu.style.display === 'flex' ? 'none' : 'flex';
    }
});
