// Variables globales
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Paramètres du jeu
let gameRunning = true;
let player;
let enemies = [];
let bullets = [];
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
        this.powerUpEffects = {
            "Explosion de Puissance": false,
            "Bouclier de Glace": false,
            "Vitesse Éclair": false,
            "Régénération": false,
            "Malédiction": false
        };
        this.powerUpDuration = 0;
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
        // Afficher les effets actifs
        if (this.powerUpEffects["Explosion de Puissance"]) {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        }
        if (this.powerUpEffects["Bouclier de Glace"]) {
            ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
            ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        }
    }

    applyPowerUp(type) {
        if (type === "Explosion de Puissance") {
            this.powerUpEffects["Explosion de Puissance"] = true;
            this.powerUpDuration = 10;
        } else if (type === "Bouclier de Glace") {
            this.powerUpEffects["Bouclier de Glace"] = true;
            this.powerUpDuration = 7;
        } else if (type === "Vitesse Éclair") {
            this.speed = 10; // Augmentation de la vitesse
            this.powerUpDuration = 5;
        } else if (type === "Régénération") {
            this.health = Math.min(100, this.health + 30);
            this.powerUpDuration = 3;
        } else if (type === "Malédiction") {
            this.powerUpEffects["Malédiction"] = true;
            this.powerUpDuration = 5;
        }
    }

    updatePowerUps() {
        if (this.powerUpDuration > 0) {
            this.powerUpDuration--;
        } else {
            for (let effect in this.powerUpEffects) {
                this.powerUpEffects[effect] = false;
            }
            if (this.powerUpEffects["Vitesse Éclair"]) this.speed = 5;
            if (this.powerUpEffects["Malédiction"]) this.powerUpEffects["Malédiction"] = false;
        }
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
            this.dropPowerUp();
        }
    }

    // Lâcher une boule aléatoire
    dropPowerUp() {
        if (Math.random() < 0.25) { // 1 ennemi sur 4
            let powerUpType = ["Explosion de Puissance", "Bouclier de Glace", "Vitesse Éclair", "Régénération", "Malédiction"][Math.floor(Math.random() * 5)];
            let powerUp = new PowerUp(this.x + this.width / 2, this.y + this.height / 2, powerUpType);
            powerUps.push(powerUp);
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

// Classe des boules de power-up
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 20;
        this.height = 20;
    }

    draw() {
        if (this.type === "Explosion de Puissance") {
            ctx.fillStyle = "red";
        } else if (this.type === "Bouclier de Glace") {
            ctx.fillStyle = "blue";
        } else if (this.type === "Vitesse Éclair") {
            ctx.fillStyle = "yellow";
        } else if (this.type === "Régénération") {
            ctx.fillStyle = "green";
        } else if (this.type === "Malédiction") {
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Vérifier si le joueur a récupéré la boule
    collect() {
        if (
            player.x < this.x + this.width / 2 &&
            player.x + player.width > this.x - this.width / 2 &&
            player.y < this.y + this.height / 2 &&
            player.y + player.height > this.y - this.height / 2
        ) {
            player.applyPowerUp(this.type);
            powerUps.splice(powerUps.indexOf(this), 1); // Supprime la boule après collecte
        }
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

// Détection des collisions entre le joueur et les ennemis
function detectPlayerEnemyCollisions() {
    for (let enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            player.health -= 10;
            enemy.isDead = true;
            if (player.health <= 0) {
                gameRunning = false;
            }
        }
    }
}

// Fonction de mise à jour du jeu
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameRunning) {
        alert("Game Over! Score: " + score);
        return;
    }

    // Déplacer et dessiner le joueur
    player.updatePowerUps();
    player.draw();

    // Déplacer et dessiner les ennemis
    for (let enemy of enemies) {
        enemy.move();
        enemy.draw();
    }

    // Déplacer et dessiner les balles
    for (let bullet of bullets) {
        bullet.move();
        bullet.draw();
    }

    // Déplacer et dessiner les power-ups
    for (let powerUp of powerUps) {
        powerUp.draw();
        powerUp.collect();
    }

    // Détection de collisions
    detectCollisions();
    detectPlayerEnemyCollisions();

    // Demander une nouvelle animation
    requestAnimationFrame(update);
}

// Démarrer le jeu
let player = new Player();

// Génération d'ennemis
setInterval(() => {
    let enemyType = Math.random() < 0.5 ? "small" : Math.random() < 0.75 ? "medium" : "large";
    let x = Math.random() * (canvas.width - 50);
    enemies.push(new Enemy(x, 0, enemyType));
}, 2000);

// Contrôles
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.move("left");
    if (e.key === "ArrowRight") player.move("right");
    if (e.key === "ArrowUp") player.move("up");
    if (e.key === "ArrowDown") player.move("down");
    if (e.key === " ") player.shoot(); // Tirer avec la barre d'espace
});

// Démarrer le jeu
update();
