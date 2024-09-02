const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameOver = false;

let restartOptionSelected = false; // Variável para rastrear se a opção "Reiniciar" foi selecionada

const player = {
    x: canvas.width / 2 - 50, // Posiciona no meio da largura do canvas
    y: canvas.height - 100,   // Posiciona no meio da borda inferior do canvas
    width: 100, // Largura do jogador
    height: 100, // Altura do jogador
    speed: 5, // Velocidade do jogador
    initialPosition: { x: canvas.width / 2 - 50, y: canvas.height - 100 } // Coordenadas iniciais
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

const enemyType1Image = new Image();
enemyType1Image.src = "skins/inimy1.gif";

const enemyType2Image = new Image();
enemyType2Image.src = "skins/inimy2.gif";

const enemyType3Image = new Image();
enemyType3Image.src = "skins/inimy3.gif";

const enemies = [];

function createEnemy(type, x, y, speed) {
    let imageUrl;
    if (type === 1) {
        imageUrl = "skins/inimy1.gif";
    } else if (type === 2) {
        imageUrl = "skins/inimy2.gif";
    } else if (type === 3) {
        imageUrl = "skins/inimy3.gif";
    }

    const image = new Image();
    image.src = imageUrl;

    return {
        type: type,
        x: x,
        y: y,
        width: 100, // Dobra a largura
        height: 100, // Dobra a altura
        speed: speed,
        health: 10, // Adiciona uma propriedade de saúde aos inimigos
        image: image,
        frameIndex: 0, // Adicione um índice de quadro para rastrear a animação
    };
}

function spawnEnemies() {
    const type1Enemy = createEnemy(1, canvas.width, Math.random() * canvas.height, 2);
    const type2Enemy = createEnemy(2, canvas.width, Math.random() * canvas.height, 3);
    const type3Enemy = createEnemy(3, canvas.width, Math.random() * canvas.height, 4);

    enemies.push(type1Enemy, type2Enemy, type3Enemy);
}

function drawEnemies() {
    for (const enemy of enemies) {
        // Desenha o inimigo na posição atual
        ctx.drawImage(
            enemy.image,
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

        enemy.x -= enemy.speed;

        // Verifica a colisão com o tiro
        for (const bullet of bullets) {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 5 > enemy.x && // Ajusta a largura do tiro
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 5 > enemy.y // Ajusta a altura do tiro
            ) {
                // Reduz a saúde do inimigo ao atingi-lo
                enemy.health -= 2; // Ajuste conforme necessário

                // Remove o tiro ao atingir o inimigo
                bullets.splice(bullets.indexOf(bullet), 1);
            }
        }

        // Verifica se o inimigo está sem vida
        if (enemy.health <= 0) {
            // Remove o inimigo quando sem vida
            enemies.splice(enemies.indexOf(enemy), 1);
        }
    }
}


const playerImage = new Image();
playerImage.src = "skins/baloon.png";

const backgroundImage = new Image();
backgroundImage.src = "2.gif";

let backgroundPosition = 0;
let gameRunning = false;
let lives = 3;
let paused = false;

const bullets = [];

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
        keys.ArrowUp = true;
    } else if (e.key === "ArrowDown") {
        keys.ArrowDown = true;
    } else if (e.key === "ArrowLeft") {
        keys.ArrowLeft = true;
    } else if (e.key === "ArrowRight") {
        keys.ArrowRight = true;
    } else if (e.key === " ") {
        keys.Space = true;
    } else if (e.key === "Escape") {
        togglePause();
    }
}

function handleKeyUp(e) {
    if (e.key === "ArrowUp") {
        keys.ArrowUp = false;
    } else if (e.key === "ArrowDown") {
        keys.ArrowDown = false;
    } else if (e.key === "ArrowLeft") {
        keys.ArrowLeft = false;
    } else if (e.key === "ArrowRight") {
        keys.ArrowRight = false;
    } else if (e.key === " ") {
        keys.Space = false;
    }
}

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    document.getElementById("menu").style.display = "none";
    gameRunning = true;
    gameLoop();
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawBackground() {
    backgroundPosition += 2;
    
    // Move o fundo de cima para baixo
    ctx.drawImage(backgroundImage, 0, backgroundPosition, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, backgroundPosition - canvas.height, canvas.width, canvas.height);

    if (backgroundPosition >= canvas.height) {
        backgroundPosition = 0;
    }
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Vidas: " + lives, 10, 30);
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 10, 60); // Adjust the position as needed
}

let displayedScore = 0; // Initialize the displayed score
const scoreIncrement = 10; // Adjust the increment value as needed

function handleScoring() {
    const scoreDifference = score - displayedScore;
    if (scoreDifference > scoreIncrement) {
        displayedScore += scoreIncrement; // Increment the displayed score
    } else {
        displayedScore = score; // Set the displayed score to the actual score
    }
}

function checkCollision() {
    for (const enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Reduz uma vida ao colidir com um inimigo
            lives--;

            // Define a posição inicial do jogador após a colisão
            player.x = 20;
            player.y = canvas.height / 2 - 50;
        }
    }
}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(bullets[i].x, bullets[i].y, 5, 5);

        bullets[i].x += 5;

        if (bullets[i].x > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

const backgroundMusic = new Audio("sky.wav");
backgroundMusic.loop = true;  // Para repetir a música em um loop
backgroundMusic.volume = 0.5; // Ajuste o volume conforme necessário

let startTime = Date.now();

function startGame() {
    document.getElementById("menu").style.display = "none";
    gameRunning = true;
    startTime = Date.now(); // Reinicia o tempo quando o jogo começa
    backgroundMusic.play();
    gameLoop();
}

const pauseSound = new Audio("pause.wav");

function togglePause() {
    paused = !paused;

    if (paused) {
        // Pausa a música quando o jogo é pausado
        backgroundMusic.pause();

        // Reproduz o som do pause
        pauseSound.currentTime = 0;
        pauseSound.play();

        // Desenha um retângulo opaco
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";  // Preto com 70% de opacidade
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenha o texto "Jogo Pausado"
        ctx.font = "40px Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("Jogo Pausado", canvas.width / 2, canvas.height / 2 - 40);

        // Desenha as opções "Reiniciar" e "Retornar"
        ctx.font = "30px Arial";
        ctx.fillText("Reiniciar", canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Retornar", canvas.width / 2, canvas.height / 2 + 60);
    } else {
        // Retoma a música quando o jogo é despausado
        backgroundMusic.play();

        // Se o jogo não estiver pausado, continue o loop
        requestAnimationFrame(gameLoop);
    }
}

// Add a variable to keep track of the score
let score = 0;

// Function to update the score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.textContent = score;
}

let lastScoreIncrementTime = Date.now(); // Variable to track the last time the score was incremented

// In your game loop, call handleScoring() to update the score based on game events
function gameLoop() {
    if (!gameRunning) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!paused) {
        drawBackground();
        drawPlayer();
        checkCollision();
        drawLives();
        drawScore(); // Call the drawScore function to display the score
        drawBullets();
        drawEnemies();
        
        // Call handleScoring to update the score based on game events
        handleScoring();

        if (lives <= 0) {
            endGame();
            return;
        }

        if (Math.random() < 0.01) {
            spawnEnemies();
        }

        if (keys.ArrowUp && player.y > 0) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    }

    requestAnimationFrame(gameLoop);

    // Calculate the elapsed time since the last score increment
    const elapsedTimeSinceIncrement = Date.now() - lastScoreIncrementTime;

    // If 10 seconds have passed since the last score increment, increase the score by 1
    if (elapsedTimeSinceIncrement >= 2000) {
        score++; // Increment the score by 1
        lastScoreIncrementTime = Date.now(); // Update the last score increment time
    }
}

// Inicie o loop do jogo
gameLoop();

function restartGame() {
    // Reinicie as variáveis do jogo para seus valores iniciais
    backgroundPosition = 0;
    lives = 3;
    bullets.length = 0; // Limpe o array de balas
    startTime = Date.now(); // Reinicie o tempo quando o jogo começa
    restartOptionSelected = false; // Reinicie a seleção da opção "Reiniciar"
    gameOver = false; // Reset the game over state

    // Configure o jogador nas coordenadas iniciais
    player.x = player.initialPosition.x;
    player.y = player.initialPosition.y;

    gameLoop(); // Inicie o loop do jogo novamente
}

document.addEventListener("click", (event) => {
    if (paused) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        // Verifica se o clique foi dentro da área das opções
        if (
            mouseX > canvas.width / 2 - 50 && mouseX < canvas.width / 2 + 50 &&
            mouseY > canvas.height / 2 && mouseY < canvas.height / 2 + 30
        ) {
            // O clique foi na opção "Reiniciar"
            restartOptionSelected = true;
            togglePause();
        } else if (
            mouseX > canvas.width / 2 - 50 && mouseX < canvas.width / 2 + 50 &&
            mouseY > canvas.height / 2 + 40 && mouseY < canvas.height / 2 + 70
        ) {
            // O clique foi na opção "Retornar"
            restartOptionSelected = false;
            togglePause();
        }
    }
});

function endGame() {
    gameOver = true;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "40px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = "20px Arial";
    ctx.fillText("Aperte 'F5' para Reiniciar", canvas.width / 2, canvas.height / 2 + 20);
}


document.addEventListener("keydown", (e) => {
    if (e.key in keys) {
        keys[e.key] = true;

        if (e.key === "Escape") {
            togglePause();
        }

        if (gameOver && e.key === "Enter") {
            restartGame();
        }
    }
});


document.addEventListener("keyup", (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

// Remova a chamada duplicada para gameLoop() aqui

