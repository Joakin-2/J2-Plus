const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'pt-BR';
recognition.continuous = true;
recognition.interimResults = false;

const voiceStatus = document.getElementById("voiceStatus");
const beep = document.getElementById("beep");
let ativado = false;

let vozMasculina = null;

// Aguarda as vozes carregarem e seleciona voz masculina
function selecionarVozMasculina() {
    const vozes = synth.getVoices();
    vozMasculina = vozes.find(voz => 
        voz.lang.startsWith('pt') && (
            voz.name.toLowerCase().includes('male') ||
            voz.name.toLowerCase().includes('homem') ||
            voz.name.toLowerCase().includes('bruno')
        )
    );

    if (!vozMasculina) {
        vozMasculina = vozes.find(voz => voz.lang.startsWith('pt'));
    }
}

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = selecionarVozMasculina;
} else {
    selecionarVozMasculina();
}

// Função falar usando voz masculina (ou a padrão)
function falar(texto) {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'pt-BR';
    if (vozMasculina) {
        utter.voice = vozMasculina;
    }
    synth.speak(utter);
}

// Botão de ativação
document.getElementById("ativarBtn").addEventListener("click", () => {
    recognition.start();
    document.getElementById("ativarBtn").style.display = "none"; // esconde botão
});

// Envia para a OpenAI
async function consultarOpenAI(pergunta) {
   const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Você é um assistente simpático e divertido chamado Miguel." },
            { role: "user", content: pergunta } // mensagem vem do front-end
        ]
    },
    {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }
);


    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro na API OpenAI: ${response.status} - ${errorText}`);
        throw new Error(`Erro OpenAI: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Resposta da OpenAI no formato inesperado");
    }

    return data.choices[0].message.content.trim();
}

// Quando o reconhecimento escuta algo
let esperandoResposta = false;

recognition.onresult = async (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("Você disse:", transcript);

    if (!ativado && transcript.includes("miguel")) {
        ativado = true;
        voiceStatus.style.display = "block";
        voiceStatus.textContent = "🎙️ Estou ouvindo você...";
        beep.play();
        falar("Olá! Pode falar comigo.");
    } else if (ativado && !esperandoResposta) {
        esperandoResposta = true;
        beep.play();
        voiceStatus.textContent = `🎧 Pensando...`;

        try {
            const resposta = await consultarOpenAI(transcript);
            console.log("IA:", resposta);
            voiceStatus.textContent = "🎙️ Estou ouvindo...";
            falar(resposta);
        } catch (error) {
            console.error(error);
            voiceStatus.textContent = "❌ Erro ao obter resposta. Tente novamente mais tarde.";
            falar("Desculpe, estou com dificuldades para responder agora. Por favor, tente novamente mais tarde.");
        } finally {
            esperandoResposta = false;
        }
    }
};

recognition.start();

document.getElementById("container").addEventListener("click", () => {
    try {
        recognition.start();
        console.log("Reconhecimento de voz iniciado por clique.");
        voiceStatus.style.display = "block";
        voiceStatus.textContent = "🎙️ Estou ouvindo você...";
    } catch (e) {
        console.error("Erro ao tentar iniciar o reconhecimento:", e);
    }
});

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
