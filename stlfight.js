// Variables de jeu
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let gameArea = document.getElementById("jeu");
let gameOverScreen = document.getElementById("gameOver");
let scoreDisplay = document.getElementById("score");
let score = 0;
let isGameOver = false;
let player;
let enemies = [];
let enemySpeed = 2;
let playerSpeed = 5;
let bullets = [];
let backgroundMusic = new Audio("background-music.mp3"); // Musique de fond
let collisionSound = new Audio("collision-sound.mp3"); // Bruit de collision

// Dimensions du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Classe pour le joueur
class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.radius = 20;
        this.color = "#00baff";  // Cosmorael's color
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(direction) {
        if (direction === "left" && this.x - this.radius > 0) this.x -= playerSpeed;
        if (direction === "right" && this.x + this.radius < canvas.width) this.x += playerSpeed;
        if (direction === "up" && this.y - this.radius > 0) this.y -= playerSpeed;
        if (direction === "down" && this.y + this.radius < canvas.height) this.y += playerSpeed;
    }
}

// Classe pour les ennemis
class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.radius = Math.random() * 20 + 10;
        this.speed = enemySpeed;
        this.color = "#ff5555"; // Red enemy color
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
    }
}

// Fonction pour démarrer le jeu
function startGame() {
    score = 0;
    enemies = [];
    bullets = [];
    isGameOver = false;
    player = new Player();
    backgroundMusic.play();
    gameArea.style.display = "block";
    gameOverScreen.style.display = "none";
    requestAnimationFrame(updateGame);
}

// Fonction de mise à jour du jeu
function updateGame() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    player.draw();

    // Mettre à jour les ennemis
    if (Math.random() < 0.02) {
        enemies.push(new Enemy());
    }

    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw();
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }

        // Vérifier les collisions
        if (Math.hypot(player.x - enemy.x, player.y - enemy.y) < player.radius + enemy.radius) {
            collisionSound.play();
            gameOver();
        }
    });

    // Afficher le score
    scoreDisplay.textContent = "Score: " + score;

    requestAnimationFrame(updateGame);
}

// Fonction pour la fin de jeu
function gameOver() {
    isGameOver = true;
    backgroundMusic.pause();
    gameArea.style.display = "none";
    gameOverScreen.style.display = "block";
}

// Gérer les événements de déplacement du joueur
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
        player.move("left");
    }
    if (e.key === "ArrowRight" || e.key === "d") {
        player.move("right");
    }
    if (e.key === "ArrowUp" || e.key === "w") {
        player.move("up");
    }
    if (e.key === "ArrowDown" || e.key === "s") {
        player.move("down");
    }
});

// Gérer le bouton de redémarrage
document.getElementById("replay").addEventListener("click", () => {
    startGame();
});

// Gérer les boutons de mode de jeu
document.getElementById("mode1").addEventListener("click", () => {
    startGame();
});

document.getElementById("mode2").addEventListener("click", () => {
    startGame();
});
