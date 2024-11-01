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

// Fonctionnalité supplémentaire : gestion des utilisateurs
let users = [];

function addUser(email, phone) {
    users.push({ email, phone });
}

function listUsers() {
    console.log(users);
}

// Exemple d'utilisation
addUser("test@example.com", "0123456789");
listUsers();
