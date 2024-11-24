met a jours ce code sans rien supprimer augmente le temps dapparition des enemie de 10 second comme ça la memoire ne se fait pas depasser 
 je veux excatement le meme codes sauf que je veux que tu ajoute des  Boule Rouge - "Explosion de Puissance"
Effet sur le joueur : Augmente la force d'attaque du joueur.
Description : La boule rouge, en s'impactant sur le joueur, libère une vague d'énergie explosive, augmentant temporairement la puissance de ses attaques. Pendant une durée limitée, toutes les attaques du joueur infligeront des dégâts accrus. Elle pourrait aussi avoir un effet visuel où les attaques deviennent plus spectaculaires, avec des éclats rouges qui se forment autour du personnage lorsqu’il frappe ses ennemis.
Durée : 10 secondes de puissance accrue.
2. Boule Bleue - "Bouclier de Glace"
Effet sur le joueur : Crée un bouclier protecteur autour du joueur.
Description : Cette boule bleue génère un bouclier de glace autour du joueur, réduisant les dégâts reçus pendant une période déterminée. Lors de la collecte de la boule, un effet visuel de glace se forme autour du personnage, avec des cristaux lumineux éclatant en douceur. Cette boule pourrait aussi ralentir les ennemis qui entrent en contact avec le bouclier, donnant au joueur un léger avantage stratégique.
Durée : 7 à 10 secondes de protection.
3. Boule Jaune - "Vitesse Éclair"
Effet sur le joueur : Augmente temporairement la vitesse de déplacement du joueur.
Description : La boule jaune enveloppe le joueur d'une lueur dorée, augmentant sa vitesse de déplacement et d’attaque. Le personnage devient plus agile et plus rapide dans ses mouvements, ce qui permet de communiquer une sensation de fluidité. Il pourra esquiver plus facilement les ennemis et se déplacer à une vitesse éclair, mais cela ne dure que pour un laps de temps restreint.
Durée : 5 à 8 secondes de vitesse accrue.
4. Boule Verte - "Régénération"
Effet sur le joueur : Restaure une partie de la santé du joueur.
Description : En frappant cette boule verte, le joueur voit une lueur verte guérisseuse l'envelopper et récupérer une portion de sa santé perdue. L’effet est visuellement marqué par des particules lumineuses vertes qui flottent autour du joueur pendant la régénération. Cela permet au joueur de se maintenir en vie plus longtemps, surtout pendant les combats difficiles contre des vagues d'ennemis.
Quantité de santé récupérée : 20-30% de la santé totale.
5. Boule Noire - "Malédiction"
Effet sur le joueur : Pénalité temporaire sur les capacités du joueur.
Description : La boule noire est une malédiction qui affaiblit temporairement le joueur. Lorsqu'elle touche le joueur, une aura sombre l'entoure, diminuant sa vitesse et son attaque pendant un temps donné. Les ennemis pourraient devenir plus difficiles à esquiver, et ses attaques infligeront moins de dégâts. Ce type de boule pourrait aussi avoir des effets visuels sinistres, comme des ombres qui tournent autour du joueur.
Durée : 5-10 secondes de pénalité.
 je veux excatement le meme code sauf quil faut lajout de ces boulles dailleur cree une collision psecifique pour ses boulles qui sont lacher a lamort d'un boss ou n gros ennemie un enmmei sur 4 doit povoir lacher des boules voicit le code ou tu dois faire les ajjotrs  sans rien supprimer dautre : // Variables globales
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

    // Détecter les collisions
    detectCollisions();
    detectPlayerEnemyCollisions(); // Nouvelle fonction ajoutée

    // Dessiner le joueur
    player.draw();

    // Mettre à jour le score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Vérifier la fin du jeu
    if (player.health <= 0) {
        gameRunning = false;
        alert("Game Over!");
    }

    requestAnimationFrame(update);
}

// Initialisation du joueur
player = new Player();

// Événements du clavier
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') player.move('left');
    if (event.key === 'ArrowRight') player.move('right');
    if (event.key === 'ArrowUp') player.move('up');
    if (event.key === 'ArrowDown') player.move('down');
    if (event.key === 'j') player.shoot();
});

// Démarrer le jeu
update();
