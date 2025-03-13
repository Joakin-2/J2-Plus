const apiKey = 'AIzaSyAvpvehwHv1RN-vwnmth-3asp0kF0z5kPg';  // Substitua com sua chave de API do Google Gemini
const apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const sendButton = document.getElementById('sendButton');
    const status = document.getElementById('status');
    const uiSound = document.getElementById('uiSound');
    const historyBox = document.getElementById('history');
    const container = document.getElementById('container');

    let commandMode = false;

    function sendMessage() {
        if (!inputText.value.trim()) {
            inputText.style.border = '1px solid red';
            return;
        }
        inputText.style.border = 'none';

        status.style.display = 'block';
        status.innerHTML = 'Carregando...';
        sendButton.disabled = true;
        sendButton.style.cursor = 'not-allowed';
        inputText.disabled = true;

        fetch(`${apiEndpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'pt-BR'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: inputText.value
                            }
                        ]
                    }
                ]
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log('Resposta da API:', response);
            if (response.candidates && response.candidates.length > 0) {
                let candidate = response.candidates[0];
                console.log('Primeiro candidato:', candidate);
                console.log('Conteúdo do candidato:', candidate.content);
                
                let content = candidate.content;
                let r = 'Texto não encontrado';
                if (content && content.parts && content.parts.length > 0) {
                    let part = content.parts[0];
                    r = part.text || 'Texto não encontrado';
                }
                
                showHistory(inputText.value, r);
                
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
        var boxMyMessage = document.createElement('div');
        boxMyMessage.className = 'box-my-message';

        var myMessage = document.createElement('p');
        myMessage.className = 'my-message';
        myMessage.innerHTML = message;

        boxMyMessage.appendChild(myMessage);
        historyBox.appendChild(boxMyMessage);

        var boxResponseMessage = document.createElement('div');
        boxResponseMessage.className = 'box-response-message';

        var chatResponse = document.createElement('p');
        chatResponse.className = 'response-message';
        chatResponse.innerHTML = response;

        boxResponseMessage.appendChild(chatResponse);
        historyBox.appendChild(boxResponseMessage);

        historyBox.scrollTop = historyBox.scrollHeight;
    }

    sendButton.addEventListener('click', sendMessage);

    function startRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Reconhecido:', transcript);

            if (transcript === 'miguel') {
                uiSound.play(); // Toca o som quando "Miguel" é reconhecido
                container.classList.add('show-chat'); // Mostra o chat
                commandMode = true; // Ativa o modo de comando
                recognition.stop(); // Para o reconhecimento de voz após ativar o modo de comando

                // Recomeçar reconhecimento para captura de perguntas
                startCommandRecognition();
            } else if (commandMode) {
                // Se em modo de comando e ouvir outra coisa, processa como uma pergunta
                inputText.value = transcript;
                sendMessage();
                commandMode = false; // Desativa o modo de comando após enviar a pergunta
                container.classList.remove('show-chat'); // Oculta o chat
            }
        };

        recognition.onerror = function(event) {
            console.error('Erro no reconhecimento de voz:', event.error);
        };

        recognition.start();
    }

    function falar(texto) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; // Define o idioma para português
        
        // Obtém as vozes disponíveis
        const vozes = synth.getVoices();
    
        // Encontra a voz masculina em português
        let vozMasculina = null;
        for (let i = 0; i < vozes.length; i++) {
            if (vozes[i].lang === 'pt-BR' && vozes[i].name.includes('male')) {
                vozMasculina = vozes[i];
                break;
            }
        }
    
        // Se uma voz masculina for encontrada, atribui a voz à utterance
        if (vozMasculina) {
            utterance.voice = vozMasculina;
        }
    
        // Faz o navegador falar
        synth.speak(utterance);
    }

    window.onload = function() {
        var hoje = new Date();
        
        // Verifica se hoje é o seu aniversário (5 de fevereiro)
        var aniversario = new Date(hoje.getFullYear(), 1, 5); // 1 é fevereiro
        if (hoje.getDate() === aniversario.getDate() && hoje.getMonth() === aniversario.getMonth()) {
            // Exibe a mensagem de parabéns
            document.getElementById("parabensMensagem").style.display = "block";
            
            // Fala a mensagem de parabéns
            falar("Parabéns, Joaquim! Que seu dia seja incrível!");
    
            // Chama a função para exibir os confetes
            gerarConfetes();
        }
        
        // Verifica se hoje é Natal (25 de dezembro)
        var natal = new Date(hoje.getFullYear(), 11, 25); // 11 é dezembro
        if (hoje.getDate() === natal.getDate() && hoje.getMonth() === natal.getMonth()) {
            // Exibe a mensagem de Natal
            document.getElementById("natalMensagem").style.display = "block";
            
            // Fala a mensagem de Natal
            falar("Feliz Natal, Joaquim! Que seu coração se encha de alegria e paz nesta data especial!");
    
            // Chama a função para exibir os flocos de neve
            gerarNeve();
        }
    };
    
    // Função para gerar flocos de neve
function gerarNeve() {
    const neveContainer = document.getElementById('neve');
    for (let i = 0; i < 100; i++) {
        const floco = document.createElement('div');
        floco.classList.add('neve');
        floco.style.left = `${Math.random() * 100}vw`;
        floco.style.animationDuration = `${Math.random() * 5 + 5}s`;
        floco.style.animationDelay = `${Math.random() * 5}s`;
        neveContainer.appendChild(floko);
    }
}

// Função para gerar confetes
function gerarConfetes() {
    const confetesContainer = document.getElementById('confetes');
    const cores = ['#ff4b4b', '#f4e04d', '#00ff00', '#ff00ff', '#00b0f0'];
    
    for (let i = 0; i < 100; i++) {
        const confete = document.createElement('div');
        confete.classList.add('confete');
        confete.style.left = `${Math.random() * 100}vw`;
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confete.style.animationDelay = `${Math.random() * 3}s`;
        confetesContainer.appendChild(confete);
    }
}

    function startCommandRecognition() {
        // Inicia o reconhecimento de voz para capturar perguntas
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Pergunta reconhecida:', transcript);
            inputText.value = transcript;
            sendMessage(); // Envia a pergunta para a API
            commandMode = false; // Desativa o modo de comando após enviar a pergunta
            container.classList.remove('show-chat'); // Oculta o chat
        };

        recognition.onerror = function(event) {
            console.error('Erro no reconhecimento de voz:', event.error);
        };

        recognition.start();
    }

    // Inicia o reconhecimento de voz
    startRecognition();
});
