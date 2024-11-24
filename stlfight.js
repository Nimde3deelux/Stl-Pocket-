// Variables globales
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// Paramètres du jeu
let gameRunning = true;
let player;
let enemies = [];
let bullets = [];
let enemyBullets = [];
let floatingOrbs = [];
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

let orbColors = {
    green: "green",
    yellow: "yellow",
    red: "red",
    black: "black"
};

// Sons
let shootSound = new Audio("audio/shoot.mp3");
let explosionSound = new Audio("audio/explosion-sound.mp3");
let backgroundMusic = new Audio("audio/background-music.mp3");
backgroundMusic.loop = true;
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
        this.speed = Math.random() * 2 + 1;
        this.image = enemyImgs[type];
        this.health = type === 'small' ? 1 : type === 'medium' ? 2 : type === 'large' ? 3 : 5;
        this.isDead = false;
    }

    move() {
        this.y += this.speed;

        if (this.y > canvas.height) this.isDead = true;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.type === 'large' || this.type === 'boss') {
            // Afficher la barre de vie
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
            if (this.type === 'large' || this.type === 'boss') this.dropOrb();
        }
    }

    dropOrb() {
        let orbTypes = ["green", "yellow", "red", "black"];
        let randomOrb = orbTypes[Math.floor(Math.random() * orbTypes.length)];
        floatingOrbs.push(new Orb(this.x + this.width / 2, this.y, randomOrb));
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

// Classe des balles ennemies
class EnemyBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 15;
        this.speed = 3;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }
}

// Classe des orbes
class Orb {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 10;
        this.lifetime = 10 * 60; // Durée en frames (10 secondes)
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.lifetime--;
    }
}

// Générer le guide des touches
function drawGuide() {
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("Guide des touches:", 10, 20);
    ctx.fillText("Flèches: Déplacement", 10, 40);
    ctx.fillText("J: Tirer", 10, 60);
}
