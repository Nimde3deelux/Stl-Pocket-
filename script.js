// Sélection des éléments
const notificationsIcon = document.querySelector('.header-right span:nth-child(1)');
const messagesIcon = document.querySelector('.header-right span:nth-child(2)');
const sidebarToggle = document.querySelector('.sidebar-toggle');  // Bouton de la barre latérale si besoin

// Gestion des notifications
notificationsIcon.addEventListener('click', () => {
  alert("Vous n'avez pas de nouvelles notifications pour l'instant !");
});

// Gestion des messages
messagesIcon.addEventListener('click', () => {
  alert("Vous n'avez pas de nouveaux messages.");
});

// Gestion du menu mobile (pour les écrans plus petits)
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');  // Affiche ou cache la barre latérale
  });
}

// Ajouter d’autres interactions ou scripts personnalisés ici

// Exemples de contenu dynamique pour le tableau de bord
document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessage = document.createElement('p');
  welcomeMessage.textContent = "Bienvenue sur STL Pocket, votre assistant scolaire personnalisé !";
  document.getElementById('accueil').appendChild(welcomeMessage);
});
