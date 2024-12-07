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

        // Initial display
        updateChapterVisibility();
    });
});
