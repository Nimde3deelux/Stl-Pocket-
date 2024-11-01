let audio = new Audio('chemin/vers/ta-musique.mp3'); // Assurez-vous de remplacer ce chemin par le bon
audio.loop = true;

document.addEventListener('mousemove', function() {
    if (audio.paused) {
        audio.play();
    }
});

document.addEventListener('mouseout', function() {
    audio.pause();
});

document.addEventListener('mouseenter', function() {
    if (audio.paused) {
        audio.play();
    }
});

// Pour arrêter la musique lorsque l'utilisateur change d'onglet
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        audio.pause();
    } else {
        audio.play();
    }
});
