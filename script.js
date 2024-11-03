// Effet de fondu en entrée et sortie de page
document.addEventListener("DOMContentLoaded", () => {
    // Plus besoin de la classe fade-in
});

// Suppression de la transition lors du clic sur un lien
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (event) => {
        if (link.href.includes(window.location.origin)) {
            event.preventDefault();
            // Aucune classe de transition n'est retirée
            window.location.href = link.href;
        }
    });
});

// Fonctionnalité 1 : Affichage des notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.padding = '10px';
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fonctionnalité 2 : Validation de formulaire
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input[type="text"]');
        let valid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                valid = false;
                input.style.border = '2px solid red';
            } else {
                input.style.border = '1px solid #ccc';
            }
        });
        if (valid) {
            showNotification('Formulaire soumis avec succès !');
            // Logique de soumission peut être ajoutée ici
        } else {
            showNotification('Veuillez remplir tous les champs.');
        }
    });
});

// Fonctionnalité 3 : Pagination des ressources
const resources = [
    'Livre de mathématiques',
    'Article sur la biotechnologie',
    'Guide de philosophie',
    'Manuel d\'anglais',
    'Cours de chimie',
    'Article sur l\'écologie',
    'Rapport scientifique',
    'Thèse sur l\'éducation',
];

const resourcesPerPage = 4;
let currentPage = 1;

function displayResources(page) {
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    const start = (page - 1) * resourcesPerPage;
    const end = start + resourcesPerPage;
    const paginatedResources = resources.slice(start, end);
    paginatedResources.forEach(resource => {
        const li = document.createElement('li');
        li.textContent = resource;
        resourceList.appendChild(li);
    });
    updatePagination();
}

function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(resources.length / resourcesPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => {
            currentPage = i;
            displayResources(currentPage);
        };
        pagination.appendChild(btn);
    }
}

displayResources(currentPage);

// Fonctionnalité 4 : Gestion de profil
document.getElementById('profile-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    showNotification(`Profil mis à jour : ${name}, ${email}`);
});

// Fonctionnalité 5 : Chat en direct
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = document.getElementById('chat-message').value;
    const chatBox = document.getElementById('chat-box');
    const messageElem = document.createElement('div');
    messageElem.textContent = message;
    chatBox.appendChild(messageElem);
    document.getElementById('chat-message').value = '';
});

// Fonctionnalité ajoutée : Affichage des flèches et navigation vers chaque bloc de cours
document.querySelectorAll(".card").forEach(card => {
    const arrowUp = document.createElement("div");
    arrowUp.innerHTML = "⬆️";
    arrowUp.style.cursor = "pointer";
    arrowUp.style.fontSize = "1.5em";
    arrowUp.style.marginBottom = "10px";
    arrowUp.addEventListener("click", () => {
        card.scrollIntoView({ behavior: "smooth" });
    });
    card.insertBefore(arrowUp, card.firstChild);
});
