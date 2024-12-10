document.addEventListener("DOMContentLoaded", () => {
    const inventories = document.querySelectorAll(".inventory");
    inventories.forEach((inventory) => {
        // Initialisation pour chaque catégorie d'inventaire
        const categories = ['exercices', 'corriges', 'controles'];
        categories.forEach((type) => {
            let currentChapter = 1;
            const chapterList = inventory.querySelector(`.chapter-list-${type}`);
            const chapters = chapterList.querySelectorAll(`.chapter-${type}`);
            const prevButton = inventory.querySelector(`.prev-${type}`);
            const nextButton = inventory.querySelector(`.next-${type}`);

            const updateChapterVisibility = () => {
                chapters.forEach((chapter, index) => {
                    chapter.style.display = index === currentChapter - 1 ? "block" : "none";
                });
            };

            prevButton.addEventListener("click", () => {
                if (currentChapter > 1) {
                    currentChapter--;
                    updateChapterVisibility();
                }
            });

            nextButton.addEventListener("click", () => {
                if (currentChapter < chapters.length) {
                    currentChapter++;
                    updateChapterVisibility();
                }
            });

            // Initial display: afficher le premier chapitre pour cette catégorie
            updateChapterVisibility();
        });
    });
});

function showInventory(subject, type) {
    const inventoryId = `inventory-${subject}`;
    const inventoryDiv = document.getElementById(inventoryId);
    const categories = ['exercices', 'corriges', 'controles'];

    let content = `<h3>${subject.replace(/-/g, ' ')} : Inventaire</h3>`;

    // Générer des listes pour chaque catégorie
    categories.forEach((type) => {
        const fileType = type === 'exercices' ? 'exochap' : type === 'corriges' ? 'corrchap' : 'contchap';
        content += `<div class="category">
                        <h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                        <div class="chapter-list-${type}">`;

        // Générer 10 chapitres
        for (let chapter = 1; chapter <= 10; chapter++) {
            content += `<div class="chapter-${type}" style="display: ${chapter === 1 ? 'block' : 'none'}">
                            <h5>Chapitre ${chapter}</h5>
                            <ul>`;
            for (let i = 1; i <= 10; i++) {
                const fileName = `${fileType}${i}${subject.replace(/-/g, '')}.pdf`;
                content += `<li><a href="pdfs/${fileName}" target="_blank">${fileName}</a></li>`;
            }
            content += `</ul>
                        </div>`;
        }

        content += `</div>
                    <div class="navigation-arrows">
                        <button class="prev-${type}">Précédent</button>
                        <button class="next-${type}">Suivant</button>
                    </div>
                </div>`;
    });

    inventoryDiv.innerHTML = content;
    inventoryDiv.style.display = 'block';
}
