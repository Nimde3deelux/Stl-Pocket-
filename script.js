// Suppression de l'effet de transition lors du clic sur un lien
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (event) => {
        if (link.href.includes(window.location.origin)) {
            event.preventDefault();
            window.location.href = link.href; // Pas d'effet de transition
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

// Fonctionnalité 4 : Gestion de profil avec Supabase
document.getElementById('profile-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;

    const { data, error } = await supabase
        .from('profiles') // Remplacez 'profiles' par le nom de votre table
        .upsert({ name, email }); // Utilisez upsert pour insérer ou mettre à jour

    if (error) {
        showNotification('Erreur de mise à jour du profil : ' + error.message);
    } else {
        showNotification(`Profil mis à jour : ${name}, ${email}`);
    }
});

// Fonctionnalité 5 : Chat en direct avec Supabase
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const message = document.getElementById('chat-message').value;

    const { data, error } = await supabase
        .from('messages') // Remplacez 'messages' par le nom de votre table
        .insert([{ content: message }]); // Ajustez selon la structure de votre table

    if (error) {
        showNotification('Erreur lors de l\'envoi du message : ' + error.message);
    } else {
        const chatBox = document.getElementById('chat-box');
        const messageElem = document.createElement('div');
        messageElem.textContent = message;
        chatBox.appendChild(messageElem);
        document.getElementById('chat-message').value = '';
    }
});

// Les autres fonctionnalités restent inchangées...

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
