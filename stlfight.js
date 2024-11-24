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
        this.health = this.type === 'small' ? 1 : this.type === 'medium' ? 2 : this.type === 'large' ? 3 : 5;
        this.isDead = false;
    }

    move() {
        this.y += this.speed;

        // Ennemis moyens et boss tirent seulement si le joueur est sous eux
        if ((this.type === 'medium' || this.type === 'boss') && this.y > player.y) {
            this.shoot();
        }
    }

    shoot() {
        let bullet = new Bullet(this.x + this.width / 2, this.y + this.height);
        bullets.push(bullet);
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.isDead = true;
            score += 10;
            explosionSound.play();
            this.dropBonus();
        }
    }

    // Affichage de la barre de vie
    drawHealthBar() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 10, this.width, 5);  // Fond de la barre de vie
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 10, (this.width * this.health) / (this.type === 'boss' ? 5 : this.type === 'large' ? 3 : 1), 5); // Barre de vie
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.drawHealthBar();  // Afficher la barre de vie
    }

    dropBonus() {
        if (this.type === 'medium' || this.type === 'boss') {
            let bonusType = Math.random() < 0.5 ? 'speed' : 'shield';  // Exemple de bonus
            let bonus = new Bonus(this.x, this.y, bonusType);
            bonuses.push(bonus);
        }
    }
}

// Fonction pour vérifier les positions des ennemis
function generateEnemies() {
    if (Math.random() < 0.05) {
        let enemyType = ['small', 'medium', 'large', 'boss'][Math.floor(Math.random() * 4)];
        let x, y;

        // Vérification que la position de l'ennemi n'est pas déjà occupée
        do {
            x = Math.random() * (canvas.width - 50);
            y = -50; // Commence au-dessus de l'écran
        } while (enemies.some(enemy => Math.abs(enemy.x - x) < 50 && Math.abs(enemy.y - y) < 50)); // Évite les superpositions

        let enemy = new Enemy(x, y, enemyType);
        enemies.push(enemy);
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

// Mettre à jour l'état du jeu
function update() {
    if (!gameRunning) return;

    // Effacer l'écran
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Générer les ennemis
    generateEnemies();

    // Déplacer les ennemis
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        if (!enemy.isDead) {
            enemy.move();
            enemy.draw();
        }
    }

    // Déplacer les balles
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        bullet.move();
        bullet.draw();
    }

    // Détecter les collisions
    detectCollisions();

    // Dessiner le joueur
    player.draw();

    // Dessiner les bonus
    for (let i = 0; i < bonuses.length; i++) {
        let bonus = bonuses[i];
        bonus.draw();
    }

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
