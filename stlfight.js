// stlfight.js

// Récupérer le canvas et son contexte
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables pour les personnages
let player1 = {
    x: 50,
    y: 400,
    width: 50,
    height: 100,
    color: "blue",
    speed: 5,
    dx: 0,  // Déplacement horizontal
    dy: 0   // Déplacement vertical
};

let player2 = {
    x: 900,
    y: 400,
    width: 50,
    height: 100,
    color: "red",
    speed: 5,
    dx: 0,  // Déplacement horizontal
    dy: 0   // Déplacement vertical
};

// Charger les images des personnages
let player1Image = new Image();
player1Image.src = "images/player1_sprite.png";  // Image du joueur 1

let player2Image = new Image();
player2Image.src = "images/player2_sprite.png";  // Image du joueur 2

// Fonction de dessin des personnages
function drawPlayer(player) {
    ctx.drawImage(player === player1 ? player1Image : player2Image, player.x, player.y, player.width, player.height);
}

// Fonction pour gérer les déplacements
function movePlayer(player) {
    player.x += player.dx;
    player.y += player.dy;
}

// Fonction pour gérer l'animation du jeu
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Effacer le canvas avant de redessiner
    movePlayer(player1);
    movePlayer(player2);
    drawPlayer(player1);
    drawPlayer(player2);
    requestAnimationFrame(updateGame);  // Recalcule l’animation
}

// Contrôles du clavier pour le joueur 1
document.addEventListener("keydown", function(e) {
    if (e.key === "w") player1.dy = -player1.speed;  // Saut
    if (e.key === "a") player1.dx = -player1.speed;  // Gauche
    if (e.key === "d") player1.dx = player1.speed;   // Droite
    if (e.key === "j") console.log("Attaque Joueur 1");  // Attaque
});
document.addEventListener("keyup", function(e) {
    if (e.key === "w") player1.dy = 0;  // Arrêter le saut
    if (e.key === "a" || e.key === "d") player1.dx = 0;  // Arrêter le mouvement horizontal
});

// Contrôles du clavier pour le joueur 2
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp") player2.dy = -player2.speed;  // Saut
    if (e.key === "ArrowLeft") player2.dx = -player2.speed;  // Gauche
    if (e.key === "ArrowRight") player2.dx = player2.speed;  // Droite
    if (e.key === "/") console.log("Attaque Joueur 2");  // Attaque
});
document.addEventListener("keyup", function(e) {
    if (e.key === "ArrowUp") player2.dy = 0;  // Arrêter le saut
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") player2.dx = 0;  // Arrêter le mouvement horizontal
});

// Démarrer le jeu
updateGame();
