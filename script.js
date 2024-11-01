let musicPlaying = false;

function playMusic() {
    if (!musicPlaying) {
        document.getElementById('backgroundMusic').play();
        musicPlaying = true;
    }
}

function stopMusic() {
    if (musicPlaying) {
        document.getElementById('backgroundMusic').pause();
        musicPlaying = false;
    }
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    alert(`Connexion avec ${email}`);
    // Ajouter ici la logique de connexion
}

function signup() {
    const email = document.getElementById("signupEmail").value;
    const phone = document.getElementById("signupPhone").value;
    const password = document.getElementById("signupPassword").value;
    alert(`Inscription avec ${email} et ${phone}`);
    // Ajouter ici la logique d'inscription
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value;
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<div>${message}</div>`;
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // faire défiler vers le bas
}

// Animation du curseur
const cursorEffect = document.createElement('div');
cursorEffect.classList.add('cursor-effect');
document.body.appendChild(cursorEffect);

document.addEventListener('mousemove', (e) => {
    cursorEffect.style.left = e.pageX + 'px';
    cursorEffect.style.top = e.pageY + 'px';
    playMusic(); // Joue la musique quand la souris bouge
});

document.addEventListener('mouseleave', () => {
    stopMusic(); // Arrête la musique si la souris quitte la fenêtre
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopMusic(); // Arrête la musique si l'onglet est changé
    } else {
        playMusic(); // Reprend la musique si l'onglet est de nouveau visible
    }
});

// Lecture de la musique de fond initialement
window.onload = function() {
    playMusic(); // Démarre la musique seulement si la souris bouge
};
