// script.js
// Sons de navigation et de déplacement de souris
let pageSound = new Audio('page-sound.mp3');
let hoverSound = new Audio('hover-sound.mp3');

// Fonction pour jouer un son au changement de page
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        pageSound.play();
    });
});

// Gestion des sons au mouvement de la souris
let isPlaying = false;

document.addEventListener('mousemove', () => {
    if (!isPlaying) {
        hoverSound.play();
        isPlaying = true;
    }
});

document.addEventListener('mouseout', () => {
    isPlaying = false;
});

// Simulation d'une messagerie en section Communication
function sendMessage() {
    let messageBox = document.getElementById('message-box');
    let messageInput = document.getElementById('message-input');
    
    if (messageInput.value) {
        let newMessage = document.createElement('p');
        newMessage.classList.add('user-message');
        newMessage.textContent = messageInput.value;
        messageBox.appendChild(newMessage);
        
        messageInput.value = '';
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
