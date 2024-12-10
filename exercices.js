document.addEventListener("DOMContentLoaded", () => {
    const inventories = document.querySelectorAll(".inventory");
    inventories.forEach((inventory) => {
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

            prevButton.textContent = "Chapitre précédent";
            nextButton.textContent = "Chapitre suivant";

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

            updateChapterVisibility();
        });
    });
});

function showInventory(subject, type) {
    const inventoryId = `inventory-${subject}`;
    const inventoryDiv = document.getElementById(inventoryId);
    const categories = ['exercices', 'corriges', 'controles'];

    let content = `<h3>${subject.replace(/-/g, ' ')} : Inventaire</h3>`;

    categories.forEach((category) => {
        if (category === type) {
            const fileType = category === 'exercices' ? 'exochap' : category === 'corriges' ? 'corrchap' : 'contchap';
            content += `<div class="category">
                            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            <div class="chapter-list-${category}">`;

            for (let chapter = 1; chapter <= 10; chapter++) {
                content += `<div class="chapter-${category}" style="display: ${chapter === 1 ? 'block' : 'none'}">
                                <h5>Chapitre ${chapter}</h5>
                                <ul>`;
                for (let i = 1; i <= 10; i++) {
                    const fileName = `${fileType}${chapter}${subject.replace(/-/g, '')}.pdf`;
                    const filePath = `https://github.com/votre-utilisateur/votre-repo/raw/main/Pdf/${fileName}`;
                    content += `<li><a href="${filePath}" target="_blank">${fileName}</a></li>`;
                }
                content += `</ul>
                            </div>`;
            }

            content += `</div>
                        <div class="navigation-arrows">
                            <button class="prev-${category}">Chapitre précédent</button>
                            <button class="next-${category}">Chapitre suivant</button>
                        </div>
                    </div>`;
        }
    });

    inventoryDiv.innerHTML = content;
    inventoryDiv.style.display = 'block';
}
