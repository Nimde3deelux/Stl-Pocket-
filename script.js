// Fonction pour gérer l'inscription
function signup() {
    const email = document.getElementById("signupEmail").value;
    const phone = document.getElementById("signupPhone").value;
    const password = document.getElementById("signupPassword").value;

    // Vérification simple de la validité
    if (email === "" || phone === "" || password.length < 6) {
        alert("Veuillez remplir tous les champs avec un mot de passe d'au moins 6 caractères.");
        return;
    }

    // Stockage de l'utilisateur (simulation)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie !");
}

// Fonction pour gérer la connexion
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Connexion réussie en tant que ${email}`);
        // Ici, vous pouvez rediriger l'utilisateur vers une autre page ou changer l'état de l'interface
    } else {
        alert("Email ou mot de passe incorrect.");
    }
}

// Fonction pour envoyer un message
function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value;
    const messagesDiv = document.getElementById("messages");

    if (message.trim() === "") {
        return; // Ne pas envoyer un message vide
    }

    const timestamp = new Date().toLocaleTimeString();
    messagesDiv.innerHTML += `<div>[${timestamp}] Vous: ${message}</div>`;
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // faire défiler vers le bas

    // Sauvegarder les messages
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ time: timestamp, text: message });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Charger les messages précédents lors du chargement de la page
window.onload = function() {
    const messagesDiv = document.getElementById("messages");
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(msg => {
        messagesDiv.innerHTML += `<div>[${msg.time}] Vous: ${msg.text}</div>`;
    });

    // Lecture de la musique de fond si activée
    const music = document.getElementById("backgroundMusic");
    if (localStorage.getItem("musicEnabled") !== "false") {
        music.play();
    }
};

// Toggle de la musique
function toggleMusic() {
    const music = document.getElementById("backgroundMusic");
    if (music.paused) {
        music.play();
        localStorage.setItem("musicEnabled", "true");
    } else {
        music.pause();
        localStorage.setItem("musicEnabled", "false");
    }
}
