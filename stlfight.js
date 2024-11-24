// Variables de jeu
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let gameArea = document.getElementById("jeu");
let gameOverScreen = document.getElementById("gameOver");
let scoreDisplay = document.getElementById("score");
let score = 0;
let isGameOver = false;
let player1, player2;
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
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.color = color;
        this.speed = playerSpeed;
        this.bullets = [];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(direction) {
        if (direction === "left" && this.x - this.radius > 0) this.x -= this.speed;
        if (direction === "right" && this.x + this.radius < canvas.width) this.x += this.speed;
        if (direction === "up" && this.y - this.radius > 0) this.y -= this.speed;
        if (direction === "down" && this.y + this.radius < canvas.height) this.y += this.speed;
    }

    shoot() {
        let bullet = new Bullet(this.x, this.y);
        this.bullets.push(bullet);
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

// Classe pour les flèches tirées par les joueurs
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.speed = 7;
        this.color = "#00ff00"; // Flèches vertes
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y -= this.speed; // Les flèches montent vers les ennemis
    }
}

// Fonction pour démarrer le jeu
function startGame() {
    score = 0;
    enemies = [];
    bullets = [];
    isGameOver = false;
    player1 = new Player(canvas.width / 4, canvas.height - 30, "#00baff"); // Joueur 1
    player2 = new Player(3 * canvas.width / 4, canvas.height - 30, "#ff00ff"); // Joueur 2
    backgroundMusic.play();
    gameArea.style.display = "block";
    gameOverScreen.style.display = "none";
    requestAnimationFrame(updateGame);
}

// Fonction de mise à jour du jeu
function updateGame() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    player1.draw();
    player2.draw();

    // Mettre à jour les flèches
    player1.bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        // Vérifier la collision avec les ennemis
        enemies.forEach((enemy, enemyIndex) => {
            if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < bullet.radius + enemy.radius) {
                collisionSound.play();
                enemies.splice(enemyIndex, 1); // Supprimer l'ennemi
                player1.bullets.splice(index, 1); // Supprimer la flèche
                score++; // Ajouter des points
                // Générer un nouvel ennemi
                enemies.push(new Enemy());
            }
        });
    });

    // Mettre à jour les ennemis
    if (Math.random() < 0.02) {
        enemies.push(new Enemy());
    }

    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw();

        // Vérifier la collision avec les joueurs
        if (Math.hypot(enemy.x - player1.x, enemy.y - player1.y) < player1.radius + enemy.radius ||
            Math.hypot(enemy.x - player2.x, enemy.y - player2.y) < player2.radius + enemy.radius) {
            isGameOver = true;
            gameOverScreen.style.display = "block";
            scoreDisplay.textContent = "Score: " + score;
        }
    });

    // Afficher le score
    scoreDisplay.textContent = "Score: " + score;
    requestAnimationFrame(updateGame);
}

// Commandes de jeu
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") player1.move("left");
    if (event.key === "ArrowRight") player1.move("right");
    if (event.key === "ArrowUp") player1.move("up");
    if (event.key === "ArrowDown") player1.move("down");

    if (event.key === "j") player1.shoot(); // Joueur 1 attaque

    if (event.key === "/") player2.shoot(); // Joueur 2 attaque
});

// Recommencer après la fin du jeu
document.getElementById("replay").addEventListener("click", startGame);
document.getElementById("mode1").addEventListener("click", startGame);
