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
let backgroundMusic = new Audio("audio/background-music.mp3"); // Musique de fond
let collisionSound = new Audio("audio/explosion-sound.mp3"); // Bruit de collision

// Images
let explosionImage = new Image();
explosionImage.src = "images/explosion.png"; // Image d'explosion

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

    explode() {
        // Afficher l'explosion
        ctx.drawImage(explosionImage, this.x - 20, this.y - 20, 40, 40);
        collisionSound.play(); // Bruit d'explosion
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
    player = new Player(canvas.width / 2, canvas.height - 30, "#00baff"); // Joueur
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

    // Mettre à jour les flèches
    player.bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        // Vérifier la collision avec les ennemis
        enemies.forEach((enemy, enemyIndex) => {
            if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < bullet.radius + enemy.radius) {
                enemy.explode(); // Effet d'explosion
                enemies.splice(enemyIndex, 1); // Supprimer l'ennemi
                player.bullets.splice(index, 1); // Supprimer la flèche
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

        // Vérifier la collision avec le joueur
        if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < player.radius + enemy.radius) {
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
    if (event.key === "ArrowLeft") player.move("left");
    if (event.key === "ArrowRight") player.move("right");
    if (event.key === "ArrowUp") player.move("up");
    if (event.key === "ArrowDown") player.move("down");

    if (event.key === "j") player.shoot(); // Joueur attaque
});

// Recommencer après la fin du jeu
document.getElementById("replay").addEventListener("click", startGame);
document.getElementById("startGame").addEventListener("click", startGame);
