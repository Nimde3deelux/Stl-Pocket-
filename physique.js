// physique.js
let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');

function changeCard(direction) {
    // Cache la carte actuelle
    cards[currentCardIndex].style.display = 'none';

    // Change l'index de la carte actuelle
    currentCardIndex += direction;

    // Si on atteint la fin des cartes, on revient au début
    if (currentCardIndex >= cards.length) {
        currentCardIndex = 0;
    } else if (currentCardIndex < 0) {
        currentCardIndex = cards.length - 1;
    }

    // Affiche la nouvelle carte
    cards[currentCardIndex].style.display = 'block';
}

// Initialisation: cacher toutes les cartes sauf la première
window.onload = () => {
    for (let i = 1; i < cards.length; i++) {
        cards[i].style.display = 'none';
    }
};
