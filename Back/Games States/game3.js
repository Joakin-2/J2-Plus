const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameOver = false;
let restartOptionSelected = false;

const player = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 100,
    height: 100,
    speed: 5,
    initialPosition: { x: canvas.width / 2 - 50, y: canvas.height - 100 }
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

const enemyType1Image = new Image();
enemyType1Image.src = "skins/enemy.png";

const playerGunImage = new Image();
// Certifique-se de carregar a imagem antes de iniciar o jogo
playerGunImage.src = "Skins/luz.png"; 

const enemies = [];
const bullets = [];

const shootCooldownTime = 500;
let shootCooldown = 0;

function createEnemy(type, x, y, speed) {
    const imageUrl = "skins/enemy.png";
    const image = new Image();
    image.src = imageUrl;

    return {
        type: type,
        x: x,
        y: y,
        width: 100,
        height: 100,
        speed: speed,
        health: 10,
        image: image,
        frameIndex: 0,
    };
}

function spawnEnemies() {
    const spawnDirection = Math.floor(Math.random() * 4);
    let x, y, speed;

    switch (spawnDirection) {
        case 0:
            x = 0;
            y = Math.random() * canvas.height;
            speed = Math.random() * (4 - 2) + 2;
            break;
        case 1:
            x = canvas.width;
            y = Math.random() * canvas.height;
            speed = Math.random() * (4 - 2) + 2;
            break;
        case 2:
            x = Math.random() * canvas.width;
            y = 0;
            speed = Math.random() * (4 - 2) + 2;
            break;
        case 3:
            x = Math.random() * canvas.width;
            y = canvas.height;
            speed = Math.random() * (4 - 2) + 2;
            break;
        default:
            break;
    }

    const type1Enemy = createEnemy(1, x, y, speed);
    enemies.push(type1Enemy);
}

function drawEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        // Verifica se o inimigo ainda está na tela
        if (enemy.x + enemy.width > 0) {
            // Calcula a direção do jogador em relação ao inimigo
            const deltaX = player.x - enemy.x;
            const deltaY = player.y - enemy.y;

            // Calcula o ângulo entre o inimigo e o jogador
            const angle = Math.atan2(deltaY, deltaX);

            // Calcula as componentes de velocidade com base no ângulo
            const speedX = Math.cos(angle) * enemy.speed;
            const speedY = Math.sin(angle) * enemy.speed;

            // Move o inimigo em direção ao jogador
            enemy.x += speedX;
            enemy.y += speedY;

            ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);

            for (const bullet of bullets) {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + 5 > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + 5 > enemy.y
                ) {
                    enemy.health -= 2;
                    bullets.splice(bullets.indexOf(bullet), 1);
                }
            }

            if (enemy.health <= 0) {
                enemies.splice(i, 1);
            }
        } else {
            // Remove o inimigo se ele estiver fora da tela
            enemies.splice(i, 1);
        }
    }
}

const playerImage = new Image();
playerImage.src = "skins/tick.png";

const backgroundImage = new Image();
backgroundImage.src = "3.jpg";

let backgroundPosition = 0;
let gameRunning = false;
let lives = 3;
let paused = false;

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
        console.log("Tecla de espaço pressionada");
        keys.Space = true;
        shoot();  // Chama a função shoot() quando a tecla de espaço é pressionada
        e.preventDefault();
    } else if (e.key === "Escape") {
        togglePause();
    }
}

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
        console.log("Tecla de espaço pressionada");
        keys.Space = true;
        shoot();  // Chama a função shoot() quando a tecla de espaço é pressionada
        e.preventDefault();
    } else if (e.key === "Escape") {
        console.log("Tecla Esc pressionada");
        togglePause();
    }
}

function shoot() {
    console.log("Tiro!");
    if (shootCooldown > 0) {
        return;
    }

    bullets.push({
        x: player.x + player.width / 2,
        y: player.y + player.height / 2,
        color: "#ffffff",
        speed: 8
    });

    shootCooldown = shootCooldownTime;
}

document.getElementById("startButton").addEventListener("click", startGame);

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillStyle = bullets[i].color;
        ctx.fillRect(bullets[i].x, bullets[i].y, 5, 5);

        bullets[i].x += bullets[i].speed;

        if (bullets[i].x > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }

    if (shootCooldown > 0) {
        shootCooldown -= deltaTime;
    }
}

const backgroundMusic = new Audio("ticks.wav");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

let startTime = Date.now();

function startGame() {
    document.getElementById("menu").style.display = "none";
    gameRunning = true;
    startTime = Date.now();
    backgroundMusic.play();
    gameLoop();
}

const pauseSound = new Audio("pause.wav");


function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    
    // Adiciona a imagem da arma do jogador
    ctx.drawImage(playerGunImage, player.x + player.width, player.y + player.height / 2);
}

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
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
            lives--;
            player.x = 20;
            player.y = canvas.height / 2 - 50;
        }
    }
}

function togglePause() {
    paused = !paused;

    if (paused) {
        backgroundMusic.pause();
        pauseSound.currentTime = 0;
        pauseSound.play();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("Jogo Pausado", canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = "30px Arial";
        ctx.fillText("Reiniciar", canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Retornar", canvas.width / 2, canvas.height / 2 + 60);
    } else {
        backgroundMusic.play();
    }

    requestAnimationFrame(gameLoop);
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
        drawBackground();
        drawPlayer();
        checkCollision();
        drawLives();
        drawScore();
        drawBullets();
        drawEnemies();  // Adicione esta linha para desenhar os inimigos

        if (lives <= 0) {
            endGame();
            return;
        }

        if (Math.random() < 0.01) {
            spawnEnemies();  // Adicione esta linha para gerar inimigos aleatoriamente
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

function restartGame() {
    backgroundPosition = 0;
    lives = 3;
    bullets.length = 0;
    startTime = Date.now();
    restartOptionSelected = false;
    gameOver = false;
    player.x = player.initialPosition.x;
    player.y = player.initialPosition.y;
    gameLoop();
}

document.addEventListener("click", (event) => {
    if (paused) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (
            mouseX > canvas.width / 2 - 50 && mouseX < canvas.width / 2 + 50 &&
            mouseY > canvas.height / 2 && mouseY < canvas.height / 2 + 30
        ) {
            restartOptionSelected = true;
            togglePause();
        } else if (
            mouseX > canvas.width / 2 - 50 && mouseX < canvas.width / 2 + 50 &&
            mouseY > canvas.height / 2 + 40 && mouseY < canvas.height / 2 + 70
        ) {
            restartOptionSelected = false;
            togglePause();
        }
    }
});

function endGame() {
    gameOver = true;
    backgroundMusic.pause();
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

gameLoop();
