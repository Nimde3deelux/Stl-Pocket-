// Variables globales
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Paramètres du jeu
let gameRunning = true;
let player;
let enemies = [];
let bullets = [];
let enemyBullets = [];
let orbs = [];
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

// Boules
const orbTypes = {
    green: { effect: 'speed', duration: 5, color: 'green' },
    yellow: { effect: 'doubleDamage', duration: 5, color: 'yellow' },
    red: { effect: 'multiShot', duration: 5, color: 'red' },
    black: { effect: 'death', duration: 0, color: 'black' }
};

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
        this.powerups = {};
    }

    move(direction) {
        if (direction === 'left' && this.x > 0) this.x -= this.speed;
        if (direction === 'right' && this.x < canvas.width - this.width) this.x += this.speed;
        if (direction === 'up' && this.y > 0) this.y -= this.speed;
        if (direction === 'down' && this.y < canvas.height - this.height) this.y += this.speed;
    }

    shoot() {
        if (this.powerups.multiShot) {
            for (let angle = 0; angle < 360; angle += 45) {
                bullets.push(new Bullet(this.x + this.width / 2, this.y, angle));
            }
        } else {
            bullets.push(new Bullet(this.x + this.width / 2, this.y, 90));
        }
        shootSound.play();
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    takeDamage() {
        this.health -= 10;
        if (this.health <= 0) {
            gameRunning = false;
            alert("Game Over!");
        }
    }

    applyPowerup(orb) {
        if (orb.effect === 'death') {
            this.health = 0;
            gameRunning = false;
            alert("Vous avez pris une boule noire. Game Over!");
        } else {
            this.powerups[orb.effect] = true;
            setTimeout(() => { this.powerups[orb.effect] = false; }, orb.duration * 1000);
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

    shoot() {
        if (this.health > 0 && Math.abs(this.x - player.x) < 50) {
            enemyBullets.push(new Bullet(this.x + this.width / 2, this.y + this.height, -90));
        }
    }

    dropOrb() {
        if (Math.random() < 0.5) {
            let orbType = Object.keys(orbTypes)[Math.floor(Math.random() * 4)];
            orbs.push(new Orb(this.x, this.y, orbTypes[orbType]));
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.type === 'large' || this.type === 'boss') {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y - 10, (this.health / 5) * this.width, 5);
        }
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.isDead = true;
            score += 10;
            explosionSound.play();
            this.dropOrb();
        }
    }
}

// Classe des balles
class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 20;
        this.speed = 5;
        this.angle = angle;
    }

    move() {
        this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
        this.y -= this.speed * Math.sin((this.angle * Math.PI) / 180);
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }
}

// Classe des orbes
class Orb {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 15;
        this.timer = 10000;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.type.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += 1; // Orb flotte
        this.timer -= 100; // Diminue la durée de vie
        if (this.timer <= 0) orbs = orbs.filter(orb => orb !== this);
    }
}

// Détection des collisions entre joueur et orbes
function detectOrbCollisions() {
    for (let orb of orbs) {
        let dist = Math.hypot(player.x - orb.x, player.y - orb.y);
        if (dist < player.width / 2 + orb.radius) {
            player.applyPowerup(orb.type);
            orbs = orbs.filter(o => o !== orb);
        }
    }
}

// Ajouter le guide des touches
function drawControls() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Contrôles:", 10, 20);
    ctx.fillText("Flèches: Déplacer", 10, 40);
    ctx.fillText("J: Tirer", 10, 60);
}
