// Initialisation du canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Joueurs
const player1 = {
    x: 100,
    y: 400,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dx: 0,
    dy: 0,
    onGround: false,
    damage: 0,
    isAttacking: false,
};
const player2 = {
    x: 800,
    y: 400,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    dx: 0,
    dy: 0,
    onGround: false,
    damage: 0,
    isAttacking: false,
};

// Gravité et sol
const gravity = 0.5;
const groundLevel = 500;

// Contrôles
const keys = {};

// Gestion des contrôles
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));

// Mise à jour des joueurs
function updatePlayer(player, controls) {
    if (keys[controls.left]) player.dx = -player.speed;
    else if (keys[controls.right]) player.dx = player.speed;
    else player.dx = 0;

    if (keys[controls.jump] && player.onGround) {
        player.dy = -15;
        player.onGround = false;
    }

    // Appliquer la gravité
    player.dy += gravity;

    // Mouvement horizontal
    player.x += player.dx;
    player.y += player.dy;

    // Limiter les bords
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvasWidth) player.x = canvasWidth - player.width;

    // Vérifier le sol
    if (player.y + player.height > groundLevel) {
        player.y = groundLevel - player.height;
        player.dy = 0;
        player.onGround = true;
    }

    // Attaque
    if (keys[controls.attack]) player.isAttacking = true;
    else player.isAttacking = false;
}

// Dessin des joueurs
function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    if (player.isAttacking) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(player.x + player.width, player.y, 10, 10); // Zone d'attaque
    }
}

// Boucle du jeu
function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Mettre à jour et dessiner les joueurs
    updatePlayer(player1, { left: 'a', right: 'd', jump: 'w', attack: 'j' });
    updatePlayer(player2, { left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp', attack: '/' });
    drawPlayer(player1);
    drawPlayer(player2);

    requestAnimationFrame(gameLoop);
}

// Lancer le jeu
gameLoop();
