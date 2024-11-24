// Variables globales
let isGameRunning = false;
let score = 0;
let timeElapsed = 0;
let gameInterval;
let spawnInterval;
let enemies = [];
let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let player;
let playerSpeed = 5;

// Initialisation du jeu
document.getElementById('single-player-btn').addEventListener('click', startSinglePlayer);
document.getElementById('two-player-btn').addEventListener('click', startTwoPlayer);

function startSinglePlayer() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    isGameRunning = true;
    startGame();
}

function startGame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player = new Player(canvas.width / 2, canvas.height - 50);
    spawnEnemies();
    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
    spawnInterval = setInterval(spawnEnemy, 2000);
    playBackgroundMusic();
}

function updateGame() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Mise à jour du joueur
    player.update();

    // Mise à jour des ennemis
    for (let enemy of enemies) {
        enemy.update();
    }

    // Vérification des collisions
    checkCollisions();

    // Mise à jour du score et du temps
    document.getElementById('score').textContent = score;
    timeElapsed++;
    document.getElementById('time').textContent = formatTime(timeElapsed);
}

function spawnEnemy() {
    let size = Math.random() * 30 + 20;
    let speed = Math.random() * 2 + 1;
    let enemy = new Enemy(Math.random() * canvas.width, -size, size, speed);
    enemies.push(enemy);
}

function checkCollisions() {
    for (let enemy of enemies) {
        if (player.collidesWith(enemy)) {
            score += 10; // Score pour chaque ennemi touché
            enemies = enemies.filter(e => e !== enemy);
            playCollisionSound();
        }
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Classe Player
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = 'blue';  // Cosmorael (blue & purple)
    }

    update() {
        if (isKeyPressed['ArrowLeft'] || isKeyPressed['a']) this.x -= playerSpeed;
        if (isKeyPressed['ArrowRight'] || isKeyPressed['d']) this.x += playerSpeed;
        if (isKeyPressed['ArrowUp'] || isKeyPressed['w']) this.y -= playerSpeed;
        if (isKeyPressed['ArrowDown'] || isKeyPressed['s']) this.y += playerSpeed;

        // Empêcher le joueur de sortir de l'écran
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.size));
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.size));

        // Dessiner le joueur
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    collidesWith(enemy) {
        let dx = this.x - enemy.x;
        let dy = this.y - enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.size / 2 + enemy.size / 2;
    }
}

// Classe Enemy
class Enemy {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    update() {
        this.y += this.speed;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.y > canvas.height) {
            enemies = enemies.filter(e => e !== this); // Supprimer les ennemis sortis de l'écran
        }
    }
}

// Sons
function playBackgroundMusic() {
    let audio = new Audio('background-music.mp3');
    audio.loop = true;
    audio.play();
}

function playCollisionSound() {
    let audio = new Audio('collision-sound.mp3');
    audio.play();
}

// Détection des touches
let isKeyPressed = {};
window.addEventListener('keydown', (e) => {
    isKeyPressed[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    isKeyPressed[e.key] = false;
});
