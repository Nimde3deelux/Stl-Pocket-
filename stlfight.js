// Variables globales
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Paramètres du jeu
let gameRunning = true;
let player;
let enemies = [];
let bullets = [];
let powerUps = [];
let score = 0;

// Ajout des images et sons
let playerImg = new Image();
playerImg.src = "images/personnage.png";
let enemyImgs = {
    small: new Image(),
    medium: new Image(),
    large: new Image(),
    boss: new Image()
};
enemyImgs.small.src = "images/petit.png";
enemyImgs.medium.src = "images/moyen.png";
enemyImgs.large.src = "images/gros.png";
enemyImgs.boss.src = "images/boss.png";

// Sons
let shootSound = new Audio("audio/shoot.mp3");
let explosionSound = new Audio("audio/explosion-sound.mp3");
let backgroundMusic = new Audio("audio/background-music.mp3");
backgroundMusic.loop = true; // Musique en boucle
backgroundMusic.play();

// Classe du joueur
class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 50;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.health = 100;
        this.image = playerImg;
    }

    move(direction) {
        if (direction === 'left' && this.x > 0) this.x -= this.speed;
        if (direction === 'right' && this.x < canvas.width - this.width) this.x += this.speed;
        if (direction === 'up' && this.y > 0) this.y -= this.speed;
        if (direction === 'down' && this.y < canvas.height - this.height) this.y += this.speed;
    }

    shoot() {
        let bullet = new Bullet(this.x + this.width / 2, this.y);
        bullets.push(bullet);
        shootSound.play();
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// Classe des ennemis
class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.type = type;
        this.speed = Math.random() * 2 + 1; // Vitesse aléatoire
        this.image = enemyImgs[type];
        this.health = type === 'small' ? 1 : type === 'medium' ? 2 : type === 'large' ? 3 : 5;
        this.isDead = false;
    }

    move() {
        this.y += this.speed;

        // Supprime l'ennemi s'il atteint le bas de l'écran
        if (this.y > canvas.height) {
            this.isDead = true;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.isDead = true;
            score += 10;
            explosionSound.play(); // Jouer le son d'explosion

            // Ajouter un power-up aléatoire lorsque l'ennemi est détruit
            if (Math.random() < 0.3) { // 30% de chance de lâcher un power-up
                let powerUpType = ['speed', 'shield', 'doubleBullet'][Math.floor(Math.random() * 3)];
                let powerUp = new PowerUp(this.x + this.width / 2, this.y + this.height);
                powerUp.type = powerUpType;
                powerUps.push(powerUp);
            }
        }
    }
}

// Classe des balles
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 20;
        this.speed = 5;
    }

    move() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }
}

// Classe des power-ups
class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 2;
        this.type = ''; // Type de power-up
    }

    move() {
        this.y += this.speed;

        // Supprime le power-up s'il atteint le bas de l'écran
        if (this.y > canvas.height) {
            this.isCollected = true;
        }
    }

    draw() {
        switch (this.type) {
            case 'speed':
                ctx.fillStyle = 'blue';
                break;
            case 'shield':
                ctx.fillStyle = 'green';
                break;
            case 'doubleBullet':
                ctx.fillStyle = 'red';
                break;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Détection des collisions entre balle et ennemis
function detectCollisions() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        for (let j = 0; j < bullets.length; j++) {
            let bullet = bullets[j];
            if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width &&
                bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                enemy.takeDamage();
                bullets.splice(j, 1); // Supprime la balle
                break;
            }
        }
    }
}

// Détection des collisions entre le joueur et les power-ups
function detectPlayerPowerUpCollisions() {
    for (let i = 0; i < powerUps.length; i++) {
        let powerUp = powerUps[i];
        if (
            player.x < powerUp.x + powerUp.width &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + powerUp.height &&
            player.y + player.height > powerUp.y
        ) {
            // Appliquer l'effet du power-up
            applyPowerUpEffect(powerUp);
            powerUps.splice(i, 1); // Supprime le power-up après l'avoir collecté
            i--;
        }
    }
}

// Appliquer l'effet du power-up
function applyPowerUpEffect(powerUp) {
    if (powerUp.type === 'speed') {
        player.speed *= 1.5; // Augmenter la vitesse du joueur
    } else if (powerUp.type === 'shield') {
        player.health += 20; // Augmenter la santé du joueur
    } else if (powerUp.type === 'doubleBullet') {
        player.shoot = function () {
            let bullet1 = new Bullet(this.x + this.width / 2 - 10, this.y); // Premier tir
            let bullet2 = new Bullet(this.x + this.width / 2 + 10, this.y); // Deuxième tir
            bullets.push(bullet1, bullet2);
            shootSound.play();
        };
    }
}

// Détection des collisions entre le joueur et les ennemis
function detectPlayerEnemyCollisions() {
    for (let enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            gameRunning = false;
            alert("Game Over!"); // Fin du jeu
            return;
        }
    }
}

// Génération d'ennemis aléatoires
function generateEnemies() {
    let enemyType = ['small', 'medium', 'large', 'boss'][Math.floor(Math.random() * 4)];
    let x = Math.random() * (canvas.width - 50);
    let y = -50; // Commence au-dessus de l'écran
    let enemy = new Enemy(x, y, enemyType);
    enemies.push(enemy);
}

// Mettre à jour l'état du jeu
function update() {
    if (!gameRunning) return;

    // Effacer l'écran
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Générer les ennemis
    if (Math.random() < 0.02) generateEnemies();

    // Déplacer les ennemis
    enemies = enemies.filter(enemy => !enemy.isDead); // Supprime les ennemis morts
    for (let enemy of enemies) {
        enemy.move();
        enemy.draw();
    }

    // Déplacer les balles
    bullets = bullets.filter(bullet => bullet.y > 0); // Supprime les balles hors écran
    for (let bullet of bullets) {
        bullet.move();
        bullet.draw();
    }

    // Déplacer et dessiner les power-ups
    powerUps = powerUps.filter(powerUp => !powerUp.isCollected);
    for (let powerUp of powerUps) {
        powerUp.move();
        powerUp.draw();
    }

    // Détecter les collisions
    detectCollisions();
    detectPlayerPowerUpCollisions();
    detectPlayerEnemyCollisions();

    // Dessiner le joueur
    player.draw();

    // Afficher le score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Écouter les événements de clavier
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") player.move('left');
    if (e.key === "ArrowRight") player.move('right');
    if (e.key === "ArrowUp") player.move('up');
    if (e.key === "ArrowDown") player.move('down');
    if (e.key === " ") player.shoot();
});

// Initialiser le jeu
player = new Player();
setInterval(update, 1000 / 60); // 60 FPS
