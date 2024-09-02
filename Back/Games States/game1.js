const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameOver = false;

let restartOptionSelected = false; // Variável para rastrear se a opção "Reiniciar" foi selecionada

const player = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 100, // Dobra a largura
    height: 100, // Dobra a altura
    speed: 5
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

const enemyType1Image = new Image();
enemyType1Image.src = "skins/inimigo1.png";

const enemyType2Image = new Image();
enemyType2Image.src = "skins/inimigo2.png";

const enemies = [];

function createEnemy(type, x, y, speed) {
    return {
        type: type,
        x: x,
        y: y,
        width: 100, // Dobra a largura
        height: 100, // Dobra a altura
        speed: speed,
        health: 10, // Adiciona uma propriedade de saúde aos inimigos
        image: type === 1 ? enemyType1Image : enemyType2Image
    };
}

function spawnEnemies() {
    const type1Enemy = createEnemy(1, canvas.width, Math.random() * canvas.height, 2);
    const type2Enemy = createEnemy(2, canvas.width, Math.random() * canvas.height, 3);

    enemies.push(type1Enemy, type2Enemy);
}

function drawEnemies() {
    for (const enemy of enemies) {
        ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
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
playerImage.src = "skins/nave.png";

const backgroundImage = new Image();
backgroundImage.src = "1.gif";

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
    ctx.drawImage(backgroundImage, backgroundPosition, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, backgroundPosition - canvas.width, 0, canvas.width, canvas.height);

    if (backgroundPosition >= canvas.width) {
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

const tiroSound = new Audio("tiro.wav");

function shoot() {
    const bullet = {
        x: player.x + player.width,
        y: player.y + player.height / 2
    };
    bullets.push(bullet);

    // Reproduz o som do tiro
    tiroSound.currentTime = 0;
    tiroSound.play();
}


const backgroundMusic = new Audio("electric.wav");
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

function gameLoop() {
    if (!gameRunning) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!paused) {
        if (!paused) {
            drawBackground();
            drawPlayer();
            checkCollision();
            drawLives();
            drawScore();
            drawBullets();
            drawEnemies(); // Adiciona o desenho dos inimigos ao loop do jogo
    
            if (lives <= 0) {
                endGame();
                return;
            }
    
            if (keys.Space) {
                shoot();
            }
    
            // Adiciona novos inimigos a cada 3 segundos
            if (Math.random() < 0.01) {
                spawnEnemies();
            }
        }

        // Atualizar posição da nave do jogador
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

    // Verifique se já se passou um minuto
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // em segundos

    if (elapsedTime > 60) {
        // Reinicie a música após 1 minuto
        backgroundMusic.currentTime = 0;
        startTime = currentTime;
    }

    if (paused) {
        // Se a opção "Reiniciar" foi selecionada, reinicie o jogo
        if (restartOptionSelected) {
            restartGame();
        }
    }

    // Continue o loop do jogo
    if (!paused) {
        requestAnimationFrame(gameLoop);
    } else {
        // Adicione uma pausa curta antes de chamar novamente o loop
        setTimeout(() => {
            requestAnimationFrame(gameLoop);
        }, 100);
    }
    
    // Calculate the elapsed time since the last score increment
    const elapsedTimeSinceIncrement = Date.now() - lastScoreIncrementTime;

    // If 10 seconds have passed since the last score increment, increase the score by 1
    if (elapsedTimeSinceIncrement >= 2000) {
        score++; // Increment the score by 1
        lastScoreIncrementTime = Date.now(); // Update the last score increment time
    }
}

function restartGame() {
    // Reinicie as variáveis do jogo para seus valores iniciais
    backgroundPosition = 0;
    lives = 3;
    bullets.length = 0; // Limpe o array de balas
    startTime = Date.now(); // Reinicie o tempo quando o jogo começa
    restartOptionSelected = false; // Reinicie a seleção da opção "Reiniciar"
    gameOver = false; // Reset the game over state
    player.x = 20;
    player.y = canvas.height / 2 - 50;
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

        if (e.key === " ") {
            shoot();
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

