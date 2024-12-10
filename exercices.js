document.addEventListener("DOMContentLoaded", () => {
    // Affiche la section choisie
    function showSection(section) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');
        loadChapters(section);
    }

    // Recharge la page et met à jour le contenu des chapitres
    function reloadPage() {
        location.reload();
    }

    // Charge les chapitres de la section spécifiée
    function loadChapters(section) {
        const chaptersContainer = document.getElementById(`${section}-chapters`);
        chaptersContainer.innerHTML = ''; // Réinitialise le contenu

        for (let i = 1; i <= 10; i++) {
            let chapterDiv = document.createElement('div');
            chapterDiv.classList.add('chapter');
            chapterDiv.innerHTML = `
                <h3>Chapitre ${i}</h3>
                <ul>
                    <li><a href="https://github.com/votre-utilisateur/votre-repo/raw/main/Pdf/${section}chap${i}.pdf" target="_blank">Télécharger PDF Chapitre ${i}</a></li>
                </ul>
            `;
            chaptersContainer.appendChild(chapterDiv);
        }
    }

    // Affiche la première section par défaut
    showSection('exercices');
});
