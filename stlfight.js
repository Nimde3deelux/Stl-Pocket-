// Variables de jeu
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let gameArea = document.getElementById("jeu");
let gameOverScreen = document.getElementById("gameOver");
let scoreDisplay = document.getElementById("score");
let score = 0;
let health = 100;
let isGameOver = false;
let player;
let enemies = [];
let bullets = [];
let enemySpeed = 2;
let playerSpeed = 8;
let backgroundMusic = new Audio("audio/background-music.mp3"); // Musique de fond
let collisionSound = new Audio("audio/explosion-sound.mp3"); // Bruit de collision

// Images
let playerImage = new Image();
playerImage.src = "images/personnage.png"; // Image du joueur
let explosionImage = new Image();
explosionImage.src = "images/explosion.png"; // Image d'explosion

// Images des ennemis
let enemyImages = {
    small: "images/petit.png",
    medium: "images/moyen.png",
    large: "images/gros.png",
    boss: "images/boss.png"
};

// Dimensions du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Classe pour le joueur
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = playerImage;
        this.speed = playerSpeed;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(direction) {
        if (direction === "left" && this.x > 0) this.x -= this.speed;
        if (direction === "right" && this.x + this.width < canvas.width) this.x += this.speed;
        if (direction === "up" && this.y > 0) this.y -= this.speed;
        if (direction === "down" && this.y + this.height < canvas.height) this.y += this.speed;
    }

    shoot() {
        let bullet = new Bullet(this.x + this.width / 2, this.y);
        bullets.push(bullet);
    }
}

// Classe pour les ennemis
class Enemy {
    constructor(type) {
        this.type = type;
        this.image = new Image();
        this.image.src = enemyImages[type];
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.width = 50;
        this.height = 50;
        this.speed = enemySpeed;
        this.health = type === "boss" ? 200 : 100; // Boss a plus de vie
        this.isShooting = type === "medium" || type === "boss"; // Seuls les ennemis moyens et boss tirent
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }

    shoot() {
        if (Math.random() < 0.01) { // Les ennemis tirent aléatoirement
            let bullet = new EnemyBullet(this.x + this.width / 2, this.y + this.height);
            bullets.push(bullet);
        }
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

// Classe pour les flèches tirées par les ennemis
class EnemyBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.speed = 5;
        this.color = "#ff0000"; // Flèches rouges
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed; // Les flèches descendent
    }
}

// Fonction pour démarrer le jeu
function startGame() {
    score = 0;
    health = 100;
    isGameOver = false;
    player = new Player(canvas.width / 2 - 25, canvas.height - 60);
    enemies = [];
    bullets = [];
    gameArea.style.display = "block";
    gameOverScreen.style.display = "none";
    document.getElementById("accueil").style.display = "none";

    // Lance la musique de fond
    backgroundMusic.play();
    backgroundMusic.loop = true;

    gameLoop();
}

// Fonction de mise à jour du jeu
function gameLoop() {
    if (isGameOver) {
        gameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacer et dessiner le joueur
    player.draw();

    // Déplacer et dessiner les ennemis
    if (Math.random() < 0.02) { // Création d'ennemis aléatoires
        let type = "small"; // Par défaut, petit ennemi
        if (Math.random() < 0.1) type = "medium";
        if (Math.random() < 0.05) type = "boss";
        enemies.push(new Enemy(type));
    }

    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
        if (enemy.isShooting) {
            enemy.shoot();
        }
    });

    // Déplacer et dessiner les flèches
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        // Vérification de la collision entre flèches et ennemis
        enemies.forEach((enemy, enemyIndex) => {
            let dx = bullet.x - (enemy.x + enemy.width / 2);
            let dy = bullet.y - (enemy.y + enemy.height / 2);
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bullet.radius + enemy.width / 2) {
                // Explosion et suppression de l'ennemi
                collisionSound.play();
                score += 10;
                enemies.splice(enemyIndex, 1);
                explosions.push({x: enemy.x, y: enemy.y});
            }
        });

        // Supprimer les flèches en dehors de l'écran
        if (bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });

    // Vérification des collisions avec les ennemis
    enemies.forEach(enemy => {
        if (enemy.y + enemy.height > player.y && enemy.y < player.y + player.height && enemy.x + enemy.width > player.x && enemy.x < player.x + player.width) {
            health -= 10;
            if (health <= 0) {
                isGameOver = true;
            }
        }
    });

    // Mettre à jour la barre de vie
    document.getElementById("health").style.width = health + "%";
    document.getElementById("healthText").textContent = health;

    // Mettre à jour le score
    scoreDisplay.textContent = "Score: " + score;

    requestAnimationFrame(gameLoop);
}

// Fonction de gestion de fin de jeu
function gameOver() {
    backgroundMusic.pause();
    gameArea.style.display = "none";
    gameOverScreen.style.display = "block";
    document.getElementById("score").textContent = "Score: " + score;
}

document.getElementById("replay").addEventListener("click", startGame);
document.getElementById("startGame").addEventListener("click", startGame);

// Commandes du joueur
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") player.move("left");
    if (event.key === "ArrowRight") player.move("right");
    if (event.key === "ArrowUp") player.move("up");
    if (event.key === "ArrowDown") player.move("down");
    if (event.key === "j") player.shoot(); // Attaque
});
