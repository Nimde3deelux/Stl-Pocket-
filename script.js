// Sélectionner le fichier audio
const audio = new Audio('sound.mp3'); // Remplacez 'sound.mp3' par le chemin de votre fichier audio
let timer;

// Écouteur d'événement pour le mouvement de la souris
document.addEventListener('mousemove', () => {
    if (audio.paused) {
        audio.play();
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000); // Délai de 5 secondes
});

// Écouteur d'événement pour détecter la page chargée
window.onload = () => {
    audio.loop = true; // Pour que la musique boucle
};

// Fonctionnalité de recherche
document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const courses = document.querySelectorAll('.course');

    courses.forEach(course => {
        const courseName = course.textContent.toLowerCase();
        if (courseName.includes(query)) {
            course.style.display = '';
        } else {
            course.style.display = 'none';
        }
    });
});

// Fonctionnalité de connexion (exemple simple)
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = prompt('Entrez votre nom d’utilisateur:');
    alert(`Bienvenue, ${username}!`);
});
