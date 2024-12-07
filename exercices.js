document.addEventListener("DOMContentLoaded", () => {
    const inventories = document.querySelectorAll(".inventory");
    inventories.forEach((inventory) => {
        let currentChapter = 1;
        const chapterList = inventory.querySelector(".chapter-list");
        const chapters = chapterList.querySelectorAll(".chapter");
        const prevButton = inventory.querySelector(".prev");
        const nextButton = inventory.querySelector(".next");

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

        // Initial display: afficher le premier chapitre
        updateChapterVisibility();
    });
});

function showInventory(subject, type) {
    const inventoryId = `inventory-${subject}`;
    const inventoryDiv = document.getElementById(inventoryId);
    const fileType = type === 'exercices' ? 'exochap' : type === 'corriges' ? 'corrchap' : 'contchap';
    let content = `<h3>${type.charAt(0).toUpperCase() + type.slice(1)} disponibles :</h3>
                   <div class="chapter-list">`;

    // Générer 10 chapitres avec les fichiers PDF
    for (let chapter = 1; chapter <= 10; chapter++) {
        content += `<div class="chapter" style="display: ${chapter === 1 ? 'block' : 'none'}">
                        <h4>Chapitre ${chapter}</h4>
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
                    <button class="prev">Précédent</button>
                    <button class="next">Suivant</button>
                </div>`;

    inventoryDiv.innerHTML = content;
    inventoryDiv.style.display = 'block';
}
